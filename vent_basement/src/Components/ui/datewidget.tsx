import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

interface DateWidgetProps {
  timeZone: string;
}

const DateWidget: React.FC<DateWidgetProps> = ({ timeZone }) => {
  const [dateTime, setDateTime] = useState<DateTime>(() => DateTime.now().setZone(timeZone));

  useEffect(() => {
    // Обновляем каждую секунду, учитывая выбранную временную зону
    const intervalId = setInterval(() => {
      setDateTime(DateTime.now().setZone(timeZone));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]); // при изменении пропса меняем таймер

  const daysOfWeek = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
  ];

  // День недели по индексу 1-7, где 1 — понедельник, 7 — воскресенье
  // Для массива с нуля — (weekday % 7)
  const dayName = daysOfWeek[(dateTime.weekday % 7)]; 

  const day = dateTime.toFormat('dd');
  const month = dateTime.toFormat('MM');
  const year = dateTime.year;

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