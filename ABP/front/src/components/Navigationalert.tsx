import React from "react";
import { AlertTriangle, Sailboat, Ship, Ban } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface NavigationAlertProps {
  windSpeed: number;
  className?: string;
}

type RiskLevel = "baixo" | "moderado" | "alto" | "extremo";

const NavigationAlert: React.FC<NavigationAlertProps> = ({
  windSpeed,
  className
}) => {
  const calculateRiskLevel = (): RiskLevel => {
    if (windSpeed >= 66) return "extremo";
    if (windSpeed >= 50) return "alto";
    if (windSpeed >= 30) return "moderado";
    return "baixo";
  };

  const riskLevel = calculateRiskLevel();

  const riskConfig = {
    baixo: {
      borderColor: "border-green-500",
      textColor: "text-green-800 dark:text-green-300",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      icon: <Ship className="h-6 w-6 stroke-current" />,
      title: "Navegação Segura",
    },
    moderado: {
      borderColor: "border-yellow-500",
      textColor: "text-yellow-800 dark:text-yellow-300",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      icon: <Sailboat className="h-6 w-6 stroke-current" />,
      title: "Navegação com Atenção",
    },
    alto: {
      borderColor: "border-orange-500",
      textColor: "text-orange-800 dark:text-orange-300",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      icon: <AlertTriangle className="h-6 w-6 stroke-current" />,
      title: "Navegação de Risco",
    },
    extremo: {
      borderColor: "border-red-500",
      textColor: "text-red-800 dark:text-red-300",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      icon: <Ban className="h-6 w-6 stroke-current" />,
      title: "Navegação Perigosa",
    },
  };

  const config = riskConfig[riskLevel];

  return (
    <Alert
      className={cn(
        config.borderColor,
        config.textColor,
        config.bgColor,
        "flex items-center border-l-4 shadow-md w-full my-2",
        className
      )}
    >
      {config.icon}
      <AlertTitle className="text-lg font-semibold px-4">
        {config.title}
      </AlertTitle>
    </Alert>
  );
};

export default NavigationAlert;
