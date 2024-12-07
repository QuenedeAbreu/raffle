// src/controllers/authController.ts
import {RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';
import { z } from "zod";
import * as serviceAuth from '../services/service.auth';
import { deleteImage } from '../utils/uploadImage';



export const register: RequestHandler = async (req, res) => {
<<<<<<< HEAD
  console.log(req.body);
  const registerSchema = z.object({
    email:  z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    name: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    cpf: z.string().optional(),
=======
  const registerSchema = z.object({
    email:  z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    name: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),

    cpf: z.string()
    .transform((cpf) => cpf.replace(/[^\d]+/g, "")) // Remove todos os caracteres que não sejam números
    .refine((cpf: string) => {
      if (typeof cpf !== "string") return false;
      cpf = cpf.replace(/[^\d]+/g, "");
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
      const cpfDigits = cpf.split("").map((el) => +el);
      const rest = (count: number): number => {
        return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
      };
      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
    }, "Digite um cpf válido."),

>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d
    birthDate: z.preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg), // Converte string para Date
      z.date() // Valida como um tipo Date
    ),
    imagePerfil: z.string().optional(),
<<<<<<< HEAD
    isAdmin: z.boolean().optional().default(false),
  });

  const bodyZod = registerSchema.safeParse(req.body);
  console.log(bodyZod.error?.issues);
=======
    isAdmin: z.preprocess(
      (arg) => {
        if (typeof arg === "string") {
          if (arg.toLowerCase() === "true") return true;
          if (arg.toLowerCase() === "false") {return false};
        } else if (typeof arg === "boolean") {
          return arg;
        }
        // return null; // Valor inválido
      },
      z.boolean()
    ).optional().default(false),
    // isAdmin: z.boolean().optional().default(false),
  });

  const bodyZod = registerSchema.safeParse(req.body);
>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d
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
<<<<<<< HEAD
=======
    const existingCpf = await prisma.user.findFirst({ where: { cpf: bodyZod.data.cpf } });
    if (existingCpf) {
      res.status(400).json({ message: 'CPF já atribuido a outro usuário!' });
      return;
    }

>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d
    const hashedPassword = await bcrypt.hash(bodyZod.data.password, 10);
    const userData = {
      ...bodyZod.data,
      password: hashedPassword,
    };
    
    const user = await serviceAuth.register(userData);
    if (!user) {
      res.status(400).json({ message: 'Erro ao criar usuário' });
      return;
    }
<<<<<<< HEAD
    user.imagePerfil = `${process.env.BASE_URL}/uploads/image/perfil/${user.imagePerfil}`;
=======
    if (user.imagePerfil) {
      user.imagePerfil = `${process.env.BASE_URL}/uploads/image/perfil/${user.imagePerfil}`;
    }else{

      user.imagePerfil = null;
    }

>>>>>>> bfe3af209cd28ee6c4dbcd6dc448865f0a398e6d
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
