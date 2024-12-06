// src/middlewares/upload.ts
import multer from 'multer';
import path from 'path';

// Configuração do armazenamento
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/image/perfil')); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${extension}`;
    req.body.imagePerfil = fileName;
    cb(null, fileName);
  },
});

// Filtro para aceitar apenas imagens
export const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'));
  }
};

//excluir imagem
export const deleteImage = (filePath: string): void => {
  const fs = require('fs');
  const path = require('path');

  const fullPath = path.join(__dirname, '../public/image/perfil', filePath);

  fs.unlink(fullPath, (err: Error) => {
    if (err) {
      console.error('Erro ao excluir a imagem:', err);
    } else {
      console.log('Imagem excluída com sucesso!');
    }
  });
};