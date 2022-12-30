import React from "react";
import Feeds from "./components/Feeds";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
	return (
		<BrowserRouter>
			<div>
				<header>
					<Header />
				</header>
				<main>
					<Routes>
						<Route path="/home" element={<HomeScreen />} />
						<Route path="/" exact={true} element={<LoginScreen />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
