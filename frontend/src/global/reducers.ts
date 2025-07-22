import { initialStates } from '@/global/initial-states';
import { AssessmentData, ViewType } from '@/types/params';

export const SET_CURRENT_VIEW = 'SET_CURRENT_VIEW';
export const SET_SELECTED_AREAS = 'SET_SELECTED_AREAS';
export const SET_ASSESSMENT_DATA = 'SET_ASSESSMENT_DATA';
export const SET_USER_IDX = 'SET_USER_IDX';

export const reducer = (state = initialStates, action: any) => {
    switch (action.type) {
        case SET_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.payload,
            };
        case SET_SELECTED_AREAS:
            return {
                ...state,
                selectedAreas: action.payload,
            };
        case SET_ASSESSMENT_DATA:
            return {
                ...state,
                assessmentData: action.payload,
            };
        case SET_USER_IDX:
            return {
                ...state,
                userIdx: action.payload,
            };
        default:
            return state;
    }
};

export const setCurrentView = (currentView: ViewType) => ({
    type: SET_CURRENT_VIEW,
    payload: currentView,
});
export const setSelectedAreas = (selectedAreas: string[]) => ({
    type: SET_SELECTED_AREAS,
    payload: selectedAreas,
});
export const setAssessmentData = (assessmentData: AssessmentData) => ({
    type: SET_ASSESSMENT_DATA,
    payload: assessmentData,
});
export const setUserIdx = (userIdx: number) => ({
    type: SET_USER_IDX,
    payload: userIdx,
});

export default reducer;