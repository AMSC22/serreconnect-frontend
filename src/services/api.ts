import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Créer une instance axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le JWT à chaque requête
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const publicEndpoints = ['/auth/login', '/users'];
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