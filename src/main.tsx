import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import About from "./about.tsx";

import "@fontsource/pacifico";
import "@fontsource/yusei-magic";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
