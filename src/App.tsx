import UseCase from "@/helper/use-case.tsx";
import HelperProvider from "@/helper/context.tsx";

function App() {
  return <>
    <HelperProvider>
      <UseCase />
    </HelperProvider>
  </>;
}

export default App;
