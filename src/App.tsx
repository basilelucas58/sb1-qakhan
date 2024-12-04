import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ServiceGrid } from './components/ServiceGrid';
import { PetServiceGrid } from './components/PetServiceGrid';
import { SportsServiceGrid } from './components/SportsServiceGrid';
import { BeautyServiceGrid } from './components/BeautyServiceGrid';
import { AssistanceServiceGrid } from './components/AssistanceServiceGrid';
import { MoreServiceGrid } from './components/MoreServiceGrid';
import { ServiceDetail } from './components/ServiceDetail';
import { OfferServiceForm } from './components/OfferServiceForm';
import { useAuth } from './components/auth/AuthContext';

function App() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('Hogar');
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showOfferService, setShowOfferService] = useState(false);

  const handleHomeClick = () => {
    setSelectedCategory('Hogar');
    setShowServiceDetail(false);
    setSelectedService(null);
  };

  const handleServiceClick = (serviceType: string) => {
    setSelectedService(serviceType);
    setShowServiceDetail(true);
  };

  const renderServiceGrid = () => {
    if (showServiceDetail && selectedService) {
      return (
        <ServiceDetail 
          onBack={() => setShowServiceDetail(false)} 
          serviceType={selectedService}
          category={selectedCategory}
        />
      );
    }

    switch (selectedCategory) {
      case 'Hogar':
        return <ServiceGrid onServiceClick={handleServiceClick} />;
      case 'Mascotas':
        return <PetServiceGrid onServiceClick={handleServiceClick} />;
      case 'Deporte':
        return <SportsServiceGrid onServiceClick={handleServiceClick} />;
      case 'Estética':
        return <BeautyServiceGrid onServiceClick={handleServiceClick} />;
      case 'Asistencia':
        return <AssistanceServiceGrid onServiceClick={handleServiceClick} />;
      case 'Mas':
        return <MoreServiceGrid onServiceClick={handleServiceClick} />;
      default:
        return <ServiceGrid onServiceClick={handleServiceClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#59B7F9]">
      <Navbar 
        onHomeClick={handleHomeClick} 
        onOfferService={() => setShowOfferService(true)}
      />
      <div className="container mx-auto px-4 pt-24">
        {!showServiceDetail && <Hero />}
        <div className="relative mt-8">
          {!showServiceDetail && (
            <Sidebar 
              selectedCategory={selectedCategory} 
              onCategorySelect={setSelectedCategory} 
            />
          )}
          <div className={!showServiceDetail ? "ml-48" : ""}>
            {renderServiceGrid()}
          </div>
        </div>
      </div>

      {showOfferService && (
        <OfferServiceForm onClose={() => setShowOfferService(false)} />
      )}
    </div>
  );
}

export default App;