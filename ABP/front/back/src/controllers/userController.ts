// RF01 - Registro e login de usuário
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, password } = req.body;

    // ✅ Validação de senha antes da criptografia
    const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
    if (!senhaValida) {
      res.status(400).json({
        message: "Senha nao atende aos requisitos. registerUser .userControler.ts"
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "E-mail já cadastrado. Tente outro." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nome, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

// Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Usuário não encontrado." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Senha incorreta." });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro ao fazer login." });
  }
};
