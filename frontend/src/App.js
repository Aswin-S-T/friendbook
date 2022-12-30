import React from "react";
import Feeds from "./components/Feeds";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
	return (
		<BrowserRouter>
			<div>
				<header>
					<Header />
				</header>
				<main>
					<Routes>
						<Route path="/" exact={true} element={<HomeScreen />} />
						<Route path="/signin" element={<SigninScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
