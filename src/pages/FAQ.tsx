import React from 'react';

const FAQ = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Foire aux questions</h1>
      <section className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold">Comment configurer une serre ?</h2>
          <p>
            Les administrateurs peuvent créer une serre via le tableau de bord admin. Contactez votre administrateur
            pour associer une serre à votre compte.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Que faire si je ne vois pas les données des capteurs ?</h2>
          <p>
            Vérifiez que votre serre est correctement configurée et que les capteurs sont connectés. Si le problème
            persiste, contactez le support.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Comment réinitialiser mon mot de passe ?</h2>
          <p>
            Cliquez sur "Mot de passe oublié" sur la page de connexion et suivez les instructions pour recevoir
            un lien de réinitialisation.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Comment ajouter un badge RFID ?</h2>
          <p>
            Accédez à la page Paramètres, section Gestion des badges, et entrez un nom pour le badge. Les badges
            sont liés à votre compte utilisateur.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FAQ;