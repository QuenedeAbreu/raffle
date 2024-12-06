import { Request, Response, RequestHandler} from 'express';
import * as serviceOracle from '../services/service.oracle';

export const listBucketsOracle:RequestHandler = async (req: Request, res: Response) => {
    const buckets = await serviceOracle.listBucketsOracle();
    res.status(200).json(buckets);
}
export const listItemsOracle:RequestHandler = async (req: Request, res: Response) => {
    const items = await serviceOracle.listItemsOracle('assets', 'sa-saopaulo-1');
    res.status(200).json(items);
}

// upload de um arquivo para o bucket
export const uploadObjectOracle:RequestHandler = async (req: Request, res: Response) => {
    const { bucketName, objectName, filePath } = req.body;
    // if (!bucketName || !objectName || !filePath) {
    //     res.status(400).json({ error: 'Parâmetros inválidos' });
    //     return;
    // }
    
    await serviceOracle.uploadObject('assets', 'imagePerfil-1732812023981-979225965.png', filePath);
    res.json({ message: 'Objeto enviado com sucesso!' });
}

export const urlItemOracle:RequestHandler = async (req: Request, res: Response) => {
    const { bucketName, objectName } = req.body;
    const url = await serviceOracle.urlItemOracle('assets', 'imagePerfil-1732812023981-979225965.png');
    res.json({ url });
}