import {storage,fileFilter} from '../utils/uploadImage'
import multer from 'multer';

//upload de imagem
export const upload = multer({ 
                              storage, 
                              fileFilter,
                              limits: { fileSize: 5 * 1024 * 1024 } 
                            });