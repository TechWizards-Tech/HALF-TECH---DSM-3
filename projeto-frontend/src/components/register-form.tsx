import { useState } from "react";
import { cn } from "@/lib/utils";
import { register } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../public/Logos.png"


export function RegisterForm({
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

            if (response.error || response.message) {
                alert("Erro: " + (response.message || response.error));
                return;
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
        <div className="bg-black/40  rounded-2xl p-6 ">
            <div className="rounded-2xl p-6 flex flex-col md:flex-row border-r-2 bg-white">
                <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-gray-300", className)} {...props}>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex flex-row items-center justify-around w-[250px] md:w-[400]">
                            <h1 className="text-2xl md:text-3xl font-bold">Criar uma conta</h1>
                            <div className="flex flex-row">
                                <a href="#">
                                    <img src={logo} alt="Logo" className="w-[100px] h-[100px] object-contain" />
                                </a>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-balance text-base md:text-sm w-full md:w-80">
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
                <div className="w-full md:w-1/2 flex flex-col p-6 items-center text-justify gap-10 justify-center">
                    <h1 className="top-1.5 text-2xl md:text-3xl font-bold">SOBRE</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non orci et nisl laoreet sollicitudin. Quisque tortor purus, tincidunt eu risus vel, tristique molestie turpis. Pellentesque vitae justo elit. Sed molestie ligula ut velit sollicitudin, et tincidunt lorem vehicula. Nulla et orci eu ligula tempor tempor vel quis est. Nulla vitae laoreet nibh, eu eleifend nibh. Donec nisl libero, dignissim faucibus facilisis a, ultrices ac massa. Sed non nunc condimentum, interdum risus a, ultrices dolor.
                    </p>
                </div>
            </div>
        </div>
    );
}
