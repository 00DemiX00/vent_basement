import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import  StatusIndicatorsLine  from "./ui/IndicatorsLine"

function Header() {
  return (
  <header 
    style={{
        padding: '70px',
        textAlign: 'left',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }}>
  <div> 
  <Table  style={{ width: '20%'}}>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Статус работы датчиков</TableHead>
      <TableHead><StatusIndicatorsLine></StatusIndicatorsLine></TableHead>
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

export default Header;