import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table"
import  StatusIndicatorsLine  from "./ui/IndicatorsLine"
import WeatherDisplay from "./ui/WeatherDisplay";

function IndicatorsLineTable() {
  return (
  <header 
    style={{
        display: "flex",
        padding: '70px',
        textAlign: 'left',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }}>
  <div style={{ width: '600px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}> 
  <Table>
  <TableHeader>
    <TableRow>
      <TableCell className="w-[100px]">Статус работы датчиков</TableCell>
      <TableCell><StatusIndicatorsLine></StatusIndicatorsLine></TableCell>
      <WeatherDisplay></WeatherDisplay>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow> 
      <TableCell className="font-medium">Статус работы вентиляторов</TableCell>
      <TableCell><StatusIndicatorsLine></StatusIndicatorsLine></TableCell>
    </TableRow>
  </TableBody>
  </Table>
  </div>
</header>
  );
}

export default IndicatorsLineTable;