import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Leaderboards from "./components/Leaderboards";
import "./style.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("leaderboards"); 

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Navbar home button
  useEffect(() => {
    const handler = () => setCurrentPage("dashboard");
    window.addEventListener("navigate-home", handler);
    return () => window.removeEventListener("navigate-home", handler);
  }, []);

  const renderPage = () => {
    if (currentPage === "leaderboards") return <Leaderboards />;

    return (
      <div className="text-gray-600 text-lg">
        Page <span className="font-bold">{currentPage}</span> not built yet.
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#f5f7fb] font-sans overflow-hidden flex relative text-gray-900">

      <Sidebar 
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        setCurrentPage={setCurrentPage}
      />

      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-10">
          <section className="bg-white p-10 rounded-2xl shadow-md border border-gray-200">
            {renderPage()}
          </section>
        </main>
      </div>
    </div>
  );
}
