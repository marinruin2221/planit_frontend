import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from './components/ui/provider';

import MainPage from "@pages/MainPage.jsx";
import MyPage from "@pages/MyPage.jsx";
import EventPage from "@pages/EventPage.jsx";
import EventDetailPage from "@pages/EventDetailPage.jsx"
import ListPage from "@pages/ListPage.jsx";
import DetailPage from "@pages/DetailPage.jsx";
import CustomerServicePage from "@pages/CustomerservicePage.jsx";
import Agreement from "@pages/AgreementPage.jsx"
import Privacy from "@pages/privacyPage.jsx"
import SignupPage from "@pages/SignupPage.jsx";
import SigninPage from "@pages/SigninPage.jsx";
import PaymentSuccessPage from "@pages/PaymentSuccessPage.jsx";
import PaymentFailPage from "@pages/PaymentFailPage.jsx";
import AIFloatingButton from "@components/ai/AIFloatingButton.jsx";
import ProtectedRoute from "@components/common/ProtectedRoute.jsx"

import DebugPage from "@pages/UserDebugPage.jsx"

import "@css/common/common.css";
import "@css/tailwind/tailwind.css";

export default function App() {


	return <React.Fragment>
		<Provider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/main" element={<MainPage />}></Route>
					<Route path="/mypage" element={
						<ProtectedRoute>
						<MyPage />
						</ProtectedRoute>
					}/>
					<Route path="/event" element={<EventPage />}></Route>
					<Route path="/event/:eventId" element={<EventDetailPage />} />
					<Route path="/list" element={<ListPage />}></Route>
					<Route path="/detail/:id" element={<DetailPage />}></Route>
					<Route path="/customerservice" element={<CustomerServicePage />}></Route>
					<Route path="/agreement" element={<Agreement />}></Route>
					<Route path="/privacy" element={<Privacy />}></Route>
					<Route path="/signup" element={<SignupPage />}></Route>
					<Route path="/signin" element={<SigninPage />}></Route>
					<Route path="/payment/success" element={<PaymentSuccessPage />}></Route>
					<Route path="/payment/fail" element={<PaymentFailPage />}></Route>
					<Route path="/debug" element={<DebugPage />}></Route>
				</Routes>
				{/* Global AI Floating Button */}
				<AIFloatingButton />
			</BrowserRouter>
		</Provider>
	</React.Fragment>
}