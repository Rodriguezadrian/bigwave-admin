import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import NewUser from "./pages/NewUser";
import UpdateUser from "./pages/UpdateUser";
import Dashboard from "./pages/Dashboard";
import OrderView from "./pages/OrderView";
import CategoriesView from "./components/CategoriesView";
import ProductsView from "./components/ProductsView";
import CategoriesEdit from "./components/CategoriesEdit";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },

    { path: "/profile", element: <Profile /> },
    { path: "/create-user", element: <NewUser /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/update-user", element: <UpdateUser /> },
    { path: "/orders/details/:id", element: <OrderView /> },
    { path: "/edit", element: <ProductsView /> },
    { path: "/categories/edit/:id", element: <CategoriesEdit /> },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
