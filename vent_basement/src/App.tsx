import { ThemeProvider } from "@/Components/theme-provider"
import { Switch } from "@/Components/ui/switch"
import { Button } from "./Components/ui/button"
import { ChartAreaGradient } from "./Components/ui/example-chart"
import Header from "./Components/Header"



export default function App () {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header></Header>
      <ChartAreaGradient></ChartAreaGradient>
    </ThemeProvider>
  )
}


