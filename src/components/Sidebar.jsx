import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar, setCurrentPage }) {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const menu = [
    { name: "Dashboard", dropdown: ["Faculty Info", "Staff Info", "Syllabus"] },
    "Leaderboards",
    "Events",
    "Achievements",
    "Connect",
    "Projects",
  ];

  const handleSubMenuClick = (item) => {
  if (item === "Faculty Info") {
    setCurrentPage("faculty-info");
  } else if (item === "Staff Info") {
    setCurrentPage("staff-info");
  } else if (item === "Syllabus") {
    setCurrentPage("syllabus");
  }
};


  return (
    <>
      {/* TOGGLE BUTTON (always visible & attached to left edge) */}
      <button
        onClick={toggleSidebar}
        className="
          fixed top-1/2 -translate-y-1/2 
          left-0  
          z-50
          bg-blue-900 text-white
          w-6 h-20
          flex items-center justify-center
          border-r border-blue-800
          rounded-none
          shadow-md
          hover:bg-blue-700
          transition
        "
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 
          h-full bg-white 
          border-r border-gray-200 
          p-6 pt-20 
          shadow-md 
          transition-all duration-300 
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-64 w-64"}
        `}
      >
        {/* MENU */}
        <nav className="space-y-3">
          {menu.map((item) =>
            typeof item === "string" ? (
              <button
                key={item}
                onClick={() => {
                  const page = item.toLowerCase();   // "leaderboards", "events", etc
                  setCurrentPage(page);
                }}
                className="
                  w-full text-left px-4 py-2 
                  rounded-lg 
                  text-blue-900 
                  font-medium
                  hover:bg-blue-100
                  transition
                "
              >
                {item}
              </button>
            ) : (
              <div 
                key={item.name}
                onMouseEnter={() => setDashboardOpen(true)}
                onMouseLeave={() => setDashboardOpen(false)}
              >
                <button
                  className="
                    w-full text-left px-4 py-2 
                    rounded-lg 
                    text-blue-900 
                    font-medium
                    hover:bg-blue-100
                    transition
                  "
                >
                  {item.name}
                </button>
                {dashboardOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem}
                        onClick={() => handleSubMenuClick(subItem)}
                        className="
                          w-full text-left px-4 py-2 
                          rounded-lg 
                          text-sm
                          text-blue-800 
                          hover:bg-blue-50
                          transition
                        "
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        {/* Edit Profile */}
        <button
          className="
            mt-10 px-4 py-2 
            rounded-lg 
            text-blue-700 
            font-semibold 
            hover:bg-blue-100
            transition
          "
        >
          Edit Profile
        </button>
      </aside>
    </>
  );
}
