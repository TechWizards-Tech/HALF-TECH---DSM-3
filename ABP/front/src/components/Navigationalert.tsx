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
      bgColor: "bg-green-100 border-green-400",
      title: "Navegação Segura",
      icon: <Ship  className="h-7! w-7! stroke-green-800" />,
    },
    moderado: {
      bgColor: "bg-yellow-100 border-yellow-400",
      title: "Navegação com Atenção",
      icon: <Sailboat className="h-7! w-7! stroke-yellow-800" />,
    },
    alto: {
      bgColor: "bg-orange-100 border-orange-400",
      title: "Navegação de Risco",
      icon: <AlertTriangle className="h-7! w-7! stroke-orange-800" />,
    },
    extremo: {
      bgColor: "bg-red-100 border-red-400",
      title: "Navegação Perigosa",
      icon: <Ban className="h-7! w-7! stroke-red-800" />,
    }
  };
  
  const config = riskConfig[riskLevel];
  
  return (
    <Alert className={cn(
      config.bgColor, 
      "flex items-center border-l-4 shadow-md my-2 overflow-hidden", 
      className
    )}>
      {config.icon}
      <AlertTitle className="text-lg font-semibold">{config.title}</AlertTitle>
      {config.icon}
    </Alert>
  );
};

export default NavigationAlert;