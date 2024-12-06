import prisma from "../prisma";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import { Prisma } from "@prisma/client";

export const createToken = (id: number) =>{
  // const privateKey = fs.readFileSync('private.key')
  const privateKey = process.env.DEFAULT_TOKEN_CRYPTO as string
  const jwtToken = jwt.sign({id},privateKey,{algorithm:'RS256',expiresIn:'1h'})
  return jwtToken
}

type returnLogin = {
  is_login: boolean;
  message?: string;
  token?: string;
  user?:{
    id : number,       
    email: string,        
    name? :string       
    phone? : string,      
    address? :string,   
    cpf? : string,        
    birthDate? : Date, 
    imagePerfil? : string
    isActive? : boolean   
    isAdmin? : boolean    
  }
};
type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData): Promise<returnLogin> => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      is_login: false,
      message: 'Email ou senha inválidos!',
    }
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      is_login: false,
      message: 'Email ou senha inválidos!',
    }
  }
  const token = createToken(user.id);
  return {
    is_login: true,
    token,
    user: {   id: user.id,
      email: user.email,
      name: user.name || undefined,
      phone: user.phone || undefined,
      address: user.address || undefined,
      cpf: user.cpf || undefined,
      birthDate: user.birthDate || undefined,
      imagePerfil: user.imagePerfil || undefined,
      isActive: user.isActive || undefined,
      isAdmin: user.isAdmin || undefined,}
  }
}

type UserCreteData = Prisma.Args<typeof prisma.user, 'create'>['data'];
export const register = async (data: UserCreteData) => {
 try {
  return await prisma.user.create({
    data,
  });
 } catch (error) {
  return false  
 }
}