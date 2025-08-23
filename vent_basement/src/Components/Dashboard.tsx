import { ChartAreaGradient } from "./ui/mini-chart"
import { ChartAreaInteractive } from "./ui/interactive-chart";

function Dashboard() {
  return (
  <div style={{marginLeft: '0px'}}>
    <ChartAreaInteractive></ChartAreaInteractive>
    <ChartAreaGradient></ChartAreaGradient>
  </div>
  );
}

export default Dashboard;