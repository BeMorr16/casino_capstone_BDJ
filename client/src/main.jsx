import React, { lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
import SlotMachine from "./components/Slots/SlotMachine/SlotMachine.jsx";
import LoginRegister from "./components/LoginRegisterPage/LoginRegister.jsx";
import Leaderboards from "./components/Leaderboards/Leaderboards.jsx";
import Roulette from "./components/Roulette/Roulette.jsx";
import Casino from "./components/Casino/Casino.jsx";
import HowToPlay from "./components/HowToPlays/HowToPlay.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useUserState from "./store/store.js";
import { authorizeUserRequest } from "./components/Utils/APIRequests.js";
import Cashier from "./components/Cashier/Cashier.jsx";


const Blackjack = lazy(() => import('./components/Blackjack/BJComponents/Blackjack.jsx'));

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: '/', element: <Home/> },
      { path: '/howtoplay/:game', element: <HowToPlay/>},
      { path: '/account', element: <LoginRegister/> },
      {
        path: '/leaderboards',
        element: (
          <div className="leaderboardBackground">
          <Leaderboards />
          </div>
        )
      },
      { path: '/casino', element: <Casino/> },
      { path: '/slots', element: <SlotMachine/> },
      { path: '/roulette', element: <Roulette/> },
      { path: '/blackjack', element: <Blackjack/> },
      {
        path: '/cashier',
        element: (
          <ProtectedRoute>
            <Cashier/>
          </ProtectedRoute>
        )
      }
    ]
  },
]);

function App() {
  const { setUser, setIsLoggedIn } = useUserState(state => ({
    setUser: state.setUser,
    setIsLoggedIn: state.setIsLoggedIn
  })) 

 

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      (async () => {
        const data = await authUser();
        if (data) {
          setUser(data.id, data.user_money, data.username);
          setIsLoggedIn(true);
        }
      })();
    }

    async function authUser() {
      try {
        const data = await authorizeUserRequest();
        return data
      } catch (error) {
        console.log(error)
        return null;
      }
    }

  }, [setUser, setIsLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Waiting for spot at the table...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
