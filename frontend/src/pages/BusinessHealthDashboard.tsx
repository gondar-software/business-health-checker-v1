import React, { useState } from 'react';
import { ViewType } from "@/types/params";
import ClientSetupView from "@/components/ClientSetupView";
import AssessmentView from "@/components/AssessmentView";
import DashboardView from "@/components/DashboardView";

const BusinessHealthDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('setup');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['governance', 'strategy', 'financial', 'cashflow', 'revenue', 'procurement', 'people', 'technology', 'compliance', 'customer', 'operational', 'sustainability']);

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {currentView === 'setup' ? (
        <ClientSetupView 
          setCurrentView={setCurrentView} 
          setSelectedAreas={setSelectedAreas} 
          selectedAreas={selectedAreas} />
      ) : currentView === 'dashboard' ? (
        <DashboardView
          setCurrentView={setCurrentView}
          selectedAreas={selectedAreas} />
      ) : (
        <AssessmentView 
          areaKey={currentView} 
          setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default BusinessHealthDashboard;