import React from 'react';
import { useLocation } from "wouter";
import ClientSetupView from "@/components/ClientSetupView";
import AssessmentView from "@/components/AssessmentView";
import DashboardView from "@/components/DashboardView";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentView, useSelectedAreas, useAssessmentData } from '@/global/interface';

const BusinessHealthDashboard: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [, navigate] = useLocation();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const { currentView, setCurrentView } = useCurrentView();
  const { selectedAreas, setSelectedAreas } = useSelectedAreas();
  const { assessmentData, setAssessmentData } = useAssessmentData();

  const goToNextArea = () => {
    const currentIndex = selectedAreas.indexOf(currentView);
    if (currentIndex < selectedAreas.length - 1) {
      setCurrentView(selectedAreas[currentIndex + 1]);
    } else {
      setCurrentView('dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {currentView === 'setup' ? (
        <ClientSetupView
          setCurrentView={setCurrentView}
          setSelectedAreas={setSelectedAreas}
          selectedAreas={selectedAreas} 
        />
      ) : currentView === 'dashboard' ? (
        <DashboardView
          setCurrentView={setCurrentView}
          selectedAreas={selectedAreas}
          assessmentData={assessmentData} 
        />
      ) : (
        <AssessmentView
          areaKey={currentView}
          setCurrentView={setCurrentView}
          assessmentData={assessmentData}
          setAssessmentData={setAssessmentData}
          goToNextArea={goToNextArea}
        />
      )}
    </div>
  );
};

export default BusinessHealthDashboard;