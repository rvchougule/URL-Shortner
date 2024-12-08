import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="">
      <main className="min-h-screen container ">
        <Header />
        {/* Body */}
        <div className="mx-4">
          <Outlet />
        </div>
      </main>
      {/* footer */}
      <div className="p-10 text-center bg-gray-800 mt-10 ">
        Made with ❤️ by Rohan Chougule
      </div>
    </div>
  );
}

export default AppLayout;
