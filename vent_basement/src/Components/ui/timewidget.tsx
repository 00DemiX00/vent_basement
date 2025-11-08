import React, { useState, useEffect } from 'react';

const TimeWidget: React.FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  // Обновляем время каждую секунду (минуту)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Форматирование времени
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  // Стиль контейнера — минимализм и центрирование
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    backgroundColor: '#000000',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    color: '#ffffff',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '1.5em',
  };

  return (
    <div style={containerStyle}>
      {/* Время */}
      <div style={timeStyle}>{`${hours}:${minutes}:${seconds}`}</div>
    </div>
  );
};

export default TimeWidget;