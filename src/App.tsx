import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Routers/Home";
import Tv from "./Routers/Tv";
import Search from "./Routers/Search";
import Root from "./Root";
import path from "path";

function App() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [{ path: "movies/:movieId", element: null }],
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default App;
