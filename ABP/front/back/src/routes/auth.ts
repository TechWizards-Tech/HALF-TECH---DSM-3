import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// RF01 - Rota para registro e login de usuário
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;