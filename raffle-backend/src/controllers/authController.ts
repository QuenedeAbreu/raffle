// src/controllers/authController.ts
import {RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';
import { z } from "zod";
import * as serviceAuth from '../services/service.auth';
import { deleteImage } from '../utils/uploadImage';


export const register: RequestHandler = async (req, res) => {
  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    cpf: z.string().optional(),
    birthDate: z.preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg), // Converte string para Date
      z.date() // Valida como um tipo Date
    ),
    imagePerfil: z.string().optional(),
    isAdmin: z.boolean().optional(),
  });

  const bodyZod = registerSchema.safeParse(req.body);
  if (!bodyZod.success) {
    if (req.body.imagePerfil) {
      deleteImage(req.body.imagePerfil);
    }
    res.status(400).json({ message: 'Dados inválidos',bodyZod });
    return;
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email: bodyZod.data.email } });
    if (existingUser) {
      res.status(400).json({ message: 'Usuário já existe' });
      return;
    }
    const hashedPassword = await bcrypt.hash(bodyZod.data.password, 10);
    const userData = {
      ...bodyZod.data,
      password: hashedPassword,
    };
    
    const user = await prisma.user.create({data: userData});
    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
export const login: RequestHandler = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
    const bodyZod = loginSchema.safeParse(req.body);
    if (!bodyZod.success) {
       res.status(400).json({ message: 'Dados inválidos' });
       return;
    }
    const userLogin  = await serviceAuth.login(bodyZod.data);
    if (!userLogin.is_login) {
       res.status(401).json({ message: userLogin.message });
    }
     res.status(200).json({ is_login:userLogin.is_login,token: userLogin.token, user: userLogin.user });
  }
