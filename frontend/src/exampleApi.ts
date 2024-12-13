import { useUser } from "./providers/UserContext";
import { Task, TaskCard } from "./types";

const useExampleFunctions = () => {
    const { taskCards, setTaskCards } = useUser();
  
    /*********************************************TASKS******************************************************/
    const addTask = async (
        categoryId: number | null,
        categoryName: string,
        name: string,
        description: string,
        deadline: string | null = null
    ) => {
        if (!categoryId) {
            categoryId = await addCategory(categoryName);
        }

        const newTask: Task = {
            id: Math.round(Math.random() * 1000000000),
            name: name,
            description: description,
            deadline: deadline,
            completed: false,
            assignees: [],
        };
        
        setTaskCards(
            taskCards.map((taskCard: TaskCard) => {
                if (taskCard.id === categoryId) {
                return {
                    ...taskCard,
                    tasks: [...taskCard.tasks, newTask],
                };
                }
                return taskCard;
            })
        );
        return newTask;
    }

    const removeTask = async (id: number) => {
        setTaskCards(
            taskCards.map((taskCard: TaskCard) => {
                return {
                ...taskCard,
                tasks: taskCard.tasks.filter((task: Task) => task.id != id),
                };
            })
        );
    }

    const updateTask = async (
    taskId: number,
    categoryId: number | null,
    categoryName: string,
    name: string,
    description: string | null = null,
    deadline: string | null = null
    ) => {
        if (!categoryId) {
            categoryId = await addCategory(categoryName);
        }

        setTaskCards(
            taskCards.map((taskCard: TaskCard) => {
            if (taskCard.id === categoryId) {
                return {
                ...taskCard,
                tasks: taskCard.tasks.map((task: Task) => {
                    if (task.id === taskId) {
                    return {
                        ...task,
                        name: name,
                        description: description || "",
                        deadline: deadline
                    };
                    }
                    return task;
                }), 
                };
            }
            return taskCard;
            })
        );
        
    };

    const addCategory = async (categoryName: string) => {
        const categoryId = Math.round(Math.random() * 1000000000);
        setTaskCards([
            ...taskCards, 
            {
                id: categoryId, 
                category: categoryName, 
                tasks: []
            },
        ]);

        return categoryId;
    };

    const updateTaskCompletion = async (
        taskId: number,
        isCompleted: boolean
    ) => {
        setTaskCards(
            taskCards.map((taskCard: TaskCard) => {
                return {
                ...taskCard,
                tasks: taskCard.tasks.map((task: Task) =>
                    task.id == taskId ? {...task, completed: isCompleted} : task
                )};
            })
        );
    }

    const getTasks = async () => {
        return taskCards;
    }


    /********************************************************************************************************/
    const getAllSharedInviteNames = () => {
        return ["family"];
    };

    /********************************************************************************************************/
    return {
        addTask, removeTask, updateTask, addCategory, updateTaskCompletion, getTasks,
        getAllSharedInviteNames,
    };
}
export default useExampleFunctions;
