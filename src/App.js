import DatePick from "./DatePick";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <DatePick />
      </div>
    </ChakraProvider>
  );
}

export default App;
