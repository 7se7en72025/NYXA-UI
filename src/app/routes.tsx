import { createBrowserRouter } from "react-router";
import LaunchUiDarkModeDesktop from "../imports/LaunchUiDarkModeDesktop";

function Root() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans w-full flex flex-col items-center">
      <LaunchUiDarkModeDesktop />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
]);
