import React from "react";
import { AlertTriangle, Sailboat, Ship, Ban } from "lucide-react";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// Interface para as propriedades do componente
interface NavigationAlertProps {
  waveHeight?: number;
  windSpeed?: number;
  className?: string;
}

// Definição dos níveis de risco
type RiskLevel = "baixo" | "moderado" | "alto" | "extremo";

const NavigationAlert: React.FC<NavigationAlertProps> = ({ 
  waveHeight = 3.5, 
  windSpeed = 60,
  className
}) => {
  // Função para determinar o nível de risco baseado na altura da onda e velocidade do vento
  const calculateRiskLevel = (): RiskLevel => {
    if (waveHeight >= 2.5 || windSpeed >= 50) {
      return "extremo";
    } else if (waveHeight >= 1.8 || windSpeed >= 35) {
      return "alto";
    } else if (waveHeight >= 1.2 || windSpeed >= 25) {
      return "moderado";
    } else {
      return "baixo";
    }
  };

  // Determinando o nível de risco atual
  const riskLevel = calculateRiskLevel();
  
  // Configurações para cada nível de risco
  const riskConfig = {
    baixo: {
      bgColor: "text-green-800 border-green-400 w-[100%]  ",
      title: "Navegação Segura",
      icon: <Ship  className="h-6! w-20! stroke-green-800" />,
    },
    moderado: {
      bgColor: "text-yellow-800 border-yellow-400 w-[100%]",
      title: "Navegação com Atenção",
      icon: <Sailboat className="h-6! w-6! stroke-yellow-800" />,
    },
    alto: {
      bgColor: "text-orange-800 border-orange-400 w-[100%]",
      title: "Navegação de Risco",
      icon: <AlertTriangle className="h-6! w-6! stroke-orange-800" />,
    },
    extremo: {
      bgColor: "text-red-800 border-red-400 w-[100%]",
      title: "Navegação Perigosa",
      icon: <Ban className="h-6! w-6! stroke-red-800" />,
    }
  };
  
  const config = riskConfig[riskLevel];
  
  return (
    <Alert className={cn(
      config.bgColor, 
      "flex justify-center items-center border-l-4 shadow-md my-2 ", 
      className
    )}>
      {config.icon}
      <AlertTitle className="text-lg font-semibold  items-center px-8">{config.title}</AlertTitle>
    </Alert>
  );
};

export default NavigationAlert;