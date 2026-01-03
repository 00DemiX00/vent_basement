import { Table, TableBody, TableCell, TableRow } from "../shadcn-base/table";
import IndicatorsLine from "./IndicatorsLine";
import WeatherDisplay from "./temperature-humidity-display";
import DateWidget from "./datewidget";
import TimeWidget from "./timewidget";
import { Switch } from "../shadcn-base/switch";
import { useState, useEffect } from 'react';
import { Esp32Context } from './Esp32Context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeviceStatuses } from "@/Redux/slices/devicesStatusSlice";
import { setFan1Mode, setFan2Mode } from "@/Redux/slices/fanModeSlice";
import type { AppDispatch, RootState } from "@/Redux/store/store"


function IndicatorsLineTable() {
  const [isEsp32On, setIsEsp32On] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
   // Получение данных о статусах устройств
  const { data, loading, error } = useSelector((state: RootState) => state.devices);
  const { fan1Mode, fan2Mode } = useSelector((state: RootState) => state.fanMode);
  // Автоматическая загрузка данных при монтировании компонента
  useEffect(() => {
    dispatch(fetchDeviceStatuses());
  }, [dispatch]);
  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Ошибка: {error}</div>;
  }


  return (
    <Esp32Context.Provider value={{ isEsp32On, setIsEsp32On }}>
      <header 
        style={{
          display: "flex",
          padding: '70px',
          textAlign: 'left',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        }}>
        <div style={{ width: '80%', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}> 
          <Table>
            <TableBody>
              <TableRow>
                <TableCell 
                  className="font-medium" style={{ borderRight: "1px solid #373737", paddingLeft: "30px"}}>ESP32
                </TableCell>
                <TableCell 
                  className="font-medium" style={{ paddingLeft: "20px"}}>Датчик 1 (пол)
                </TableCell>
                <TableCell><IndicatorsLine device="sensor" status={data.sensor1} isEsp32On={isEsp32On}/></TableCell>
                <WeatherDisplay />
                <TableCell><DateWidget timeZone="Asia/Yekaterinburg" /></TableCell>
                <TableCell 
                  className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "20px" }}>Вентилятор 1
                </TableCell>
                <TableCell><IndicatorsLine device="fan" status={data.fan1} isEsp32On={isEsp32On}/></TableCell>
                <TableCell className="font-medium">АВТО</TableCell>
                <TableCell>
                  <Switch
                    checked={fan1Mode === 'AUTO'}
                    onCheckedChange={(checked) =>
                      dispatch(setFan1Mode(checked ? 'AUTO' : 'MANUAL'))
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">РУЧНОЙ</TableCell>
                <TableCell style={{ paddingLeft: "10px"}}>
                  <Switch
                    checked={fan1Mode === 'MANUAL'}
                    onCheckedChange={(checked) =>
                      dispatch(setFan1Mode(checked ? 'MANUAL' : 'AUTO'))
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow> 
                <TableCell 
                  className="font-medium" style={{ borderRight: "1px solid #373737"}}>
                  <IndicatorsLine device="esp32" status={data.esp32} isEsp32On={isEsp32On}  />
                </TableCell>
                <TableCell 
                  className="font-medium" style={{ paddingLeft: "20px", paddingRight: "20px" }}>Датчик 2 (подвал)
                </TableCell>
                <TableCell><IndicatorsLine device="sensor" status={data.sensor2} isEsp32On={isEsp32On}  /></TableCell>
                <WeatherDisplay />
                <TableCell><TimeWidget timeZone="Asia/Yekaterinburg"/></TableCell>
                <TableCell 
                  className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "20px" }}>Вентилятор 2
                </TableCell>
                <TableCell><IndicatorsLine device="fan" status={data.fan2} isEsp32On={isEsp32On}  /></TableCell>
                <TableCell className="font-medium">АВТО</TableCell>
                <TableCell>
                  <Switch
                    checked={fan2Mode === 'AUTO'}
                    onCheckedChange={(checked) =>
                      dispatch(setFan2Mode(checked ? 'AUTO' : 'MANUAL'))
                    }
                  />
                </TableCell>
                <TableCell className="font-medium" style={{ paddingLeft: "10px"}}>РУЧНОЙ</TableCell>
                <TableCell>
                  <Switch
                    checked={fan2Mode === 'MANUAL'}
                    onCheckedChange={(checked) =>
                      dispatch(setFan2Mode(checked ? 'MANUAL' : 'AUTO'))
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </header>
    </Esp32Context.Provider>
  );
}

export default IndicatorsLineTable;