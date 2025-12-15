import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from './components/ui/provider';

import MainPage from "@pages/MainPage.jsx";
import MyPage from "@pages/MyPage.jsx";
import EventPage from "@pages/EventPage.jsx";
import ListPage from "@pages/ListPage.jsx";
import DetailPage from "@pages/DetailPage.jsx";
import CustomerServicePage from "@pages/CustomerservicePage.jsx";

import "@css/common/common.css";
import "@css/tailwind/tailwind.css";
import "@css/font/font.css";

export default function App() {
	return <React.Fragment>
		<Provider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/main" element={<MainPage />}></Route>
					<Route path="/mypage" element={<MyPage />}></Route>
					<Route path="/event" element={<EventPage />}></Route>
					<Route path="/list" element={<ListPage />}></Route>
					<Route path="/detail/:id" element={<DetailPage />}></Route>
					<Route path="/customerservice" element={<CustomerServicePage />}></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.Fragment>
}