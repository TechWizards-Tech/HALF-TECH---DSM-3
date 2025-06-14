// src/services/downloadService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function baixarCSV() {
  try {
    const response = await axios.get(`${API_URL}/download/csv`, {
      responseType: 'blob', // importante para receber o arquivo como binário
    });

    // Criar URL temporária para download
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));

    // Criar link temporário
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dados_meteorologicos.csv');

    // Disparar clique para baixar
    document.body.appendChild(link);
    link.click();

    // Limpar
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Erro ao baixar CSV:', error);
    throw error;
  }
}
