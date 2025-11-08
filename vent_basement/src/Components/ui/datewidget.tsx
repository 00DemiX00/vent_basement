import React, { useState, useEffect } from 'react';

const DateWidget: React.FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  // Обновляем время каждую секунду (минуту)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Массив названий дней недели
  const daysOfWeek = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
  ];
  const dayName = daysOfWeek[dateTime.getDay()];

  // Форматирование даты
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear();

  // Стиль контейнера — минимализм и центрирование
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    color: '#ffffff',
  };

  const dayStyle: React.CSSProperties = {
    fontSize: '1em',
    marginBottom: '8px',
  };

  const dateStyle: React.CSSProperties = {
    fontSize: '1.5em',
    letterSpacing: '0.5px',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      {/* День недели */}
      <div style={dayStyle}>{dayName}</div>
      {/* Дата */}
      <div style={dateStyle}>{`${day}.${month}.${year}`}</div>
    </div>
  );
};

export default DateWidget;