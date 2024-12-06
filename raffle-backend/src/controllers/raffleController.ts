// raffleController.ts

// src/controllers/raffleController.ts
import { Request, RequestHandler, Response } from 'express';
import prisma from '../prisma';
import * as serviceRaffle from '../services/service.raffle';
import { z } from 'zod';

export const getRaffles = async (req: Request, res: Response) => {
  const raffles = await serviceRaffle.getRaffles();
  if (!raffles) {
    res.status(500).json({ message: 'Erro ao buscar raffles' });
    return;
  }
  res.json(raffles);
};
export const createRaffle:RequestHandler = async (req: Request, res: Response) => {
  const raffleSchema = z.object({
    title: z.string({message: 'Título é obrigatório'}),
    price: z.number({message: 'Preço é obrigatório'}),
    maxNumbers: z.number({message: 'Quantidade de número máximo é obrigatório'}),
    drawDate: z.string({message: 'Data de sorteio é obrigatório'}).datetime(),
    image: z.string().optional()
  });
  const bodyZod = raffleSchema.safeParse(req.body);
  if (!bodyZod.success) {
    res.status(400).json({ message: 'Dados inválidos' });
    return;
  }
  try {
    const raffle = await serviceRaffle.createRaffle(bodyZod.data);
  if (!raffle) {
      res.status(500).json({ message: 'Erro ao criar raffles' });
      return;
    }
    res.status(201).json(raffle);
  } catch (error) {
    
  }
};
export const getRaffleId:RequestHandler = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Id inválido' });
    return;
  }
  const raffle = await serviceRaffle.getRaffleById(id);
  if (!raffle) {
    res.status(404).json({ message: 'Rifa não encontrada' });
    return;
  }
  res.json(raffle);
};
export const deleteRaffle:RequestHandler = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Id inválido' });
    return;
  }
  const raffle = await serviceRaffle.deleteRaffle(id);
  if (!raffle) {
    res.status(404).json({ message: 'Rifa não encontrada' });
    return;
  }
  res.json(raffle);
};
export const updateRaffle:RequestHandler = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Id inválido' });
    return;
  }
  const raffleSchema = z.object({
    title: z.string({message: 'Título é obrigatório'}),
    price: z.number({message: 'Preço é obrigatório'}),
    maxNumbers: z.number({message: 'Quantidade de número máximo é obrigatório'}),
    drawDate: z.string({message: 'Data de sorteio é obrigatório'}).datetime(),
    image: z.string().optional()
  });
  const bodyZod = raffleSchema.safeParse(req.body);
  if (!bodyZod.success) {
    res.status(400).json({ message: 'Dados inválidos' });
    return;
  }
  const raffle = await serviceRaffle.updateRaffle(id, bodyZod.data);
  if (!raffle) {
    res.status(404).json({ message: 'Rifa não encontrada' });
    return;
  }
  res.json(raffle);
};
export const buyNumber:RequestHandler  = async (req: Request, res: Response) => {
  const buyNumberSchema = z.object({
    raffleId: z.number({message: 'Id da rifa é obrigatório'}),
    number: z.number({message: 'Número é obrigatório'}),
    customerEmail: z.string({message: 'Email é obrigatório'}),
    customerName: z.string({message: 'Nome é obrigatório'}),
  });
  const bodyZod = buyNumberSchema.safeParse(req.body);
  if (!bodyZod.success) {
    res.status(400).json({ message: 'Dados inválidos' });
    return;
  }
  try {
    // Verifica se a rifa existe
    const raffle = await prisma.raffle.findUnique({
      where: { id: bodyZod.data.raffleId },
    });
    if (!raffle) {
      res.status(404).json({ message: 'Rifa não encontrada' });
      return;
    }
     // Verifique se o número é válido
     if (bodyZod.data.number < 1 || bodyZod.data.number  > raffle.maxNumbers) {
        res.status(400).json({ message: 'Número inválido' });
        return;
      }
       // Verifique se o número já foi comprado
       const existingEntry = await prisma.entry.findUnique({
        where: { raffleId_number: { raffleId: bodyZod.data.raffleId, number: bodyZod.data.number } },
      });
      if (existingEntry) {
        res.status(400).json({ message: 'Número já comprado' });
        return;
      }

      // Crie uma nova entrada
      const entryBuyNumber = await serviceRaffle.entryBuyNumber(bodyZod.data);
      if (!entryBuyNumber) {
        res.status(500).json({ message: 'Erro ao comprar número' });
        return;
      }
        res.status(201).json(entryBuyNumber);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao comprar número' });
  }
};
