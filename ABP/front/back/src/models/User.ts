import mongoose from 'mongoose';

// RF01 - Modelo para autenticação de usuário.
const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (value: string) {
        // Regra: pelo menos uma letra maiúscula, uma minúscula e um número
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
      },
      message:
        "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número. User.ts",
    },
  },
});

export default mongoose.model('User', UserSchema);
