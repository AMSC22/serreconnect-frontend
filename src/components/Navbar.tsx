import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Bell, Settings, Menu, X, LogOut, Home, History, AlertTriangle, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { alertService } from '../services/alert_service';
import { Alert } from '../types/Alert';
import { greenhouseService } from '../services/greenhouse_service';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState<Alert[]>([]);
  const [hasGreenhouses, setHasGreenhouses] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Extraction de l'ID utilisateur depuis les paramètres ou l'URL
  const greenhouseId = location.pathname.match(/\/greenhouse\/([^\/]+)/)?.[1];
  
  // Vérifier si nous sommes sur une page qui nécessite un greenhouseId
  const isPageRequiringGreenhouseId = location.pathname.includes('/history/') || 
                                      location.pathname.includes('/alerts/') || 
                                      location.pathname.startsWith('/greenhouse/');
  
  // Booléen pour déterminer si on doit afficher les éléments dépendants du greenhouseId
  const showGreenhouseFeatures = !!greenhouseId && hasGreenhouses;
    
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => {
    if (!showGreenhouseFeatures) return; // Désactiver si pas de greenhouseId
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  useEffect(() => {
    const fetchGreenhouses = async () => {
      if (!user) return;
      try {
        const greenhouses = await greenhouseService.getGreenhousesByUserId(user.id);
        setHasGreenhouses(greenhouses.length > 0);
      } catch (error) {
        console.error('Navbar: erreur lors de la récupération des serres', error);
      }
    };

    fetchGreenhouses();
  }, [user]);

  useEffect(() => {
    const fetchNotifications = async () => {
      // Ne charger les notifications que si on a un greenhouseId
      if (!user || !hasGreenhouses || !greenhouseId) return;
      
      try {
        let alerts: Alert[] = [];
        if (user.is_admin) {
          alerts = await alertService.getAllAlerts();
        } else if (greenhouseId) {
          alerts = await alertService.getAlertsByGreenhouseId(greenhouseId);
        }
        setNotifications(alerts.filter((alert) => !alert.is_resolved));
      } catch (error) {
        console.error('Navbar: erreur lors de la récupération des notifications', error);
      }
    };

    // Ne lancer la fonction que si on a un greenhouseId
    if (greenhouseId) {
      fetchNotifications();
    } else {
      // Vider les notifications si pas de greenhouseId
      setNotifications([]);
    }
  }, [user, hasGreenhouses, greenhouseId]);

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

  const isCreatePage = location.pathname.includes('/greenhouse/create');
  const showNavLinks = user && hasGreenhouses && !isCreatePage;

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Greenhouse</h1>

        <ul className="hidden md:flex gap-6 items-center">
          {showNavLinks && (
            <>
              <li>
                <NavLink
                  to={greenhouseId ? `/greenhouse/${greenhouseId}` : '/'}
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                  }
                >
                  <Home className="w-5 h-5" />
                  <span>Tableau de bord</span>
                </NavLink>
              </li>
              
              {/* Éléments conditionnels qui n'apparaissent que si greenhouseId existe */}
              {showGreenhouseFeatures && (
                <>
                  <li>
                    <NavLink
                      to={`/history/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                      }
                    >
                      <History className="w-5 h-5" />
                      <span>Historique</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/alerts/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                      }
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span>Alertes</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/settings/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                      }
                    >
                      <Settings className="w-5 h-5" />
                      <span>Paramètres</span>
                    </NavLink>
                  </li>
                </>
              )}
              
              {/* Afficher des liens alternatifs quand greenhouseId n'est pas disponible */}
              {!greenhouseId && hasGreenhouses && (
                <li>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                    }
                  >
                    <Settings className="w-5 h-5" />
                    <span>Paramètres utilisateur</span>
                  </NavLink>
                </li>
              )}
            </>
          )}

          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                  }
                >
                  <LogIn className="w-5 h-5" />
                  <span>Connexion</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold flex items-center gap-1' : 'hover:underline flex items-center gap-1'
                  }
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Inscription</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {user && showNavLinks && (
          <div className="hidden md:flex items-center gap-4">
            {/* N'afficher les notifications que si greenhouseId existe */}
            {showGreenhouseFeatures && (
              <div ref={notificationRef} className="relative">
                <Bell
                  className={`w-5 h-5 cursor-pointer ${showGreenhouseFeatures ? 'hover:text-gray-200' : 'text-gray-400'}`}
                  onClick={toggleNotifications}
                />
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute -top-1 -right-1">
                    {notifications.length}
                  </span>
                )}
                {showNotifications && showGreenhouseFeatures && (
                  <div className="absolute right-0 top-10 bg-white text-black p-4 rounded-md shadow-lg z-10 w-64">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    {notifications.length > 0 ? (
                      <ul>
                        {notifications.map((alert) => (
                          <li key={alert.id} className="mb-2 pb-2 border-b border-gray-200">
                            {alert.message}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucune notification.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div ref={settingsRef} className="relative">
              <Settings
                className="w-5 h-5 cursor-pointer hover:text-gray-200"
                onClick={toggleSettings}
              />
              {showSettings && (
                <div className="absolute right-0 top-10 bg-white text-black p-4 rounded-md shadow-lg z-10 w-64">
                  <h3 className="font-semibold mb-2">Paramètres</h3>
                  <ul>
                    <li className="mb-2">
                      <NavLink to="/settings" className="hover:text-green-600 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="hover:text-green-600 flex items-center gap-2 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="md:hidden">
          {isMenuOpen ? (
            <X className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          ) : (
            <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {isMenuOpen && (
        <ul className="md:hidden bg-green-600 text-white flex flex-col items-start gap-4 px-6 py-4 absolute top-16 left-0 w-full z-20 shadow-lg">
          {showNavLinks && (
            <>
              <li className="w-full">
                <NavLink
                  to={greenhouseId ? `/greenhouse/${greenhouseId}` : '/'}
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                  }
                  onClick={toggleMenu}
                >
                  <Home className="w-5 h-5" />
                  <span>Tableau de bord</span>
                </NavLink>
              </li>
              
              {/* Afficher les éléments conditionnels en mode mobile également */}
              {showGreenhouseFeatures && (
                <>
                  <li className="w-full">
                    <NavLink
                      to={`/history/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                      }
                      onClick={toggleMenu}
                    >
                      <History className="w-5 h-5" />
                      <span>Historique</span>
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to={`/alerts/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                      }
                      onClick={toggleMenu}
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span>Alertes</span>
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to={`/notifications/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                      }
                      onClick={toggleMenu}
                    >
                      <Bell className="w-5 h-5" />
                      <span>Notifications</span>
                      {notifications.length > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-1 ml-2">
                          {notifications.length}
                        </span>
                      )}
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink
                      to={`/settings/${greenhouseId}`}
                      className={({ isActive }) =>
                        isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                      }
                      onClick={toggleMenu}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Paramètres</span>
                    </NavLink>
                  </li>
                </>
              )}
              
              {/* Afficher des liens alternatifs en mode mobile également */}
              {!greenhouseId && hasGreenhouses && (
                <li className="w-full">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                    }
                    onClick={toggleMenu}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Paramètres utilisateur</span>
                  </NavLink>
                </li>
              )}
              
              <li className="w-full pt-2 border-t border-green-500">
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 hover:underline w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="w-full">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                  }
                  onClick={toggleMenu}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Connexion</span>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? 'underline font-bold flex items-center gap-2' : 'hover:underline flex items-center gap-2'
                  }
                  onClick={toggleMenu}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Inscription</span>
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