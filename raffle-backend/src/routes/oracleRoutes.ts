import express from 'express';
import { listBucketsOracle,listItemsOracle,uploadObjectOracle,urlItemOracle } from '../controllers/oracleController';

const router = express.Router();

// lista buckts 
router.get('/listBuckets', listBucketsOracle);
router.get('/listItems', listItemsOracle);
router.post('/uploadObject', uploadObjectOracle);
router.get('/urlItem', urlItemOracle);


export default router;