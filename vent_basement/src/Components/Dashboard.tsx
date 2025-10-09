import { ChartAreaInteractive } from "./ui/interactive-chart";
import { ChartBarMultiple } from "./ui/bar-chart";

function Dashboard() {
  return (
  <div 
    style={{
        display: "flex",
        paddingLeft: '70px', paddingRight: '70px', paddingBottom: '70px',
        textAlign: 'left',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }}>
  <div style={{ width: '100%', display: "flex",
    fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'}}>
    <div style={{ flex: 2 }}><ChartAreaInteractive></ChartAreaInteractive></div>
    <div style={{ marginLeft: '10px', flex: 1 }}><ChartBarMultiple></ChartBarMultiple></div>
  </div>
</div>
  );
}

export default Dashboard;