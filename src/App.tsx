import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;