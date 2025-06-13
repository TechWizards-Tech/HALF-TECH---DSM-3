import { Request, Response } from "express";
import { DadoMeteorologico } from "../models/DadoMeteorologico";

// ✅ Retorna dados para o gráfico (últimos 12)
export const getChartData = async (req: Request, res: Response) => {
  try {
    const dados = await DadoMeteorologico.find()
      .sort({ reading_time: -1 })
      .limit(12);

    const dadosOrdenados = dados.reverse();

    const chartData = dadosOrdenados.map((item) => {
      const date = new Date(item.reading_time);
      const hora = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        month: hora,
        year: "",
        desktop: item.wind_rt,
        mobile: item.wind_avg,
      };
    });

    res.status(200).json(chartData);
  } catch (error) {
    console.error("Erro ao obter dados para gráfico:", error);
    res.status(500).json({ message: "Erro ao obter dados do gráfico" });
  }
};

// ✅ Retorna todos os dados formatados para tabela
export const getAllDados = async (req: Request, res: Response) => {
  try {
    const dados = await DadoMeteorologico.find().sort({ reading_time: -1 });

    const tabela = dados.map((item) => {
      const data = new Date(item.reading_time);

      return {
        id: item._id,
        reading_time: data.toISOString(), // frontend usa toLocaleString()
        temp: item.temp,
        hum: item.hum,
        cab_temp: item.cab_temp,
        bat_volts: item.bat_volts,
        uv_level: item.uv_level,
        bar: item.bar,
        wind_peak: item.wind_peak,
        wind_rt: item.wind_rt,
        wind_avg: item.wind_avg,
        wind_dir_rt: item.wind_dir_rt,
        wind_dir_avg: item.wind_dir_avg,
      };
    });

    res.status(200).json(tabela);
  } catch (error) {
    console.error("Erro ao obter dados para tabela:", error);
    res.status(500).json({ message: "Erro ao obter dados para tabela" });
  }
};

// Retorna todos os campos do dado mais recente
export const getLatestReading = async (req: Request, res: Response) => {
  try {
    const dados = await DadoMeteorologico.find()
      .sort({ reading_time: -1 })
      .limit(50);

    const dadosOrdenados = dados.reverse();

    const dadosFormatados = dadosOrdenados.map((item) => {
      const date = new Date(item.reading_time);
      return {
        Id: item._id,
        "Temp – Temperatura do ar (°C)": item.temp,
        "Hum – Umidade relativa do ar (%)": item.hum,
        "cab_temp – Temperatura da cabine (°C)": item.cab_temp,
        "bat_volts – Tensão da bateria (V)": item.bat_volts,
        "uv_level – Irradiação solar (w/m²)": item.uv_level,
        "Bar – Pressão atmosférica (hPa)": item.bar,
        "wind_peak – Pico de intensidade do vento (m/s)": item.wind_peak,
        "wind_rt – Intensidade do vento (m/s)": item.wind_rt,
        "wind_avg – Intensidade média do vento (m/s)": item.wind_avg,
        "wind_dir_rt – Direção do vento (°)": item.wind_dir_rt,
        "wind_dir_avg – Direção média do vento (°)": item.wind_dir_avg,
        "reading_time – Data do registro (AA-MM-DD HH:MM:SS)": date.toLocaleString("pt-BR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      };
    });

    res.status(200).json(dadosFormatados);
  } catch (error) {
    console.error("Erro ao obter dados mais recentes:", error);
    res.status(500).json({ message: "Erro ao obter dados mais recentes" });
  }
};
