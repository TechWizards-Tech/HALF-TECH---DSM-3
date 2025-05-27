import React from 'react';
import { Cloud, CloudSun, Thermometer, Wind } from 'lucide-react';
import Customcard from './Customcard';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherCardProps {
  todayData: WeatherData;
  tomorrowData: WeatherData;
  className?: string;
}

const Weathercard = ({ todayData, tomorrowData, className }: WeatherCardProps) => {
  const renderFrontContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900">{todayData.city}</h2>
        <p className="text-blue-700">Hoje</p>
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <Cloud className="w-12 h-12 text-blue-800" />
        <span className="text-4xl font-bold text-blue-900">{todayData.temperature}°C</span>
      </div>
      
      <div className="space-y-2 text-blue-800">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5" />
          <span>{todayData.condition}</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5" />
          <span>Umidade: {todayData.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5" />
          <span>Vento: {todayData.windSpeed} km/h</span>
        </div>
      </div>
      
      <p className="text-sm text-center text-blue-700 italic">Role a roda do mouse em qualquer lugar para ver a previsão de amanhã</p>
    </div>
  );
  
  const renderBackContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-900">{tomorrowData.city}</h2>
        <p className="text-blue-700">Amanhã</p>
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <CloudSun className="w-12 h-12 text-blue-800" />
        <span className="text-4xl font-bold text-blue-900">{tomorrowData.temperature}°C</span>
      </div>
      
      <div className="space-y-2 text-blue-800">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5" />
          <span>{tomorrowData.condition}</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5" />
          <span>Umidade: {tomorrowData.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5" />
          <span>Vento: {tomorrowData.windSpeed} km/h</span>
        </div>
      </div>
      
      <p className="text-sm text-center text-blue-700 italic">Role a roda do mouse em qualquer lugar para ver o tempo de hoje</p>
    </div>
  );
  
  return (
    <Customcard
      className={className}
      frontContent={renderFrontContent()}
      backContent={renderBackContent()}
    />
  );
};

export default Weathercard;