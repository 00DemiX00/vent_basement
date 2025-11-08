import { useContext } from 'react';
import { Esp32Context } from './Esp32Context';

// Типы для устройств и статусов
type DeviceType = 'esp32' | 'sensor' | 'fan';

type FanStatus = 'on' | 'off';
type SensorStatus = 'working' | 'error' | 'offline';
type ESP32Status = 'online' | 'offline';

type StatusByDevice<T extends DeviceType> =
  T extends 'fan' ? FanStatus :
  T extends 'sensor' ? SensorStatus :
  T extends 'esp32' ? ESP32Status :
  never;

// Функция для получения цвета в зависимости от устройства и его статуса
const getColor = <T extends DeviceType>(device: T, status: StatusByDevice<T>): string => {
  switch (device) {
    case 'fan':
      if (status === 'on') return '#4CAF50';      // зелёный
      if (status === 'off') return '#F44336';     // красный
      return '#9E9E9E';                           // серый по умолчанию
    case 'sensor':
      if (status === 'working') return '#4CAF50';    // зелёный
      if (status === 'error') return '#FFC107';      // жёлтый
      if (status === 'offline') return '#F44336';    // красный
      return '#9E9E9E';
    case 'esp32':
      if (status === 'online') return '#4CAF50';     // зелёный
      if (status === 'offline') return '#F44336';    // красный
      return '#9E9E9E';
    default:
      return '#9E9E9E'; // на всякий случай
  }
};

// Интефейс пропсов компонента
interface IndicatorsLineProps<T extends DeviceType> {
  device: T;                                                 // тип устройства
  status: StatusByDevice<T>;                                   // статус, валидный для данного устройства
  linesCount?: number;                                         // сколько линий показать (по умолчанию 4)
  isEsp32On: boolean;                                          // флаг, включён ли ESP32
}

// Функция возвращает текст статуса при выключенном esp32
function getDisplayStatusWhenEsp32Off(device: DeviceType): string {
  switch (device) {
    case 'fan': return 'OFF';
    case 'sensor': return 'OFFLINE';
    case 'esp32': return 'OFFLINE';
    default: return 'OFFLINE';
  }
}

const IndicatorsLine = <T extends DeviceType>({ device, status, linesCount = 4 }: IndicatorsLineProps<T>) => {
  const { isEsp32On } = useContext(Esp32Context);

  // выбираем цвет: если esp32 выключен, всегда красный
  const color = !isEsp32On ? '#F44336' : getColor(device, status);

  // определение статуса в зависимости от состояния esp32
  const displayStatus = !isEsp32On ? getDisplayStatusWhenEsp32Off(device) : status.toString().toUpperCase();

  return (
    <div style={{
      padding: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Индикаторы */}
      <div style={{
        display: 'flex',
        gap: '6px',
        alignItems: 'center'
      }}>
        {Array.from({ length: linesCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '12px',
              height: `${6 + i * 2}px`,
              backgroundColor: color,
              borderRadius: '3px',
              animation: `pulse ${0.8 + i * 0.2}s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Статусный текст */}
      <p style={{
        color: '#fff',
        marginTop: '15px',
        fontSize: '1em',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        userSelect: 'none'
      }}>
        <strong>{displayStatus}</strong>
      </p>

      {/* Анимация пульсации */}
      <style>{`
        @keyframes pulse {
          0% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(1.5); opacity: 0.6; }
          100% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IndicatorsLine;