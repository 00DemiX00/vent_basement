// Типы для устройств и статусов
type DeviceType = 'esp32' | 'sensor' | 'fan';

// Отдельные типы статусов для разных устройств
type FanStatus = 'on' | 'off';
type SensorStatus = 'working' | 'error' | 'offline';
type ESP32Status = 'online' | 'offline';

// Тип, сопоставляющий устройство с соответствующим набором статусов
type StatusByDevice<T extends DeviceType> =
  T extends  'fan' ? FanStatus :
  T extends 'sensor' ? SensorStatus :
  T extends 'esp32' ? ESP32Status :
  never;

// Функция для получения цвета индикатора на основе типа устройства и его статуса
const getColor = <T extends DeviceType>(device: T, status: StatusByDevice<T>): string => {
  switch (device) {
    case 'fan':
      // Для esp32 и fan возможные статусы: 'on' и 'off'
      if (status === 'on') return '#4CAF50';      // Зеленый, если устройство включено
      if (status === 'off') return '#F44336';     // Красный, если выключено
      return '#9E9E9E';                           // Цвет по умолчанию (серый)
    case 'sensor':
      // Для сенсора возможные статусы: 'working', 'error', 'offline'
      if (status === 'working') return '#4CAF50';    // Зеленый — работает
      if (status === 'error') return '#FFC107';   // Желтый — ошибка
      if (status === 'offline') return '#F44336'; // Серый — офлайн
      return '#9E9E9E';                         // Цвет по умолчанию
    case 'esp32':
      if (status === 'online') return '#4CAF50';    // Зеленый — работает
      if (status === 'offline') return '#F44336';     // Красный, если выключено
      return '#9E9E9E';    
    default:
      return '#9E9E9E';                           // Цвет по умолчанию, если device не подходит
  }
};

// Интерфейс пропсов компонента, параметризованный типом устройства
interface IndicatorsLineProps<T extends DeviceType> {
  device: T;                          // Тип устройства
  status: StatusByDevice<T>;          // Статус, валидный для данного устройства
  linesCount?: number;                // Количество линий (индикаторов) (необязательно, по умолчанию 4)
}

// React-компонент индикатора со столбцами-сигналами,
// высота и анимация которых зависят от индекса
const IndicatorsLine = <T extends DeviceType>({ device, status, linesCount = 4 }: IndicatorsLineProps<T>) => {
  // Получаем цвет для текущего статуса и устройства
  const color = getColor(device, status);

  return (
    <div style={{
      padding: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif', // Шрифт для компонента
    }}>
      <div style={{
        display: 'flex',
        gap: '6px',               // Расстояние между индикаторами
        alignItems: 'center'
      }}>
        {Array.from({ length: linesCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '12px',                      // Ширина полоски
              height: `${6 + i * 2}px`,           // Высота полоски растет с индексом
              backgroundColor: color,             // Цвет полоски
              borderRadius: '3px',                // Закругленные края
              animation: `pulse ${0.8 + i * 0.2}s infinite ease-in-out`, // Анимация пульсации с задержкой
              animationDelay: `${i * 0.2}s`,     // Задержка анимации, чтобы создать волнообразный эффект
            }}
          />
        ))}
      </div>

      {/* Текст, отображающий текущий статус большими буквами */}
      <p style={{
        color: '#fff',
        marginTop: '15px',
        fontSize: '1em',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        userSelect: 'none', // Запрет выделения текста для красоты
      }}>
        <strong>{(status as string).toUpperCase()}</strong>
      </p>

      {/* Ключевые кадры анимации пульсации */}
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

export default IndicatorsLine;