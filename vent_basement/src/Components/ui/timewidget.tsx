import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

interface TimeWidgetProps {
  timeZone?: string; // Опционально. По умолчанию — локальная зона.
}

const TimeWidget: React.FC<TimeWidgetProps> = ({ timeZone = 'local' }) => {
  const [dateTime, setDateTime] = useState<DateTime>(
    DateTime.now().setZone(timeZone)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(DateTime.now().setZone(timeZone));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  // Форматируем время
  const timeString = dateTime.toFormat('HH:mm:ss');

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    backgroundColor: '#000000',
    fontFamily:
      'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    color: '#ffffff',
    padding: '10px',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '1.5em',
  };

  return (
    <div style={containerStyle}>
      {/* Время */}
      <div style={timeStyle}>{timeString}</div>
    </div>
  );
};

export default TimeWidget;