import { ThemeProvider } from "@/Components/theme-provider"
import Header from "./Components/IndicatorsLineTable"
import Dashboard from "./Components/Dashboard"



export default function App () {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header></Header>
      <Dashboard></Dashboard>
    </ThemeProvider>
  )
}


