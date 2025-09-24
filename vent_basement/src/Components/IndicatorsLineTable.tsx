import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import  StatusIndicatorsLine  from "./ui/IndicatorsLine";
import WeatherDisplay from "./ui/WeatherDisplay";
import { Switch } from "./ui/switch";

function IndicatorsLineTable() {
  return (
  <header 
    style={{
        display: "flex",
        padding: '70px',
        textAlign: 'left',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }}>
  <div style={{ width: '1000px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> 
  <Table>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Датчик 1 (пол)</TableCell>
      <TableCell><StatusIndicatorsLine></StatusIndicatorsLine></TableCell>
      <WeatherDisplay></WeatherDisplay>
      <TableCell 
        className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "45px", paddingRight: "30px" }}>ESP32
      </TableCell>
      <TableCell 
        className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "30px" }}>Вентилятор 1
      </TableCell>
      <TableCell><StatusIndicatorsLine></StatusIndicatorsLine></TableCell>
      <TableCell><Switch></Switch></TableCell>
    </TableRow>
  </TableBody>
  <TableBody>
    <TableRow> 
      <TableCell className="font-medium" >Датчик 2 (подвал)</TableCell>
      <TableCell><StatusIndicatorsLine></StatusIndicatorsLine></TableCell>
      <WeatherDisplay></WeatherDisplay>
      <TableCell 
        className="font-medium" style={{ borderLeft: "1px solid #373737"}}><StatusIndicatorsLine></StatusIndicatorsLine>
      </TableCell>
      <TableCell 
        className="font-medium" style={{ borderLeft: "1px solid #373737", paddingLeft: "30px" }}>Вентилятор 2
      </TableCell>
      <TableCell><StatusIndicatorsLine></StatusIndicatorsLine></TableCell>
      <TableCell><Switch></Switch></TableCell>
    </TableRow>
  </TableBody>
  </Table>
  </div>
</header>
  );
}

export default IndicatorsLineTable;