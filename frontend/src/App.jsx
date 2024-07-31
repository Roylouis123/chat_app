import {  Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signUp";
import Home from "./pages/home";

function App() {
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;