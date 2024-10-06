import { Heading, Subtitle } from "../styles/typography";
import ToDo from "../sections/ToDo/ToDo";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/Input";
import GuidedInput from "../components/GuidedInput"; 
import Button, { ButtonContainer } from "../components/Button";
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

    useEffect(() => {
        const normalizedTaskName = taskName.trim().toLowerCase();
        const task = tasks.find(t => t.category.toLowerCase() === normalizedTaskName);

        if (task) {
            setExistingTask(task);
            setTaskCategory(task.category);
        } else {
            setExistingTask(null);
        }
    }, [taskName, tasks]);

    const handleAddTask = () => {
        addTask(taskCategory, { name: taskName, deadline: taskDeadline, completed: false });
        setNotification(`Task "${taskName}" added to category "${taskCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
        resetForm(); 
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
        resetForm();
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleUpdateTask = () => {
        updateTask(taskCategory, taskName, { deadline: taskDeadline });
        setNotification(`Task "${taskName}" updated in category "${taskCategory}"`);
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const isInputValid = () => {
        return (
            taskName.trim() !== '' &&
            taskDeadline.trim() !== '' &&
            !isNaN(Date.parse(taskDeadline)) && 
            new Date(taskDeadline) > new Date() && 
            taskCategory.trim() !== ''
        );
    };

    const resetForm = () => {
        setTaskName('');
        setTaskDeadline('');
        setTaskCategory('');
        setExistingTask(null);
    };

    return (
        <Container>
            <MenuContainer>
                <Heading level={1}>Manage To Do</Heading>

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

                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {existingTask ? (
                        <>
                            <Button onClick={handleUpdateTask}>Modify Task</Button>
                            <Button onClick={handleRemoveTask}>Remove Task</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddTask}>Add Task</Button>
                    ) : (
                        <Button disabled>Add Task</Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <ToDo initialTasks={tasks} />
        </Container>
    );
};

export default ToDoPage;
