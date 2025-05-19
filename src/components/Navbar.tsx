import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bell, Settings, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Extraire greenhouseId de l'URL
  const url = location.pathname.match(/\/(greenhouse|history|alerts|settings)\/([^\/]+)/)?.[2]
  const greenhouseId = url !== "create"? url: "";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setShowNotifications(false);
    setShowProfile(false);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setShowProfile(false);
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
    setShowNotifications(false);
    setIsMenuOpen(false);
  };

  // Fermer les popups et le menu hamburger lors d'un clic n'importe où
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
        setShowProfile(false);
        setIsMenuOpen(false);
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
          {user && greenhouseId && (
            <>
              <li>
                <NavLink
                  to={`/greenhouse/${greenhouseId}`}
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Tableau de bord
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/history/${greenhouseId}`}
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Historique
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/alerts/${greenhouseId}`}
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                >
                  Alertes
                </NavLink>
              </li>
            </>
          )}
          {!user && (
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
                    <NavLink
                      to="/alerts/all"
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowNotifications(false)}
                    >
                      Voir toutes les alertes
                    </NavLink>
                  </div>
                )}
              </div>
              <div ref={profileRef}>
                <Settings
                  className="hidden md:block w-5 h-5 cursor-pointer hover:text-gray-200"
                  onClick={toggleProfile}
                />
                {showProfile && (
                  <div className="absolute right-0 top-10 bg-white text-black p-4 rounded-md shadow-lg z-10 w-64">
                    <ul className="space-y-2">
                      {greenhouseId && (
                        <li className='bock'>
                          <NavLink
                            to={`/settings/${greenhouseId}`}
                            className={({ isActive }) =>
                              isActive ? 'underline font-bold flex items-center space-x-2 hover:underline' : 'flex items-center space-x-2 hover:underline'
                            }
                            onClick={toggleMenu}
                          >
                            <Settings className="w-5 h-5"/>
                            <span>Paramètres</span>
                          </NavLink>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            setShowProfile(false);
                          }}
                          className="flex items-center space-x-2 hover:underline"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Déconnexion</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="md:hidden" ref={menuRef}>
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
          {user && greenhouseId && (
            <>
              <li>
                <NavLink
                  to={`/greenhouse/${greenhouseId}`}
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
                  to={`/history/${greenhouseId}`}
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
                  to={`/alerts/${greenhouseId}`}
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Alertes
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              {/* <li>
                <NavLink
                  to="/alerts/"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold' : 'hover:underline'
                  }
                  onClick={toggleMenu}
                >
                  Toutes les notifications
                </NavLink>
              </li> */}
              {greenhouseId && (
                <li>
                  <NavLink
                    to={`/settings/${greenhouseId}`}
                    className={({ isActive }) =>
                      isActive ? 'underline font-bold flex items-center space-x-2 hover:underline' : 'flex items-center space-x-2 hover:underline'
                    }
                    onClick={toggleMenu}
                  >
                    <Settings className="w-5 h-5"/>
                    <span>Paramètres</span>
                  </NavLink>
                </li>
              )}
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
            </>
          )}
          {!user && (
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
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;