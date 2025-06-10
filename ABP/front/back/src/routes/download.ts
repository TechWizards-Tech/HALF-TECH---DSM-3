import { Request, Response, Router } from 'express';
import { downloadCSV } from '../controllers/downloadController';

const router: Router = Router();

router.get('/csv', (req: Request, res: Response) => {
  downloadCSV(req, res);
});

export default router;
