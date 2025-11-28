import { useRef, useEffect } from "react";

export default function Navbar({ toggleSidebar, profileMenuOpen, setProfileMenuOpen }) {
  const titleRef = useRef(null);
  const avatarRef = useRef(null);
  const menuRef = useRef(null);

  const gotoHome = () => {
    // emit a custom event to tell App to go home if it supports it
    const ev = new CustomEvent("navigate-home");
    window.dispatchEvent(ev);
  };

  // close menu on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target)
      ) {
        setProfileMenuOpen && setProfileMenuOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [setProfileMenuOpen]);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-10 py-4 flex items-center justify-between shadow-sm">
      <h1
        ref={titleRef}
        className="text-2xl font-extrabold text-blue-900 cursor-pointer"
        onClick={gotoHome}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") gotoHome();
        }}
      >
        AI & DS Association
      </h1>

      <div className="flex items-center gap-4 relative">
        <div
          ref={avatarRef}
          className="w-12 h-12 rounded-full bg-blue-300 cursor-pointer flex items-center justify-center"
          onClick={() => setProfileMenuOpen && setProfileMenuOpen((s) => !s)}
          role="button"
          aria-label="Open profile menu"
          title="Profile"
        />

        {/* Profile dropdown */}
        {profileMenuOpen ? (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
          >
            <ul className="py-2">
              <li>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">My Profile</button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">Edit Profile</button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">Logout</button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
