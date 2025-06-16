import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getAllDados } from "@/services/dadoService";
import { baixarCSV } from "@/services/downloadservice";
import { motion, AnimatePresence } from "framer-motion";

interface DadoMeteorologico {
  reading_time: string;
  temp: number;
  hum: number;
  cab_temp: number;
  bat_volts: number;
  uv_level: number;
  bar: number;
  wind_peak: number;
  wind_rt: number;
  wind_avg: number;
  wind_dir_rt: number;
  wind_dir_avg: number;
}

interface WeatherTableProps {
  className?: string;
}

export default function WeatherTable({ className }: WeatherTableProps) {
  const [data, setData] = useState<DadoMeteorologico[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [direction, setDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      try {
        const dados = await getAllDados();
        setData(dados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  async function handleDownload() {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para baixar o arquivo CSV.");
      return;
    }
    try {
      await baixarCSV();
    } catch (error) {
      alert("Erro ao baixar o arquivo CSV.");
    }
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setDirection(newPage > currentPage ? "left" : "right");
    setCurrentPage(newPage);
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Variants para animação lateral
  const variants = {
    enter: (direction: string) => ({
      x: direction === "left" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "left" ? -300 : 300,
      opacity: 0,
    }),
  };

  // Gera os números das páginas, com limite para não mostrar muitos
  const maxPageButtons = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-border shadow shadow-muted bg-background text-foreground",
        className
      )}
    >
      <div className="p-4">
        <div className="relative group inline-block">
          <button
            onClick={handleDownload}
            disabled={!isLoggedIn}
            className={cn(
              "mb-4 rounded px-4 py-2 transition text-white",
              isLoggedIn
                ? "bg-primary hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Download
          </button>

          {!isLoggedIn && (
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Faça login para baixar o CSV
            </span>
          )}
        </div>
      </div>

      <AnimatePresence
        mode="wait"
        custom={direction}
        initial={false}
      >
        <motion.table
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="min-w-full text-sm text-left text-foreground bg-background"
        >
          <thead className="text-xs uppercase bg-muted text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Data do Registro</th>
              <th className="px-6 py-3">Temperatura do Ar (°C)</th>
              <th className="px-6 py-3">Umidade Relativa do Ar (%)</th>
              <th className="px-6 py-3">Temperatura da Cabine (°C)</th>
              <th className="px-6 py-3">Tensão da Bateria (V)</th>
              <th className="px-6 py-3">Irradiação Solar (W/m²)</th>
              <th className="px-6 py-3">Pressão Atmosférica (hPa)</th>
              <th className="px-6 py-3">Pico do Vento (m/s)</th>
              <th className="px-6 py-3">Intensidade do Vento (m/s)</th>
              <th className="px-6 py-3">Intensidade Média do Vento (m/s)</th>
              <th className="px-6 py-3">Direção do Vento (°)</th>
              <th className="px-6 py-3">Direção Média do Vento (°)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-3 font-medium whitespace-nowrap">
                  {new Date(item.reading_time).toLocaleString("pt-BR")}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">{item.temp}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.hum}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.cab_temp}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.bat_volts}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.uv_level}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.bar}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.wind_peak}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.wind_rt}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.wind_avg}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.wind_dir_rt}</td>
                <td className="px-6 py-3 whitespace-nowrap">{item.wind_dir_avg}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </AnimatePresence>

      {/* Paginação */}
      <div className="flex justify-center items-center gap-2 p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed",
            currentPage === 1
              ? "bg-muted text-muted-foreground"
              : "bg-muted text-muted-foreground hover:bg-primary hover:text-white cursor-pointer"
          )}
        >
          Anterior
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cn(
              "px-3 py-1 rounded",
              currentPage === page
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-primary hover:text-white cursor-pointer"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed",
            currentPage === totalPages
              ? "bg-muted text-muted-foreground"
              : "bg-muted text-muted-foreground hover:bg-primary hover:text-white cursor-pointer"
          )}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
