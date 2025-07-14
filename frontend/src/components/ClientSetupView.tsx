import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { businessAreas } from "@/constants/questions";
import { sectorConfig } from "@/constants/sectorConfigs";
import { industryConfig } from "@/constants/industryConfigs";
import { ClientSetupViewParams } from "@/types/params";
import { clientInfoSchema } from "@/types/schemas";
import { useInfo } from "@/hooks/useInfo";
import { useToast } from '@/hooks/use-toast';

const ClientSetupView: React.FC<ClientSetupViewParams> = ({ setCurrentView, setSelectedAreas, selectedAreas }) => {
    const [selectedSector, setSelectedSector] = useState<string>('private');
    const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');
    const { info, createOrUpdateInfo } = useInfo();
    const { toast } = useToast();

    useEffect(() => {
        if (info) {
            const sectorKey = Object.keys(sectorConfig).find(
                key => sectorConfig[key].name === info.sector
            );
            const industryKey = Object.keys(industryConfig).find(
                key => industryConfig[key].name === info.industry
            );
    
            if (sectorKey) setSelectedSector(sectorKey);
            if (industryKey) setSelectedIndustry(industryKey);
    
            clientInfoForm.reset({
                ...info,
                sector: info.sector,
                industry: info.industry,
            });
        }
    }, [info]);

    const clientInfoForm = useForm({
        resolver: zodResolver(clientInfoSchema),
        defaultValues: info || {
            name: 'ABC Corporation Ltd',
            sector: sectorConfig[selectedSector].name,
            industry: industryConfig[selectedIndustry].name,
            size: 'Medium (50-250 employees)',
            turnover: '£1M - £5M',
        },
    });
    const { register, watch, setValue, handleSubmit } = clientInfoForm;

    // Watch these for live updates and default values
    const watchName = watch('name');
    const watchSize = watch('size');
    const watchTurnover = watch('turnover');

    const handleAreaToggle = (areaKey: string): void => {
        setSelectedAreas(prev =>
            prev.includes(areaKey)
                ? prev.filter(key => key !== areaKey)
                : [...prev, areaKey]
        );
    };

    const selectPresetAreas = (preset: string): void => {
        switch (preset) {
            case 'all':
                setSelectedAreas(Object.keys(businessAreas));
                break;
            case 'core':
                setSelectedAreas(['governance', 'strategy', 'financial', 'people', 'operational', 'compliance']);
                break;
            case 'startup':
                setSelectedAreas(['strategy', 'financial', 'revenue', 'people', 'technology']);
                break;
            case 'sector':
                if (sectorConfig[selectedSector]) {
                    setSelectedAreas(sectorConfig[selectedSector].focus);
                }
                break;
            case 'industry':
                if (industryConfig[selectedIndustry]) {
                    setSelectedAreas(industryConfig[selectedIndustry].criticalAreas);
                }
                break;
            default:
                break;
        }
    };
    
    const saveClientMutation = useMutation({
        mutationFn: async (data: any) => {
            await createOrUpdateInfo({
                name: data.name,
                sector: data.sector,
                industry: data.industry,
                size: data.size,
                turnover: data.turnover,
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Client information saved successfully."
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to save client information.",
                variant: "destructive",
            });
        }
    });

    const onSaveClientInfo = (data: any) => {
        saveClientMutation.mutate(data);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Client Assessment Setup</h2>
            </div>

            <form onSubmit={handleSubmit(onSaveClientInfo)}>
                {/* Client Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Client Information</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter client organization name"
                                defaultValue={watchName}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Size</label>
                            <select
                                {...register('size', { required: true })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue={watchSize}
                            >
                                <option value="Small (1-50 employees)">Small (1-50 employees)</option>
                                <option value="Medium (50-250 employees)">Medium (50-250 employees)</option>
                                <option value="Large (250-1000 employees)">Large (250-1000 employees)</option>
                                <option value="Enterprise (1000+ employees)">Enterprise (1000+ employees)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Turnover</label>
                            <select
                                {...register('turnover', { required: true })}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                defaultValue={watchTurnover}
                            >
                                <option value="Under £1M">Under £1M</option>
                                <option value="£1M - £5M">£1M - £5M</option>
                                <option value="£5M - £25M">£5M - £25M</option>
                                <option value="£25M - £100M">£25M - £100M</option>
                                <option value="£100M - £500M">£100M - £500M</option>
                                <option value="Over £500M">Over £500M</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Sector Selection */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sector Selection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(sectorConfig).map(([key, sector]) => (
                            <div
                                key={key}
                                onClick={() => {
                                    setSelectedSector(key);
                                    setValue("sector", sector.name);
                                }}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedSector === key
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <h4 className="font-semibold text-gray-800 mb-2">{sector.name}</h4>
                                <p className="text-sm text-gray-600 mb-3">Key Priorities:</p>
                                <ul className="text-xs text-gray-500">
                                    {sector.priorities.map((priority, index) => (
                                        <li key={index}>• {priority}</li>
                                    ))}
                                </ul>
                                {selectedSector === key && (
                                    <div className="mt-3 text-xs text-blue-600 font-medium">
                                        ✓ Selected Sector
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industry Selection */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Selection</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Object.entries(industryConfig).map(([key, industry]) => (
                            <div
                                key={key}
                                onClick={() => {
                                    setSelectedIndustry(key);
                                    setValue("industry", industry.name);
                                }}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedIndustry === key
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <h4 className="font-semibold text-gray-800 mb-2 text-sm">{industry.name}</h4>
                                <p className="text-xs text-gray-600 mb-2">Critical Areas:</p>
                                <div className="text-xs text-gray-500">
                                    {industry.criticalAreas.slice(0, 2).map(areaKey => businessAreas[areaKey]?.name).join(', ')}
                                    {industry.criticalAreas.length > 2 && '...'}
                                </div>
                                {selectedIndustry === key && (
                                    <div className="mt-3 text-xs text-green-600 font-medium">
                                        ✓ Selected Industry
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-end w-full items-end mb-6">
                    <Button type="submit" className="w-1/4">
                        Save
                    </Button>
                </div>
            </form>

            {/* Business Areas Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Business Areas to Assess</h3>

                <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Quick Presets:</h4>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => selectPresetAreas('all')}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                        >
                            All Areas (12)
                        </button>
                        <button
                            onClick={() => selectPresetAreas('core')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                        >
                            Core Business (6)
                        </button>
                        <button
                            onClick={() => selectPresetAreas('startup')}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm"
                        >
                            Startup Essentials (5)
                        </button>
                        <button
                            onClick={() => selectPresetAreas('sector')}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm"
                        >
                            {sectorConfig[selectedSector]?.name} Focus ({sectorConfig[selectedSector]?.focus.length})
                        </button>
                        <button
                            onClick={() => selectPresetAreas('industry')}
                            className="px-3 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 text-sm"
                        >
                            {industryConfig[selectedIndustry]?.name} Critical ({industryConfig[selectedIndustry]?.criticalAreas.length})
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(businessAreas).map(([key, area]) => {
                        const isSelected = selectedAreas.includes(key);
                        const isCritical = industryConfig[selectedIndustry]?.criticalAreas.includes(key);
                        const isFocus = sectorConfig[selectedSector]?.focus.includes(key);
                        const IconComponent = area.icon;

                        return (
                            <div
                                key={key}
                                onClick={() => handleAreaToggle(key)}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${isSelected
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                        <IconComponent className="w-5 h-5 text-gray-600 mr-2" />
                                        <h4 className="font-semibold text-gray-800 text-sm">{area.name}</h4>
                                    </div>
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                        }`}>
                                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                </div>

                                {/* Indicators */}
                                <div className="flex gap-1 mb-2">
                                    {isCritical && (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                            Industry Critical
                                        </span>
                                    )}
                                    {isFocus && (
                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                                            Sector Focus
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-gray-600">
                                    15 questions across 3 dimensions
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Selected Areas:</span>
                        <span className="font-medium">{selectedAreas.length} of {Object.keys(businessAreas).length}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Total Questions:</span>
                        <span className="font-medium">{selectedAreas.length * 15} questions</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Estimated Time:</span>
                        <span className="font-medium">{Math.ceil(selectedAreas.length * 8)} - {Math.ceil(selectedAreas.length * 12)} minutes</span>
                    </div>
                </div>
            </div>

            {/* Assessment Configuration Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Assessment Configuration Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-medium text-blue-800 mb-2">Client Details:</h4>
                        <ul className="text-blue-700 space-y-1">
                            <li>• <strong>Client:</strong> {clientInfoForm.getValues().name}</li>
                            <li>• <strong>Sector:</strong> {clientInfoForm.getValues().sector}</li>
                            <li>• <strong>Industry:</strong> {clientInfoForm.getValues().industry}</li>
                            <li>• <strong>Size:</strong> {clientInfoForm.getValues().size}</li>
                            <li>• <strong>Turnover:</strong> {clientInfoForm.getValues().turnover}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-800 mb-2">Assessment Scope:</h4>
                        <ul className="text-blue-700 space-y-1">
                            <li>• <strong>Areas:</strong> {selectedAreas.length} selected</li>
                            <li>• <strong>Questions:</strong> {selectedAreas.length * 15} total</li>
                            <li>• <strong>Duration:</strong> {Math.ceil(selectedAreas.length * 10)} min est.</li>
                            <li>• <strong>Focus:</strong> {selectedSector === 'private' ? 'Performance' : selectedSector === 'public' ? 'Service' : 'Impact'} driven</li>
                        </ul>
                    </div>
                </div>

                {selectedAreas.length < 3 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                            ⚠️ <strong>Recommendation:</strong> Select at least 3-4 areas for a meaningful business health assessment.
                        </p>
                    </div>
                )}

                <div className="mt-4 flex gap-3">
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        disabled={selectedAreas.length === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedAreas.length === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        Start Assessment →
                    </button>

                    <button
                        onClick={() => {
                            setSelectedAreas([]);
                        }}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientSetupView;