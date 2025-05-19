import { useState } from "react";

import { LoginForm } from "./Loginform";
import { RegisterForm } from "./Registerform";
import bgImage from "/10.jpg";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="grid min-h-svh bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-4/5 my-8 md:my-0 ">
                        {isLogin ? (
                            <LoginForm
                                className="p-6"
                                onClick={() => setIsLogin(false)}
                            />
                        ) : (
                            <RegisterForm
                                className="p-6"
                                onClick={() => setIsLogin(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
