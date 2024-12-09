import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RenderPage from './components/RenderPage.jsx';
import ThankYouPage from './components/ThankYouPage.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/renderPage",
    element: <RenderPage />
  },
  {
    path: "/thankyoupage",
    element: <ThankYouPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);