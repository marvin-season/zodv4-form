import ReactDOM from "react-dom/client";
import { HelperProvider, UseCase } from "./main.ts";
import './main.css'

ReactDOM.createRoot(document.getElementById("root")!).render(<HelperProvider><UseCase /></HelperProvider>);