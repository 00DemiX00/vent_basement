import React, { useState, useEffect } from 'react';

interface SensorData {
  temperature: number; // в градусах Цельсия
  humidity: number;    // в процентах
}

const WeatherDisplay: React.FC = () => {
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Эмуляция получения данных с сервера
  const fetchSensorData = async () => {
    try {
      setLoading(true);
      // Здесь можно заменить на реальный API вызов
      // например: const response = await fetch('/api/sensor');
      // const result = await response.json();

      // Эмуляция данных
      const result: SensorData = {
        temperature: parseFloat((20 + Math.random() * 10).toFixed(1)),
        humidity: parseFloat((40 + Math.random() * 20).toFixed(1)),
      };

      setData(result);
    } catch (err) {
      setError('Ошибка при получении данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();

    // Обновлять данные каждые 10 секунд
    const intervalId = setInterval(fetchSensorData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '16px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'inline-block',
        minWidth: '250px',
        textAlign: 'center'
      }}>
        Загрузка данных...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '16px',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'inline-block',
        minWidth: '250px',
        textAlign: 'center'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      
      color: '#fff',
      padding: '20px 30px',
      display: 'flex',          
      alignItems: 'center',
      justifyContent:'center',  
      gap:'30px',               
      fontFamily:'"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      fontSize:'1.0em'
    }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <span style={{ fontWeight:'bold', marginBottom:'8px' }}>Температура</span>
        <span style={{ fontSize:'1.5em' }}>{data?.temperature.toFixed(1)} &deg;C</span>
      </div>
      
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
        <span style={{ fontWeight:'bold', marginBottom:'8px' }}>Влажность</span>
        <span style={{ fontSize:'1.5em' }}>{data?.humidity.toFixed(1)} %</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;