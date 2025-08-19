import { useState, useEffect } from 'react';

// Массив возможных статусов системы
const statuses = ['working', 'error', 'offline'] as const;
// Определяем тип для статусов на основе массива
type Status = typeof statuses[number];

// Функция для получения цвета линии в зависимости от текущего статуса
const getColor = (status: Status) => {
  switch (status) {
    case 'working':
      return '#4CAF50'; // зеленый цвет для рабочего состояния
    case 'error':
      return '#FFC107'; // желтый цвет для ошибок
    case 'offline':
      return '#F44336'; // красный цвет для оффлайна
  }
};

// Основной компонент - индикатор с линиями, меняющими цвет в зависимости от статуса
const StatusIndicatorsLine = () => {
  // Хук состояния для хранения текущего индекса статуса
  const [statusIndex, setStatusIndex] = useState(0);
  // Получаем текущий статус по индексу
  const currentStatus = statuses[statusIndex];

  // Используем useEffect для автоматической смены статуса каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      // Переключение на следующий статус по кругу
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 3000); // интервал в миллисекундах

    // Очистка интервала при размонтировании компонента, чтобы избежать утечек памяти
    return () => clearInterval(interval);
  }, []);

  const linesCount = 4; // Количество линий для анимации

  return (
    <div style={{
      padding: '5px', // внутренние отступы вокруг всего блока
      display: 'flex', // использование flexbox для центрирования содержимого
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif', // шрифт по умолчанию
    }}>
      
      {/* Контейнер с линиями-индикаторами */}
      <div style={{
        display: 'flex', // горизонтальное расположение линий
        gap: '6px', // промежутки между линиями
        alignItems: 'center'
      }}>
        {/* Генерируем массив линий динамически */}
        {Array.from({ length: linesCount }).map((_, i) => (
          <div key={i} style={{
            width: '12px', // ширина каждой линии
            height: `${6 + i * 2}px`, // высота линий с увеличением по порядку (для визуального эффекта)
            backgroundColor: getColor(currentStatus), // цвет линии зависит от текущего статуса
            borderRadius: '3px', // скругление углов линий для более мягкого вида
            animation: `pulse ${0.8 + i * 0.2}s infinite ease-in-out`, 
            // анимация пульсации с разной длительностью для каждой линии

            animationDelay: `${i * 0.2}s`, 
            // задержка перед началом анимации каждой линии — создаёт эффект последовательности
          }} />
        ))}
      </div>

      {/* Текстовое отображение текущего статуса */}
      <p style={{ color:'#fff', marginTop:'15px', fontSize:'1em',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
       }}>
        <strong>{currentStatus.toUpperCase()}</strong>
      </p>

      {/* Определение ключевых кадров анимации пульсации */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scaleY(1); opacity: 1; }
            50% { transform: scaleY(1.5); opacity: 0.6; }
            100% { transform: scaleY(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default StatusIndicatorsLine; 
// Экспортируем компонент под новым названием, чтобы его можно было использовать в других частях проекта.