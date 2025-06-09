import { useState } from "react";

import { CloudRainWind } from 'lucide-react';
import { LoginForm } from "./Loginform";
import { Registerform } from "./Registerform";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="grid min-h-svh lg:grid-cols-2 b-0">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center text-2xl font-bold">
                        TechWinds
                        <CloudRainWind className="stroke-2 size-15" />
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {isLogin ? (
                            <LoginForm
                                className="border border-secundary rounded-2xl p-6"
                                onClick={() => setIsLogin(false)}
                            />
                        ) : (
                            <Registerform
                                className="border border-secundary rounded-2xl p-4"
                                onClick={() => setIsLogin(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <img
                    src="14.jpg"
                    alt="Image"
                    className="rounded-sm grayscale-90 absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-white opacity-100"></div>
            </div>


        </div>
    );
}
