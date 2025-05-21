import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Créer une instance axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Ajoutez cette configuration pour gérer les redirections
  maxRedirects: 5,
  // Cette fonction transforme les URL de redirection pour assurer qu'elles utilisent HTTPS
  beforeRedirect: (options, { headers }) => {
    if (options.href && options.href.startsWith('http:')) {
      options.href = options.href.replace('http:', 'https:');
    }
  }
});

// Intercepteur pour ajouter le JWT à chaque requête
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const publicEndpoints = ['/auth/login', '/users'];
    // Force HTTPS
    if (config.url && config.baseURL) {
      if (config.baseURL.startsWith('http:')) {
        config.baseURL = config.baseURL.replace('http:', 'https:');
      }
    }
    if (!publicEndpoints.includes(config.url || '')) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs (ex. : 401 Unauthorized)
api.interceptors.response.use(
  response => response,
  error => {
    // Vérifier si c'est une erreur 401 (Non autorisé)
    if (error.response && error.response.status === 401) {
      // Récupérer la page actuelle (sans le domaine)
      const currentPath = window.location.pathname.substring(1); // enlève le '/' initial
      
      // Rediriger vers login seulement si on n'est pas déjà sur login, register ou logout
      if (currentPath !== 'login' && currentPath !== 'register' && currentPath !== 'logout') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;