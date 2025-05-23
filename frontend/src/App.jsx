import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "./components/layout/Sidebar";
import RightPanel from "./components/layout/RightPanel";
import LoadingSpinner from "./components/ui/LoadingSpinner";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import { Toaster } from "react-hot-toast";

const App = () => {
    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        retry: false,
    });

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="flex max-w-6xl mx-auto">
            {authUser && <Sidebar authUser={authUser} />}
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage authUser={authUser} /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route
                    path="/notifications"
                    element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/profile/:username"
                    element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
                />
            </Routes>
            {authUser && <RightPanel />}
            <Toaster />
        </div>
    );
};

export default App;
