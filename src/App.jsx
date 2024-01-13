import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import UserContextProvider from "./context/useContext";
import DashboardLayout from "./ui/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import DashboardUser from "./pages/DashboardUser";
import DashBoardTour from "./pages/DashBoardTour";
import DashBoardBooking from "./pages/DashBoardBooking";
import Favorite from "./pages/Favorite";
import Tour from "./pages/Tour";
import ManageProfile from "./pages/ManageProfile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DashBoardCofirmCheckout from "./pages/DashBoardCofirmCheckout";
import { Booking } from "./pages/Booking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route element={<Favorite />} path="/favorite" />
              <Route element={<Tour />} path="/tour/:tourId" />
              <Route path="/account" element={<ManageProfile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/booking" element={<Booking />} />
            </Route>
            <Route path="/dashboard/" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="/dashboard/users" element={<DashboardUser />} />
              <Route path="/dashboard/tours" element={<DashBoardTour />} />

              <Route
                path="/dashboard/bookings"
                element={<DashBoardBooking />}
              />
              <Route
                path="/dashboard/confirmcheckout"
                element={<DashBoardCofirmCheckout />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                zIndex: 1000,
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
