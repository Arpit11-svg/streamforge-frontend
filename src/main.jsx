import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { StrictMode } from "react";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import VideoWatch from "./pages/VideoWatch.jsx";
import PublishVideo from "./pages/PublishVideo.jsx";
import ChannelView from "./pages/ChannelView.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyVideos from "./pages/MyVideos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/video/:videoId",
        element: <VideoWatch />,
      },
      {
        path: "/publish-video",
        element: <PublishVideo />,
      },
      {
        path: "/channel/:username",
        element: <ChannelView />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/my-videos",
        element: <MyVideos />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
