import React from 'react';

export interface Dimension {
  name: string;
  questions: string[];
}

export interface BusinessArea {
  name: string;
  icon: React.ComponentType<any>;
  dimensions: {
    maturity: Dimension;
    risk: Dimension;
    efficiency: Dimension;
  };
}

export interface BusinessAreas {
  [key: string]: BusinessArea;
}

export interface ClientInfo {
  name: string;
  sector: string;
  industry: string;
  size: string;
  turnover: string;
}

export interface AssessmentResponse {
  [questionIndex: number]: number;
}

export interface DimensionData {
  maturity: AssessmentResponse;
  risk: AssessmentResponse;
  efficiency: AssessmentResponse;
}

export interface AssessmentData {
  [areaKey: string]: DimensionData;
}

export interface RAGStatus {
  status: string;
  color: string;
  textColor: string;
  bgColor: string;
  opinion: string;
}

export interface SectorConfig {
  name: string;
  focus: string[];
  benchmarks: {
    substantial: number;
    reasonable: number;
    limited: number;
  };
  priorities: string[];
}

export interface IndustryConfig {
  name: string;
  criticalAreas: string[];
}

export interface SectorConfigs {
  [key: string]: SectorConfig;
}

export interface IndustryConfigs {
  [key: string]: IndustryConfig;
}

export type ViewType = 'setup' | 'dashboard' | string;

export interface ClientSetupViewParams {
  setCurrentView: (currentView: ViewType) => { type: string; payload: string; };
  setSelectedAreas: (selectedAreas: string[]) => { type: string; payload: string[]; };
  selectedAreas: string[];
}

export interface AssessmentViewParams {
  areaKey: string;
  setCurrentView: (currentView: ViewType) => { type: string; payload: string; };
  assessmentData: AssessmentData;
  setAssessmentData: (assessmentData: AssessmentData) => { type: string; payload: AssessmentData; };
  goToNextArea?: () => void;
}

export interface DashboardViewParams {
  setCurrentView: (currentView: ViewType) => { type: string; payload: string; };
  selectedAreas: string[];
  assessmentData: AssessmentData;
}