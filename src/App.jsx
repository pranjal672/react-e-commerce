import Home from "./pages/Home";
import { FilterProvider } from "./context/FilterContext";

function App() {

  return (
    <>
      <FilterProvider>
        <Home />
      </FilterProvider>
    </>
  )
}

export default App
