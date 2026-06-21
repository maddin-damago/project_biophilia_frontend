import { Outlet } from "react-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <div className="w-full min-h-screen bg-green-400">
      <div className="h-auto grid">
        <Header />
        {/* This is where the page content will swap out */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
