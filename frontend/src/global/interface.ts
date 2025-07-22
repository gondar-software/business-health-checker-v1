import { useDispatch, useSelector } from 'react-redux';
import { ViewType, AssessmentData } from '@/types/params';
import { ReduxStorage, initialStates } from '@/global/initial-states';
import { 
    setCurrentView,
    setSelectedAreas,
    setAssessmentData,
    setUserIdx
} from '@/global/reducers';

export const useCurrentView = () => {
    const dispatch = useDispatch();
    return {
        setCurrentView: (currentView: ViewType) => dispatch(setCurrentView(currentView)),
        currentView: useSelector((state: ReduxStorage) => state.currentView)
    }
};

export const useSelectedAreas = () => {
    const dispatch = useDispatch();
    return {
        setSelectedAreas: (selectedAreas: string[]) => dispatch(setSelectedAreas(selectedAreas)),
        selectedAreas: useSelector((state: ReduxStorage) => state.selectedAreas)
    }
};

export const useAssessmentData = () => {
    const dispatch = useDispatch();
    return {
        setAssessmentData: (assessmentData: AssessmentData) => dispatch(setAssessmentData(assessmentData)),
        assessmentData: useSelector((state: ReduxStorage) => state.assessmentData)
    }
};

export const useUserIdx = () => {
    const dispatch = useDispatch();
    return {
        setUserIdx: (userIdx: number) => dispatch(setUserIdx(userIdx)),
        userIdx: useSelector((state: ReduxStorage) => state.userIdx)
    }
};

export const setInitialState = () => {
    const dispatch = useDispatch();
    
    dispatch(setCurrentView(initialStates.currentView));
    dispatch(setSelectedAreas(initialStates.selectedAreas));
    dispatch(setAssessmentData(initialStates.assessmentData));
    dispatch(setUserIdx(initialStates.userIdx));
}