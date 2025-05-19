import { LogIn } from "lucide-react";
import Wavecard from "./Wavecard";
import Windspeedcard from "./Windspeedcard";
import Customcard from "./Customcard";
import Linechart from "./Linechart";
import Areachart from "./Areachart";
import WeatherTable from "./Weathertable";
import { useState } from "react";
import StationSelector from "./Stationselector";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import NavigationAlert from "./Navigationalert";
import logo from "/Logos.png";

export default function Dashboard() {
  const [selectedStation, setSelectedStation] = useState("estacao2");
  const currentWaveHeight = 1.0;
  const currentWindSpeed = 10;

  function generateLineChartData1() {
    return [
      { name: "JAN", value: 80 },
      { name: "Fev", value: 305 },
      { name: "Mar", value: 237 },
      { name: "Abr", value: 73 },
      { name: "Mai", value: 209 },
      { name: "Jun", value: 214 },
      { name: "Jul", value: 198 },
      { name: "Ago", value: 250 },
      { name: "Set", value: 276 },
      { name: "Out", value: 230 },
      { name: "Nov", value: 210 },
      { name: "Dez", value: 260 },
    ];
  }

  const generateAreaChartData = (days: number) => {
    const data = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        name: date.toLocaleDateString("pt-BR", {
          month: "short",
          day: "numeric",
        }),
        value: Math.floor(Math.random() * 400) + 100,
        secondaryValue: Math.floor(Math.random() * 300) + 100,
      });
    }

    return data;
  };

  const generateWeatherTableData = (days: number) => {
    const data = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      data.push({
        date: date.toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        waveHeight: Math.random() * 2 + 0.5, // Ondas entre 0.5m e 2.5m
        wavePeriod: Math.floor(Math.random() * 6) + 5, // Período entre 5s e 10s
        windSpeed: Math.floor(Math.random() * 30) + 10, // Vento entre 10km/h e 40km/h
        windDirection: ["N", "NE", "L", "SE", "S", "SO", "O", "NO"][
          Math.floor(Math.random() * 8)
        ],
        temperature: Math.floor(Math.random() * 10) + 20, // Temperatura entre 20°C e 30°C
        precipitation: Math.floor(Math.random() * 30), // Precipitação entre 0mm e 30mm
      });
    }

    return data;
  };

  const timeRanges = [
    "Últimos 3 meses",
    "Último mês",
    "Últimas 2 semanas",
    "Última semana",
  ];

  const [lineChartData] = useState(generateLineChartData1());
  const [areaChartData, setAreaChartData] = useState(generateAreaChartData(90));
  const [weatherData] = useState(generateWeatherTableData(7)); // 7 dias de previsão

  const handleTimeRangeChange = (value: string) => {
    let days = 90;

    switch (value) {
      case "Último mês":
        days = 30;
        break;
      case "Últimas 2 semanas":
        days = 14;
        break;
      case "Última semana":
        days = 7;
        break;
      default:
        days = 90;
    }

    setAreaChartData(generateAreaChartData(days));
  };

  return (
    <>
      <header className="w-full border-b border-gray-300 bg-white p-4">
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4 w-full">
          <div className="flex text-items-center justify-center sm:justify-start w-full sm:w-auto">
            <a href="#">
              <img
                src={logo}
                alt="Logo"
                className="w-[80px] h-[80px] object-contain"
              />
            </a>
          </div>

          <div className="w-full sm:w-1/2">
            <NavigationAlert
              waveHeight={currentWaveHeight}
              windSpeed={currentWindSpeed}
              className="animate-fade-in"
            />
          </div>

          <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-2">
            <p className="text-sm text-gray-600 text-center sm:text-right">
              Deseja fazer download dos dados? (É necessário estar logado)
            </p>
            <Button asChild className="w-full sm:w-32 gap-2">
              <Link to="/login" className="flex items-center justify-center">
                Login
                <LogIn className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row h-full w-full">
        <section className="w-full lg:w-[15%] border-b lg:border-b-0 lg:border-r border-gray-300 md:flex-row">
          <StationSelector
            selectedStation={selectedStation}
            onStationChange={setSelectedStation}
            className="w-full"
          />
        </section>

        <section className="flex flex-col w-full">
          <div className="flex md:flex-row justify-around gap-4 p-4 w-full my-5">
            <Wavecard currentHeight={1.9} maxHeight={3} />
            <Windspeedcard currentSpeed={36} maxSpeed={60} />
          </div>

          <div className="flex flex-col md:flex-row     justify-around gap-4 p-4 w-full">
            <div className="w-full md:w-1/2">
              <Linechart
                title="Tendência Mensal"
                subtitle="Janeiro - Dezembro 2024"
                data={lineChartData}
                className="w-full animate-fade-in"
              />
            </div>
            <div className="w-full md:w-1/2">
              <Areachart
                title="Gráfico Interativo"
                subtitle="Mostrando total de visitantes por período"
                data={areaChartData}
                timeRanges={timeRanges}
                onTimeRangeChange={handleTimeRangeChange}
                className="w-full animate-fade-in"
              />
            </div>
          </div>

          <div className="p-4 w-full">
            <WeatherTable data={weatherData} className="w-full animate-fade-in" />
          </div>
        </section>
      </main>
    </>
  );
}
