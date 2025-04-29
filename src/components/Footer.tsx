import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-4 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Leaf className="w-6 h-6" />
          <p className="text-sm">© 2025 Smart Greenhouse. Tous droits réservés.</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/terms" className="text-sm hover:underline">
            Conditions d'utilisation
          </Link>
          <Link to="/privacy" className="text-sm hover:underline">
            Politique de confidentialité
          </Link>
          <Link to="/faq" className="text-sm hover:underline">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;