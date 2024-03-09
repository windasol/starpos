import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './views/login/login.tsx';
import Join from './views/login/join.tsx';

const router = createBrowserRouter([
  {
    path: "/starpos",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/join',
    element: <Join/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
