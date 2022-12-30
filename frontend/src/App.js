import React from "react";
import Feeds from "./components/Feeds";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { useSelector } from "react-redux";
import HeadermUI from "./components/HeadermUI";

function App() {
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	return (
		<BrowserRouter>
			<div>
				<header>
					{/* <Header userId={userInfo.userId} /> */}
					<HeadermUI userId={userInfo.userId} />
				</header>
				<main>
					<Routes>
						<Route path="/" exact={true} element={<HomeScreen />} />
						<Route path="/signin" element={<SigninScreen />} />
						<Route path="/profile/:id" element={<ProfileScreen />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
