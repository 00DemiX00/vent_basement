import { ThemeProvider } from "@/Components/theme-provider"
import { Switch } from "@/Components/ui/switch"
import { Button } from "./Components/ui/button"
import { MyChart } from "./Components/ui/example-chart"



export default function App () {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Switch></Switch>
        <Button>Кнопка</Button>
    </ThemeProvider>
  )
}


