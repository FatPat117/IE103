import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GlobalStyles from "./components/GlobalStyles";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </BrowserRouter>
);
