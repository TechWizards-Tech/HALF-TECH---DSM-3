import { LogIn, LogOut, Sun, Moon } from "lucide-react";
import Windspeedcard from "./Windspeedcard";
import Areachart2 from "./Areachart2";
import WeatherTable from "./Weathertable";
import { useEffect, useState } from "react";
//import StationSelector from "./Stationselector";
import { Button } from "./ui/button";
import { Link} from "react-router-dom";
import NavigationAlert from "./Navigationalert";
import logo from "/Logos.png";
import { getChartData } from "@/services/dadoService";

export default function Dashboard() {
  //const [selectedStation, setSelectedStation] = useState("estacao1");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return document.documentElement.classList.contains("dark");
  });

  //const navigate = useNavigate();
  const currentWaveHeight = 1.0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    async function fetchWindSpeed() {
      try {
        const data = await getChartData();
        if (data && data.length > 0) {
          const latest = data[data.length - 1];
          const windPeakMs = latest?.mobile;
          if (typeof windPeakMs === "number") {
            const windPeakKmh = Math.round(windPeakMs * 3.6);
            setWindSpeed(windPeakKmh);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar dados do vento:", err);
      }
    }

    fetchWindSpeed();
  }, []);

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  }

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  }

  return (
    <><header className="relative w-full min-h-[96px] border-b border-border bg-background p-4 flex items-center justify-between">
  {/* Logo à esquerda */}
  <div className="flex-shrink-0 z-10">
    <a href="#">
      <img
        src={logo}
        alt="Logo"
        className="w-[80px] h-[80px] object-contain"
      />
    </a>
  </div>

  {/* Alerta centralizado, em camada inferior */}
  <div className="absolute left-1/2 top-4 transform -translate-x-1/2 w-full max-w-xl px-4 z-0">
    <NavigationAlert
      waveHeight={currentWaveHeight}
      windSpeed={windSpeed || 0}
      className="animate-fade-in"
    />
  </div>

  {/* Botões à direita */}
  <div className="flex flex-col items-end gap-2 flex-shrink-0 min-w-[140px] z-10">
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="border border-border"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      {isLoggedIn ? (
        <Button onClick={handleLogout} className="w-32 gap-2">
          <span className="flex items-center justify-center">
            Logout
            <LogOut className="w-4 h-4 ml-1" />
          </span>
        </Button>
      ) : (
        <Button asChild className="w-32 gap-2">
          <Link to="/login" className="flex items-center justify-center">
            Login
            <LogIn className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      )}
    </div>

    <p className="text-sm text-muted-foreground text-right">
      
    </p>
  </div>
</header>





      <main className="flex flex-col lg:flex-row h-full w-full bg-background text-foreground">
        {/* <section className="w-full lg:w-[15%] border-b lg:border-b-0 lg:border-r border-border md:flex-row">
          <StationSelector
            selectedStation={selectedStation}
            onStationChange={setSelectedStation}
            className="w-full"
          />
        </section> */}

        <section className="flex flex-col w-full">
          <div className="flex md:flex-row justify-around gap-4 p-4 w-full my-5">
            {windSpeed !== null && (
              <Windspeedcard currentSpeed={windSpeed} maxSpeed={60} />
            )}
          </div>

          <div className="p-4 w-full">
            <Areachart2 />
          </div>

          <div className="p-4 w-full">
            <WeatherTable className="w-full animate-fade-in" />
          </div>
        </section>
      </main>
    </>
  );
}
