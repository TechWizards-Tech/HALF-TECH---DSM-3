"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WindspeedcardProps {
  currentSpeed: number;
  maxSpeed: number;
  unit?: string;
  direction?: string;
}

const Windspeedcard = ({
  currentSpeed,
  maxSpeed,
  unit = "km/h",
  direction = "NO",
}: WindspeedcardProps) => {
  // Calculate percentage for progress bar
  const percentage = Math.min((currentSpeed / maxSpeed) * 100, 100);

  // Determine wind strength category
  const getWindCategory = (speed: number): string => {
    if (speed < 20) return "Fraco";
    if (speed < 40) return "Moderado";
    if (speed < 60) return "Forte";
    return "Tempestade";
  };

  // Get color based on wind speed
  const getColorClass = (speed: number): string => {
    if (speed < 20) return "text-green-500";
    if (speed < 40) return "text-blue-500";
    if (speed < 60) return "text-yellow-500";
    return "text-red-500";
  };

  // Get background color for progress bar
  const getProgressColor = (speed: number): string => {
    if (speed < 20) return "bg-green-500";
    if (speed < 40) return "bg-blue-500";
    if (speed < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden p-0 shadow-md shadow-blue-500/50 border-gray-500 ">
      <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950 text-2xl">
        <CardTitle className="flex items-center justify-between">
          <span>Velocidade do Vento</span>
          <Wind className="size-10" />
        </CardTitle>
      </CardHeader>
      <CardContent>
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

          <div className="relative">
            <Progress
              value={percentage}
              className={`h-2 mt-2 [&>div]:${getProgressColor(currentSpeed)}`}
            />
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