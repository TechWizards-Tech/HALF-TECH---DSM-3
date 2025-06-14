import { useState } from "react";
import { LoginForm } from "./Loginform";
import { RegisterForm } from "./Registerform";
import bgImage from "/10.jpg";

interface LoginProps {
  theme?: "light" | "dark";
}

export default function Login({ theme = "light" }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);

  // Classes de fundo conforme o tema
  const overlayBg =
    theme === "dark"
      ? "bg-[rgba(0,0,0,0.6)] backdrop-blur-sm text-white"
      : "bg-[rgba(255,255,255,0.4)] backdrop-blur-sm text-black";

  return (
    <div
      className="grid min-h-svh bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={`flex flex-col gap-4 ${overlayBg}`}>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-4/5 my-8 md:my-0">
            {isLogin ? (
              <LoginForm className="p-6" onClick={() => setIsLogin(false)} />
            ) : (
              <RegisterForm className="p-6" onClick={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
