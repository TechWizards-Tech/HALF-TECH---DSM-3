import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataPoint {
  name: string;
  value: number;
  secondaryValue?: number;
}

interface AreaChartProps {
  title: string;
  subtitle: string;
  data: DataPoint[];
  className?: string;
  timeRanges: string[];
  onTimeRangeChange?: (value: string) => void;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 rounded-md shadow-md border">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary font-bold">{`Primário: ${payload[0].value}`}</p>
        {payload[1] && (
          <p className="text-blue-400 font-medium">{`Secundário: ${payload[1].value}`}</p>
        )}
      </div>
    );
  }
  return null;
};

const Areachart: React.FC<AreaChartProps> = ({ 
  title, 
  subtitle, 
  data, 
  className,
  timeRanges,
  onTimeRangeChange 
}) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <Select onValueChange={onTimeRangeChange} defaultValue={timeRanges[0]}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorPrimary)"
            />
            {data[0]?.secondaryValue !== undefined && (
              <Area
                type="monotone"
                dataKey="secondaryValue"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorSecondary)"
              />
            )}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Areachart;