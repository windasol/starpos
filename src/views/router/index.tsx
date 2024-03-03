import App from "../../App";
import Login from "../login/login";

export const router = [
    {
        path: "/starpos",
        element: <App/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
];