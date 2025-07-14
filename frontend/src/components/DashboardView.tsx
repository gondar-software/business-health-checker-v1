import React from 'react';
import { DashboardViewParams } from '@/types/params';
import { businessAreas } from '@/constants/questions';

const DashboardView: React.FC<DashboardViewParams> = ({ setCurrentView, selectedAreas }) => {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Business Operations Health Check</h1>
              <p className="text-gray-600">Assessment configured for {selectedAreas.length} business areas</p>
            </div>
            <button
              onClick={() => setCurrentView('setup')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Change Configuration
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {selectedAreas.map((key) => {
            const area = businessAreas[key];
            const IconComponent = area.icon;
            
            return (
              <div key={key} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <IconComponent className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-800 leading-tight">{area.name}</h3>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full bg-blue-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold px-2 py-1 rounded bg-gray-100 text-gray-600">
                      Not Started
                    </span>
                    <button
                      onClick={() => setCurrentView(key)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Assess
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default DashboardView;