import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Politique de confidentialité</h1>
      <section className="space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold">1. Collecte des données</h2>
        <p>
          Nous collectons des informations telles que votre nom d'utilisateur, votre adresse e-mail et les données
          des capteurs de votre serre pour fournir nos services.
        </p>
        <h2 className="text-xl font-semibold">2. Utilisation des données</h2>
        <p>
          Vos données sont utilisées pour gérer votre compte, fournir des alertes et améliorer l'expérience
          utilisateur.
        </p>
        <h2 className="text-xl font-semibold">3. Partage des données</h2>
        <p>
          Nous ne partageons vos données avec des tiers que si cela est nécessaire pour fournir nos services
          (par exemple, fournisseurs d'e-mails) ou si la loi l'exige.
        </p>
        <h2 className="text-xl font-semibold">4. Sécurité</h2>
        <p>
          Nous utilisons des mesures de sécurité (comme le chiffrement) pour protéger vos données, mais aucune
          méthode n'est totalement infaillible.
        </p>
        <h2 className="text-xl font-semibold">5. Vos droits</h2>
        <p>
          Vous pouvez demander l'accès, la correction ou la suppression de vos données en nous contactant à
          support@smartgreenhouse.com.
        </p>
      </section>
    </div>
  );
};

export default Privacy;