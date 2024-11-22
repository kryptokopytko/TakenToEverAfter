import { Heading, Subtitle } from "../styles/typography";
import ToDo from "../sections/ToDo/ToDo";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { useState, useEffect } from "react";
import { initialTasks } from "../dummyData";
import { addTask, removeTask, updateTask } from "../dummyDBApi";

interface ToDoPageProps { }

const ToDoPage: React.FC<ToDoPageProps> = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [tasks, setTasks] = useState(initialTasks);
    const [existingTask, setExistingTask] = useState<any | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        const normalizedTaskName = taskName.trim().toLowerCase();
        const normalizedCategory = taskCategory.trim().toLowerCase();
        const task = tasks.find(t =>
            t.category.toLowerCase() === normalizedCategory &&
            t.subTasks.some(subTask => subTask.name.toLowerCase() === normalizedTaskName)
        );

        if (task) {
            setExistingTask(task);
            setTaskCategory(task.category);
        } else {
            setExistingTask(null);
        }
    }, [taskName, taskCategory, tasks]);

    const handleAddTask = () => {
        if (existingTask) {
            setNotification(`Task "${taskName}" already exists in category "${taskCategory}"`);
            setTimeout(() => setNotification(null), notificationTimeOut);
            return;
        }

        const newTask = {
            name: taskName,
            deadline: taskDeadline,
            description: taskDescription,
            completed: false
        };

        setTasks(prevTasks => {
            const categoryIndex = prevTasks.findIndex(task => task.category.toLowerCase() === taskCategory.toLowerCase());
            if (categoryIndex !== -1) {
                const updatedSubTasks = [...prevTasks[categoryIndex].subTasks, newTask];
                return prevTasks.map((task, index) =>
                    index === categoryIndex ? { ...task, subTasks: updatedSubTasks } : task
                );
            } else {
                return [...prevTasks, { category: taskCategory, subTasks: [newTask] }];
            }
        });

        addTask(taskCategory, newTask);
        setNotification(`Task "${taskName}" added to category "${taskCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);

        // Reset fields
        setTaskName('');
        setTaskDeadline('');
        setTaskCategory('');
        setTaskDescription('');
    };


    const handleRemoveTask = () => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.category.toLowerCase() === taskCategory.toLowerCase()) {
                    const updatedSubTasks = task.subTasks.filter(subTask => subTask.name.toLowerCase() !== taskName.toLowerCase());
                    return {
                        ...task,
                        subTasks: updatedSubTasks
                    };
                }
                return task;
            }).filter(task => task.subTasks.length > 0)
        );


        removeTask(taskCategory, taskName);

        setNotification(`Task "${taskName}" removed from category "${taskCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleUpdateTask = () => {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.category.toLowerCase() === taskCategory.toLowerCase()) {
                    return {
                        ...task,
                        subTasks: task.subTasks.map(subTask =>
                            subTask.name.toLowerCase() === taskName.toLowerCase()
                                ? { ...subTask, deadline: taskDeadline, description: taskDescription }
                                : subTask
                        )
                    };
                }
                return task;
            });
        });

        updateTask(taskCategory, taskName, { deadline: taskDeadline, description: taskDescription });
        setNotification(`Task "${taskName}" updated in category "${taskCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleTaskChange = (taskName: string, category: string) => {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.category.toLowerCase() === category.toLowerCase()) {
                    return {
                        ...task,
                        subTasks: task.subTasks.map(subTask =>
                            subTask.name.toLowerCase() === taskName.toLowerCase()
                                ? { ...subTask, completed: !subTask.completed }
                                : subTask
                        )
                    };
                }
                return task;
            });
        });
    };

    const isInputValid = () => {
        return (
            taskName.trim() !== '' &&
            taskDeadline.trim() !== '' &&
            !isNaN(Date.parse(taskDeadline)) &&
            taskCategory.trim() !== ''
        );
    };


    return (
        <Container>
            <MenuContainer>
                <div style={{ marginBottom: "-2rem" }}>
                    <Heading level={2}>Manage To Do</Heading>
                </div>

                <Subtitle level={3}>Task Name</Subtitle>
                <GuidedInput
                    value={taskName}
                    setInputValue={setTaskName}
                    suggestions={tasks.flatMap(task => task.subTasks.map(subTask => subTask.name))}
                    placeholder="Name of the task"
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <Subtitle level={3}>Deadline</Subtitle>
                <Input
                    value={taskDeadline}
                    placeholder="Task deadline"
                    type="date"
                    onChange={(e) => setTaskDeadline(e.target.value)}
                />

                <Subtitle level={3}>Category</Subtitle>
                <GuidedInput
                    value={taskCategory}
                    suggestions={tasks.map(task => task.category)}
                    placeholder="Category"
                    setInputValue={setTaskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                />
                <Subtitle level={3}>Description</Subtitle>
                <Input
                    value={taskDescription}
                    placeholder="Description of the task"
                    onChange={(e) => setTaskDescription(e.target.value)}
                />


                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {existingTask ? (
                        <>
                            {isInputValid() ?
                                <Button onClick={handleUpdateTask}>Modify Task</Button> :
                                <Button disabled>Modify Task</Button>}
                            <Button onClick={handleRemoveTask}>Remove Task</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddTask}>Add Task</Button>
                    ) : (
                        <Button disabled>Add Task</Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <ToDo initialTasks={tasks} onTaskChange={handleTaskChange} />
        </Container>
    );
};

export default ToDoPage;
