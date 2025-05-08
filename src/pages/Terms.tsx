import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Conditions d'utilisation</h1>
      <section className="space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold">1. Acceptation des conditions</h2>
        <p>
          En utilisant l'application SmartGreenhouse, vous acceptez d'être lié par ces conditions d'utilisation.
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
        </p>
        <h2 className="text-xl font-semibold">2. Utilisation de l'application</h2>
        <p>
          L'application est destinée à la gestion des serres connectées. Vous vous engagez à utiliser l'application
          conformément aux lois applicables et à ne pas tenter d'accéder à des données non autorisées.
        </p>
        <h2 className="text-xl font-semibold">3. Compte utilisateur</h2>
        <p>
          Vous êtes responsable de la confidentialité de votre mot de passe et de toutes les activités effectuées
          sous votre compte.
        </p>
        <h2 className="text-xl font-semibold">4. Limitation de responsabilité</h2>
        <p>
          SmartGreenhouse ne peut être tenu responsable des dommages indirects ou consécutifs résultant de
          l'utilisation de l'application.
        </p>
        <h2 className="text-xl font-semibold">5. Modification des conditions</h2>
        <p>
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront
          publiées sur cette page.
        </p>
      </section>
    </div>
  );
};

export default Terms;