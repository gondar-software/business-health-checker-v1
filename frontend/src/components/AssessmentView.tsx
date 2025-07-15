import React from 'react';
import { businessAreas } from "@/constants/questions";
import { AssessmentViewParams, DimensionData, RAGStatus } from "@/types/params";

// Assessment View Component
const AssessmentView: React.FC<AssessmentViewParams> = ({ areaKey, setCurrentView, assessmentData, setAssessmentData }) => {
    const area = businessAreas[areaKey];
    const IconComponent = area.icon;

    // Calculate scores for each dimension using 0-10 scale
    const calculateDimensionScore = (areaKey: string, dimensionKey: string): number => {
        if (!businessAreas[areaKey] || !businessAreas[areaKey].dimensions) {
            return 0;
        }

        const dimension = businessAreas[areaKey].dimensions[dimensionKey as keyof typeof businessAreas[typeof areaKey]['dimensions']];
        if (!dimension) {
            return 0;
        }

        const responses = assessmentData[areaKey]?.[dimensionKey as keyof DimensionData] || {};
        const questions = dimension.questions || [];
        let totalScore = 0;
        let answeredQuestions = 0;

        questions.forEach((_, index) => {
            if (responses[index] !== undefined) {
                totalScore += responses[index];
                answeredQuestions++;
            }
        });

        if (answeredQuestions === 0) return 0;
        // Convert 0-10 scale to percentage: (totalScore / (answeredQuestions * 10)) * 100
        return Math.round((totalScore / (answeredQuestions * 10)) * 100);
    };

    // Calculate overall area score
    const calculateAreaScore = (areaKey: string): number => {
        if (!businessAreas[areaKey] || !businessAreas[areaKey].dimensions) {
            return 0;
        }

        const dimensions = Object.keys(businessAreas[areaKey].dimensions);
        const scores = dimensions.map(dim => calculateDimensionScore(areaKey, dim));
        const validScores = scores.filter(score => score > 0);

        if (validScores.length === 0) return 0;
        return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
    };

    // Get RAG status based on audit opinion levels
    const getRAGStatus = (score: number): RAGStatus => {
        if (score >= 75) return {
            status: 'SUBSTANTIAL',
            color: 'bg-green-500',
            textColor: 'text-green-700',
            bgColor: 'bg-green-50',
            opinion: 'Substantial Assurance'
        };
        if (score >= 50) return {
            status: 'REASONABLE',
            color: 'bg-blue-500',
            textColor: 'text-blue-700',
            bgColor: 'bg-blue-50',
            opinion: 'Reasonable Assurance'
        };
        if (score >= 25) return {
            status: 'LIMITED',
            color: 'bg-yellow-500',
            textColor: 'text-yellow-700',
            bgColor: 'bg-yellow-50',
            opinion: 'Limited Assurance'
        };
        return {
            status: 'NONE',
            color: 'bg-red-500',
            textColor: 'text-red-700',
            bgColor: 'bg-red-50',
            opinion: 'No Assurance'
        };
    };

    // Handle assessment responses using 0-10 scale
    const handleResponse = (areaKey: string, dimensionKey: string, questionIndex: number, value: string): void => {
        setAssessmentData(prev => ({
            ...prev,
            [areaKey]: {
                ...prev[areaKey],
                [dimensionKey as keyof DimensionData]: {
                    ...prev[areaKey]?.[dimensionKey as keyof DimensionData],
                    [questionIndex]: parseInt(value)
                }
            }
        }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <button
                    onClick={() => setCurrentView('dashboard')}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    ← Back to Dashboard
                </button>
                <div className="flex items-center mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-800">{area.name}</h2>
                </div>
                <p className="text-gray-600 mb-6">
                    Rate each statement on a scale of 0-10 (0 = Not at all, 10 = Excellent). Results will be displayed using professional audit opinion levels.
                </p>

                {/* Dimension Progress Summary */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {Object.entries(area.dimensions).map(([dimKey, dim]) => {
                        const score = calculateDimensionScore(areaKey, dimKey);
                        const rag = getRAGStatus(score);
                        return (
                            <div key={dimKey} className={`p-4 rounded-lg border-2 ${rag.bgColor}`}>
                                <h3 className="font-semibold text-gray-800 mb-2">{dim.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">{score}%</span>
                                    <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${rag.color}`}>
                                        {rag.status}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Assessment Questions by Dimension */}
            <div className="space-y-8">
                {Object.entries(area.dimensions).map(([dimKey, dimension]) => (
                    <div key={dimKey} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                            {dimension.name}
                        </h3>

                        <div className="space-y-6">
                            {dimension.questions.map((question, index) => (
                                <div key={index} className="border-l-4 border-blue-200 pl-4">
                                    <p className="mb-4 font-medium text-gray-800">{question}</p>

                                    {/* 0-10 Scale Slider */}
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-500 min-w-[20px]">0</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={assessmentData[areaKey]?.[dimKey as keyof DimensionData]?.[index] || 0}
                                            onChange={(e) => handleResponse(areaKey, dimKey, index, e.target.value)}
                                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                background: `linear-gradient(to right, 
                            #ef4444 0%, #ef4444 25%, 
                            #f59e0b 25%, #f59e0b 50%, 
                            #3b82f6 50%, #3b82f6 75%, 
                            #10b981 75%, #10b981 100%)`
                                            }}
                                        />
                                        <span className="text-sm text-gray-500 min-w-[20px]">10</span>
                                        <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded font-medium min-w-[3rem] text-center">
                                            {assessmentData[areaKey]?.[dimKey as keyof DimensionData]?.[index] || 0}
                                        </div>
                                    </div>

                                    {/* Score Interpretation */}
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span className="font-medium">Current Rating: </span>
                                        {(() => {
                                            const score = (assessmentData[areaKey]?.[dimKey as keyof DimensionData]?.[index] || 0) * 10;
                                            if (score >= 75) return <span className="text-green-600 font-medium">Substantial Assurance Level</span>;
                                            if (score >= 50) return <span className="text-blue-600 font-medium">Reasonable Assurance Level</span>;
                                            if (score >= 25) return <span className="text-yellow-600 font-medium">Limited Assurance Level</span>;
                                            return <span className="text-red-600 font-medium">No Assurance Level</span>;
                                        })()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dimension Summary */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-800">{dimension.name} Dimension Score</h4>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{calculateDimensionScore(areaKey, dimKey)}%</p>
                                </div>
                                <div className={`px-4 py-2 rounded-full font-medium text-white ${getRAGStatus(calculateDimensionScore(areaKey, dimKey)).color}`}>
                                    {getRAGStatus(calculateDimensionScore(areaKey, dimKey)).status}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall Area Score */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Overall {area.name} Assessment</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{calculateAreaScore(areaKey)}%</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {getRAGStatus(calculateAreaScore(areaKey)).opinion}
                        </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-medium text-white ${getRAGStatus(calculateAreaScore(areaKey)).color}`}>
                        {getRAGStatus(calculateAreaScore(areaKey)).status}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Assessment Progress</span>
                        <span>
                            {Object.values(assessmentData[areaKey] || {}).flatMap(dim => Object.values(dim)).length}
                            &nbsp;of {Object.values(area.dimensions).reduce((total, dim) => total + dim.questions.length, 0)} questions completed
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${(Object.values(assessmentData[areaKey] || {}).flatMap(dim => Object.values(dim)).length /
                                    Object.values(area.dimensions).reduce((total, dim) => total + dim.questions.length, 0)) * 100}%`
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentView;