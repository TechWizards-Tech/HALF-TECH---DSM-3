import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table as TableIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeatherDataPoint {
  date: string;
  waveHeight: number;
  wavePeriod: number;
  windSpeed: number;
  windDirection: string;
  temperature: number;
  precipitation: number;
}

interface WeatherTableProps {
  data: WeatherDataPoint[];
  className?: string;
}

const WeatherTable: React.FC<WeatherTableProps> = ({ data, className }) => {
  return (
    <div className={cn("weather-table-container p-4 bg-card rounded-xl shadow-md", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Dados Meteorológicos Detalhados</h3>
          <p className="text-sm text-muted-foreground">Previsão dos próximos dias</p>
        </div>
        <TableIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      
      <div className="w-full overflow-auto">
        <Table>
          <TableCaption>Fonte: Instituto Nacional de Meteorologia</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ondas (m)</TableHead>
              <TableHead className="text-right">Período (s)</TableHead>
              <TableHead className="text-right">Vento (km/h)</TableHead>
              <TableHead>Direção</TableHead>
              <TableHead className="text-right">Temp (°C)</TableHead>
              <TableHead className="text-right">Precip. (mm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                <TableCell className="font-medium">{item.date}</TableCell>
                <TableCell className="text-right">{item.waveHeight.toFixed(1)}</TableCell>
                <TableCell className="text-right">{item.wavePeriod}</TableCell>
                <TableCell className="text-right">{item.windSpeed}</TableCell>
                <TableCell>{item.windDirection}</TableCell>
                <TableCell className="text-right">{item.temperature}</TableCell>
                <TableCell className="text-right">{item.precipitation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WeatherTable;