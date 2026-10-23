
import { useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    Outlet,
} from "react-router-dom";

import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Signup from "./Signup";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import FindDoctor from "./pages/FindDoctor";
import FindClinic from "./pages/FindClinic";
import FindPharmacy from "./pages/FindPharmacy";
import Chat from "./pages/Chat";
import FindMarketPlace from "./pages/FindMarketPlace";
import Dependents from "./pages/Dependents";
import Account from "./pages/Account";
import AccountSettings from "./pages/AccountSettings";

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    function toggleSidebar() {
        setSidebarOpen((previousState) => !previousState);
    }

    return (
        <div
            className={`app-layout ${
                sidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
        >
            <Sidebar sidebarOpen={sidebarOpen} />

            <div className="main-area">
                <Header toggleSidebar={toggleSidebar} />

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                <Route element={<DashboardLayout />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/appointments"
                        element={<Appointments />}
                    />

                    <Route
                        path="/find-doctor"
                        element={<FindDoctor />}
                    />

                    <Route
                        path="/find-clinic"
                        element={<FindClinic />}
                    />

                    <Route
                        path="/find-pharmacy"
                        element={<FindPharmacy />}
                    />

                    <Route
                        path="/find-marketplace"
                        element={<FindMarketPlace />}
                    />

                    <Route
                        path="/dependents"
                        element={<Dependents />}
                    />

                    <Route
                        path="/chat"
                        element={<Chat />}
                    />

                    <Route
                        path="/account"
                        element={<Account />}
                    />

                    <Route
                        path="settings"
                        element={<AccountSettings />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
