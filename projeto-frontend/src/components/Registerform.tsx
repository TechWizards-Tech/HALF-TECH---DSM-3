import { useState } from "react";
import { cn } from "@/lib/utils";
import { register } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Registerform({
    className,
    onClick,
    ...props
}: React.ComponentProps<"form"> & { onClick: () => void }) {
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Tentando registrar:", { nome, email, senha, confirmSenha });

        if (senha !== confirmSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await register(nome, email, senha);
            console.log("Resposta do backend:", response);

            if (response.message === "Usuário criado com sucesso.") {
                alert("✅ " + response.message);
                // onClick(); // se quiser redirecionar para o login
              } else {
                alert("❌ Erro: " + (response.message || response.error));
              }
              

            alert("Conta criada com sucesso!");
            // Você pode redirecionar aqui se quiser:
            // onClick(); 
        } catch (error: any) {
            console.error("Erro ao registrar:", error);
            alert("Erro ao registrar usuário.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Criar uma conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Preencha os campos abaixo para criar sua conta
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="username">Nome</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Seu nome completo"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirmar senha</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        required
                        value={confirmSenha}
                        onChange={(e) => setConfirmSenha(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Criar conta
                </Button>
            </div>
            <div className="flex m-auto gap-1 text-center text-sm">
                Já tem uma conta?
                <a
                    href="#"
                    className="underline underline-offset-4"
                    onClick={onClick}
                >
                    Logar
                </a>
            </div>
        </form>
    );
}