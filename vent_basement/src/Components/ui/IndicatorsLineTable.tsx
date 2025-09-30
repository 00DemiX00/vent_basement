import { Table, TableBody, TableCell, TableRow } from "../shadcn-base/table";
import IndicatorsLine from "./IndicatorsLine";
import WeatherDisplay from "./temperature-humidity-display";
import { Switch } from "../shadcn-base/switch";

function IndicatorsLineTable() {
  return (
  <header 
    style={{
        display: "flex",
        padding: '70px',
        textAlign: 'left',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }}>
  <div style={{ width: '1100px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> 
  <Table>
  <TableBody>
    <TableRow>
      <TableCell 
        className="font-medium" style={{ borderRight: "1px solid #373737", paddingLeft: "30px"}}>ESP32
      </TableCell>
      <TableCell 
        className="font-medium" style={{ paddingLeft: "20px"}}>Датчик 1 (пол)
      </TableCell>
      <TableCell><IndicatorsLine device="sensor" status="working"></IndicatorsLine></TableCell>
      <WeatherDisplay></WeatherDisplay>
      <TableCell 
        className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "20px" }}>Вентилятор 1
      </TableCell>
      <TableCell><IndicatorsLine device="fan" status="on"></IndicatorsLine></TableCell>
      <TableCell className="font-medium">АВТО</TableCell>
      <TableCell><Switch></Switch></TableCell>
      <TableCell className="font-medium">РУЧНОЙ</TableCell>
      <TableCell style={{ paddingLeft: "10px"}}><Switch></Switch></TableCell>
    </TableRow>
  </TableBody>
  <TableBody>
    <TableRow> 
      <TableCell 
        className="font-medium" style={{ borderRight: "1px solid #373737"}}><IndicatorsLine device="esp32" status="online"></IndicatorsLine>
      </TableCell>
      <TableCell 
        className="font-medium" style={{ paddingLeft: "20px", paddingRight: "20px" }}>Датчик 2 (подвал)
      </TableCell>
      <TableCell><IndicatorsLine device="sensor" status="working"></IndicatorsLine></TableCell>
      <WeatherDisplay></WeatherDisplay>
      <TableCell 
        className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "20px" }}>Вентилятор 2
      </TableCell>
      <TableCell><IndicatorsLine device="fan" status="off"></IndicatorsLine></TableCell>
      <TableCell className="font-medium">АВТО</TableCell>
      <TableCell><Switch></Switch></TableCell>
      <TableCell className="font-medium" style={{ paddingLeft: "10px"}}>РУЧНОЙ</TableCell>
      <TableCell><Switch></Switch></TableCell>
    </TableRow>
  </TableBody>
  </Table>
  </div>
</header>
  );
}

export default IndicatorsLineTable;