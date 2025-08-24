import { ChartAreaInteractive } from "./ui/interactive-chart";
import { ChartBarMultiple } from "./ui/bar-chart";

function Dashboard() {
  return (
  <header 
    style={{
        display: "flex",
        paddingLeft: '70px', paddingRight: '70px', paddingBottom: '70px',
        textAlign: 'left',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }}>
  <div style={{ width: '2000px', display: "flex",
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
    <ChartAreaInteractive></ChartAreaInteractive>
    <ChartBarMultiple></ChartBarMultiple>
  </div>
</header>
  );
}

export default Dashboard;