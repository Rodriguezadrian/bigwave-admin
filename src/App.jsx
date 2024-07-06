import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import NewUser from "./pages/NewUser";
import UpdateUser from "./pages/UpdateUser";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },

    { path: "/profile", element: <Profile /> },
    { path: "/create-user", element: <NewUser /> },
    { path: "/update-user", element: <UpdateUser /> },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
