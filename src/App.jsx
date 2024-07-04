import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
