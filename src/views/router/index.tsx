import App from "../../App";
import Login from "../login/login";

export const baseRoute = [
    {
        path: "/starpos",
        element: <App/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
];