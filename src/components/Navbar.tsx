import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Settings, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  console.log('Navbar: user =', user);

  const toggleMenu = () => {
    console.log('Navbar: toggle menu, isMenuOpen =', !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleNotifications = () => {
    console.log('Navbar: toggle notifications, showNotifications =', !showNotifications);
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };
  const toggleSettings = () => {
    console.log('Navbar: toggle settings, showSettings =', !showSettings);
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Greenhouse</h1>
        <ul className="hidden md:flex gap-6 items-center">
          {user && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Tableau de bord
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Historique
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alerts"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Alertes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Paramètres
                </NavLink>
              </li>
            </>
          )}
          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Connexion
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Inscription
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={logout}
                className="flex items-center space-x-2 hover:underline"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </li>
          )}
        </ul>
        <div className="flex items-center gap-4 relative">
          {user && (
            <>
              <div ref={notificationRef}>
                <Bell
                  className="w-5 h-5 cursor-pointer hover:text-gray-200"
                  onClick={toggleNotifications}
                />
                {showNotifications && (
                  <div className="absolute right-10 top-10 bg-white text-black p-4 rounded-md shadow-lg z-10 w-64">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    <p>Aucune notification.</p>
                  </div>
                )}
              </div>
              <div ref={settingsRef}>
                <Settings
                  className="w-5 h-5 cursor-pointer hover:text-gray-200"
                  onClick={toggleSettings}
                />
                {showSettings && (
                  <div className="absolute right-0 top-10 bg-white text-black p-4 rounded-md shadow-lg z-10 w-64">
                    <h3 className="font-semibold mb-2">Paramètres</h3>
                    <p>Modifier le profil</p>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="md:hidden">
            {isMenuOpen ? (
              <X className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <ul className="md:hidden bg-green-600 text-white flex flex-col items-start gap-4 px-6 py-4 absolute top-16 left-0 w-full z-20">
          {user && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Tableau de bord
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Historique
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alerts"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Alertes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Paramètres
                </NavLink>
              </li>
            </>
          )}
          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Connexion
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Inscription
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="flex items-center space-x-2 hover:underline"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;