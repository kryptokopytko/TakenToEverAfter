import { Heading, Subtitle } from "../styles/typography";
import ToDo from "../sections/ToDo/ToDo";
import { Container, MenuContainer } from "../styles/page";
import Input from "../components/Input";
import Button, { ButtonContainer } from "../components/Button";
import { useState } from "react";
import { initialTasks } from "../dummyData";

interface ToDoPageProps { }

const ToDoPage: React.FC<ToDoPageProps> = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [tasks, setTasks] = useState(initialTasks);
    const [existingTask, setExistingTask] = useState(null);

    const handleAddTask = () => {
        const normalizedCategory = taskCategory.toLowerCase();

        setTasks(prevTasks => {
            
            const categoryExists = prevTasks.some(task => task.category.toLowerCase() === normalizedCategory);

            if (categoryExists) {
                
                return prevTasks.map(task => {
                    if (task.category.toLowerCase() === normalizedCategory) {
                        return {
                            ...task,
                            subTasks: [
                                ...task.subTasks,
                                {
                                    name: taskName, 
                                    deadline: taskDeadline,
                                    completed: false,
                                }
                            ]
                        };
                    }
                    return task;
                });
            } else {
                
                return [
                    ...prevTasks,
                    {
                        category: taskCategory,
                        subTasks: [
                            {
                                name: taskName, 
                                deadline: taskDeadline,
                                completed: false,
                            }
                        ]
                    }
                ];
            }
        });

        
        setTaskName('');
        setTaskDeadline('');
        setTaskCategory('');
    };



    const handleRemoveTask = () => {
        setTasks(prevTasks =>
            prevTasks.filter(task => task.category.toLowerCase() !== taskName.toLowerCase())
        );

        setTaskName('');
        setTaskDeadline('');
        setTaskCategory('');
    };

    const isInputValid = () => {
        return (
            taskName.trim() !== '' &&
            taskDeadline.trim() !== '' &&
            taskCategory.trim() !== ''
        );
    };

    return (
        <Container>
            <MenuContainer>
                <Heading level={1}>Manage To Do</Heading>

                <Subtitle level={3}>Task Name</Subtitle>
                <Input
                    value={taskName}
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
                <Input
                    value={taskCategory}
                    placeholder="Category"
                    onChange={(e) => setTaskCategory(e.target.value)}
                />

                <ButtonContainer>
                    {existingTask ? (
                        <>
                            <Button onClick={handleAddTask}>Modify Task</Button>
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
