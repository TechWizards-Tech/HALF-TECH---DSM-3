import { CloudRainWind, LogIn } from "lucide-react";
import Wavecard from "./Wavecard";
import Windspeedcard from "./Windspeedcard";
import Customcard from "./Customcard";
import WeatherTable from "./Weathertable";
import { useState } from "react";
import StationSelector from "./Stationselector";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import NavigationAlert from "./Navigationalert";
import Linechart2 from "./Linechart2";
import Areachart2 from "./Areachart2";

export default function Dashboard() {
  const [selectedStation, setSelectedStation] = useState("estacao1");
  const currentWaveHeight = 3;
  const currentWindSpeed = 25;

  return (
    <>
      <div>
        <div className="sticky top-0 bg-white">
          <header className="flex flex-row h-16 shrink-0 items-center gap-2 border-gray-500 px-4 justify-between ">
            <div className=" not-only:flex justify-center gap-2 md:justify-start items-end flex-row-reverse">
              <a href="#" className="flex items-center text-3xl font-bold">
                TechWinds
                <CloudRainWind className="stroke-2 size-15" />
              </a>
            </div>

            <div className="flex items-center gap-10">
              <NavigationAlert
                waveHeight={currentWaveHeight}
                windSpeed={currentWindSpeed}
                className="animate-fade-in"
              />

              <StationSelector
                selectedStation={selectedStation}
                onStationChange={setSelectedStation}
                className="hidden sm:flex"
              />

              <Button asChild className="w-32 gap-2 group">
                <Link to="/login">
                  Deseja logar?
                  <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </header>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <Wavecard currentHeight={1.9} maxHeight={3} />
          <Windspeedcard currentSpeed={36} maxSpeed={60} />
        </div>

        <div className="custom-card p-1 flex">
          <Customcard
            frontContent={
              <div className="flex flex-row w-full gap-6 place-content-around">
                <div className="w-1/2">
                  <Linechart2 />
                </div>

                <div className="w-1/2">
                  <Areachart2 />
                </div>
              </div>
            }
            backContent={
              <div className="mb-6">
                <WeatherTable />
              </div>
            }
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}
