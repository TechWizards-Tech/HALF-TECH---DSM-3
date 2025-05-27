import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WavecardProps {
  currentHeight: number;
  maxHeight: number;
  period?: number;
  unit?: string;
}

const Wavecard = ({
  currentHeight,
  maxHeight,
  period = 8,
  unit = "m",
}: WavecardProps) => {
  // Calculate percentage for progress bar
  const percentage = Math.min((currentHeight / maxHeight) * 100, 100);

  // Determine wave category
  const getWaveCategory = (height: number): string => {
    if (height < 0.5) return "Calmo";
    if (height < 1) return "Pequena";
    if (height < 2) return "Moderada";
    if (height < 3) return "Grande";
    return "Extrema";
  };

  // Get color based on wave height
  const getColorClass = (height: number): string => {
    if (height < 0.5) return "text-green-500";
    if (height < 1) return "text-blue-500";
    if (height < 2) return "text-yellow-500";
    if (height < 3) return "text-orange-500";
    return "text-red-500";
  };

  // Get background color for progress bar
  const getProgressColor = (height: number): string => {
    if (height < 0.5) return "!bg-green-500";
    if (height < 1) return "!bg-blue-500";
    if (height < 2) return "!bg-yellow-500";
    if (height < 3) return "!bg-orange-500";
    return "!bg-red-500";
  };

  return (
    <Card className="overflow-hidden p-0 shadow-md shadow-cyan-500/50 border-gray-500">
      <CardHeader className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-950 text-2xl">
        <CardTitle className="flex items-center justify-between">
          <span>Tamanho de Onda</span>
          <Waves className="size-10" />
        </CardTitle>
      </CardHeader>


      <div className="p-3">
          <CardContent>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold tracking-tight flex items-baseline">
                  <span className={getColorClass(currentHeight)}>
                    {currentHeight.toFixed(1)}
                  </span>
                  <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
                </div>
                <div className="bg-muted px-2 py-1 rounded text-xs">
                  Período: {period}s
                </div>
              </div>
              <div className="relative">
                <Progress
                  value={percentage}
                  className={`h-2 mt-2 [&>div]:${getProgressColor(currentHeight)}`}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Max: {maxHeight} {unit}
                </div>
                <div
                  className={`text-sm font-medium ${getColorClass(currentHeight)}`}
                >
                  {getWaveCategory(currentHeight)}
                </div>
              </div>
            </div>
          </CardContent>
      </div>
    </Card>
  );
};

export default Wavecard;