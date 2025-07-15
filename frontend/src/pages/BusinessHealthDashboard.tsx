import React, { useState } from 'react';
import { ViewType, AssessmentData } from "@/types/params";
import ClientSetupView from "@/components/ClientSetupView";
import AssessmentView from "@/components/AssessmentView";
import DashboardView from "@/components/DashboardView";

const BusinessHealthDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('setup');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    'governance',
    'strategy',
    'financial',
    'cashflow',
    'revenue',
    'procurement',
    'people',
    'technology',
    'compliance',
    'customer',
    'operational',
    'sustainability'
  ]);
  
  // Update sample assessment data to use 0-10 scale
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});

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
          selectedAreas={selectedAreas}
          assessmentData={assessmentData} />
      ) : (
        <AssessmentView
          areaKey={currentView}
          setCurrentView={setCurrentView}
          assessmentData={assessmentData}
          setAssessmentData={setAssessmentData} />
      )}
    </div>
  );
};

export default BusinessHealthDashboard;