import { AssessmentData, ViewType } from "@/types/params";

export interface ReduxStorage {
    currentView: ViewType;
    selectedAreas: string[];
    assessmentData: AssessmentData;
    userIdx: number;
}

export const initialStates: ReduxStorage = {
    currentView: 'setup',
    selectedAreas: [
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
    ],
    assessmentData: {},
    userIdx: -1
};

export default initialStates;