import mongoose from 'mongoose';

// RF01 - Modelo para autenticação de usuário.
const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // <-- novo campo
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


export default mongoose.model('User', UserSchema);
