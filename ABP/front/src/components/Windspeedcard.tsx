"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";

interface WindspeedcardProps {
  currentSpeed: number;
  maxSpeed: number;
  unit?: string;
  direction?: string;
  theme?: "light" | "dark";
}

const Windspeedcard = ({
  currentSpeed,
  maxSpeed,
  unit = "km/h",
  direction = "NO",
  theme = "light",
}: WindspeedcardProps) => {
  const getWindCategory = (speed: number): string => {
    if (speed <= 20) return "Fraco";
    if (speed <= 40) return "Moderado";
    if (speed >= 50 && speed <= 60) return "Forte";
    return "Tempestade";
  };

  const getColorClass = (speed: number): string => {
    if (speed <= 20) return "text-green-500";
    if (speed <= 40) return "text-blue-500";
    if (speed >= 50 && speed <= 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Header e CardContent com fundo translúcido e blur
  const headerBgClass =
    theme === "dark"
      ? "bg-[rgba(30,64,175,0.1)] backdrop-blur-sm"
      : "bg-[rgba(191,219,254,0.15)] backdrop-blur-sm";

  const contentBgClass =
    theme === "dark"
      ? "bg-[rgba(255,255,255,0.03)] backdrop-blur-sm"
      : "bg-[rgba(255,255,255,0.2)] backdrop-blur-sm";

  return (
    <Card className={`overflow-hidden p-0 w-[50%] bg-transparent shadow-md`}>
      <CardHeader className={`${headerBgClass} text-2xl`}>
        <CardTitle className="flex items-center justify-between">
          <span>Velocidade do Vento</span>
          <Wind className="size-10" />
        </CardTitle>
      </CardHeader>
      <CardContent className={contentBgClass}>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="text-3xl font-bold tracking-tight flex items-baseline">
              <span className={getColorClass(currentSpeed)}>{currentSpeed}</span>
              <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
            </div>
            <div className="bg-muted px-2 py-1 rounded text-xs">
              Direção: {direction}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Max: {maxSpeed} {unit}
            </div>
            <div
              className={`text-sm font-medium ${getColorClass(currentSpeed)}`}
            >
              {getWindCategory(currentSpeed)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Windspeedcard;
