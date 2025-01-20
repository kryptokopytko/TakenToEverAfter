import { useGuests } from './useGuests';
import { usePreferences } from './usePreferences';
import { useTasks } from './useTasks';

const useExampleFunctions = () => {
    const { handleDecision, getAllSharedInviteNames } = useGuests();
    const { addNewTheme, deleteTheme } = usePreferences();
    const { addTask, removeTask, updateTask, addCategory, updateTaskCompletion, getTasks } = useTasks();
  
    return {
        handleDecision, getAllSharedInviteNames,
        addNewTheme, deleteTheme,
        addTask, removeTask, updateTask, addCategory, updateTaskCompletion, getTasks,
    };
}
export default useExampleFunctions;
