import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Results from "./components/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "results",
        element: <Results />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
