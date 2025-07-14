import { IndustryConfigs } from "@/types/params";

export const industryConfig: IndustryConfigs = {
    manufacturing: {
        name: 'Manufacturing',
        criticalAreas: ['operational', 'procurement', 'technology', 'compliance']
    },
    healthcare: {
        name: 'Healthcare',
        criticalAreas: ['compliance', 'people', 'technology', 'customer']
    },
    financial: {
        name: 'Financial Services',
        criticalAreas: ['compliance', 'technology', 'financial', 'customer']
    },
    insurance: {
        name: 'Insurance',
        criticalAreas: ['compliance', 'technology', 'financial', 'customer']
    },
    education: {
        name: 'Education',
        criticalAreas: ['people', 'technology', 'governance', 'customer']
    },
    retail: {
        name: 'Retail',
        criticalAreas: ['customer', 'revenue', 'technology', 'operational']
    },
    technology: {
        name: 'Technology',
        criticalAreas: ['technology', 'people', 'revenue', 'governance']
    },
    charity: {
        name: 'Charity',
        criticalAreas: ['sustainability', 'people', 'governance', 'compliance']
    },
    energy: {
        name: 'Energy',
        criticalAreas: ['operational', 'compliance', 'sustainability', 'technology']
    },
    government: {
        name: 'Central/Local Government',
        criticalAreas: ['governance', 'compliance', 'people', 'customer']
    },
    construction: {
        name: 'Construction',
        criticalAreas: ['operational', 'procurement', 'people', 'compliance']
    },
    professional: {
        name: 'Professional Services',
        criticalAreas: ['people', 'revenue', 'customer', 'technology']
    }
};