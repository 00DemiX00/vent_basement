import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const DateWidget: React.FC = () => {
  const [dateTime, setDateTime] = useState<DateTime>(DateTime.now());

  // Обновляем время каждую секунду
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(DateTime.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Названия дней недели по Luxon (по умолчанию в английском, можно настроить)
  const daysOfWeek = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
  ];

  const dayName = daysOfWeek[dateTime.weekday % 7]; // dayOfWeek: 1 (понедельник) - 7 (воскресенье)

  // Форматирование даты
  const day = dateTime.toFormat('dd'); // день месяца с ведущим нулём
  const month = dateTime.toFormat('MM'); // месяц с ведущим нулём
  const year = dateTime.year; // год

 
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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