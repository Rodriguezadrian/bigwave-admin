import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import NewUser from "./pages/NewUser";
import UpdateUser from "./pages/UpdateUser";
import Dashboard from "./pages/Dashboard";
import OrderView from "./pages/OrderView";
import CategoriesEdit from "./pages/CategoriesEdit";
import ProductsEdit from "./pages/ProductsEdit";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { createRoutesFromElements, Route } from "react-router-dom";
import Products from "./pages/Products";
import AllOrders from "./pages/AllOrders";
import Layout from "./pages/Layout";
import AllUsers from "./pages/AllUsers";
import Images from "./pages/Images";
import UpdateAdmin from "./pages/UpdateAdmin";

function App() {
  const user = useSelector((state) => state.user);

  const ProtectedRoute = ({ children }) => {
    if (!user.token) {
      return <Navigate to="/login" />;
    }
    return children ? children : <Outlet />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="create-user" element={<NewUser />} />
            <Route path="update-user/:id" element={<UpdateUser />} />
            <Route path="update-admin/:id" element={<UpdateAdmin />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="orders/details/:id" element={<OrderView />} />
            <Route path="products" element={<Products />} />
            <Route path="products/edit/:id" element={<ProductsEdit />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/edit/:id" element={<CategoriesEdit />} />
            <Route path="images" element={<Images />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
