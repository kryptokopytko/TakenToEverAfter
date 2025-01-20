import { Heading, Subtitle } from "../styles/typography";
import ToDo from "../sections/ToDo/ToDo";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import Input from "../components/ui/Input";
import GuidedInput from "../components/ui/GuidedInput";
import Button, { ButtonContainer } from "../components/ui/Button";
import { useState } from "react";
import useFunctionsProxy from "../API/FunctionHandler";
import { useUser } from "../providers/UserContext";
import { translations } from "../translations";

const ToDoPage = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDeadline, setTaskDeadline] = useState<string | null>('');
    const [taskCategory, setTaskCategory] = useState<{id: number | null, name: string}>({id: null, name: ""});
    const [taskDescription, setTaskDescription] = useState<string | null>('');
    const [taskId, setTaskId] = useState<number | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const { taskCards, setTaskCards, language } = useUser();
    const FunctionsProxy = useFunctionsProxy();

    const findCategory = (taskId: number) => {
        const card = taskCards.find((card) => card.tasks.find((task) => task.id === taskId));
        setTaskCategory({id: card!.id, name: card!.category});
        return {id: card!.id, name: card!.category};
    };

    const clean = () => {
        setTaskName('');
        setTaskDeadline('');
        setTaskCategory({id:null, name: ""});
        setTaskDescription('');
        setTaskId(null);
    }

    const refreshTaskCards = async () => {
        const updatedTaskCards = await FunctionsProxy.getTasks(); 
        setTaskCards(updatedTaskCards); 
      };

    const handleAddTask = async () => {
        await FunctionsProxy.addTask(taskCategory.id!, taskCategory.name, taskName, taskDescription || "", taskDeadline);
        setNotification(translations[language].taskAdded.replace("{taskName}", taskName).replace("{taskCategory}", taskCategory.name));
        setTimeout(() => setNotification(null), notificationTimeOut);
        
        await refreshTaskCards();
        clean();
    };


    const handleRemoveTask = async () => {
        await FunctionsProxy.removeTask(taskId!);
        setNotification(translations[language].taskRemoved.replace("{taskName}", taskName).replace("{taskCategory}", taskCategory.name));
        setTimeout(() => setNotification(null), notificationTimeOut);
        
        await refreshTaskCards();
        clean();
    };

    const handleUpdateTask = async () => {
        await FunctionsProxy.updateTask(taskId!, taskCategory.id, taskCategory.name, taskName, taskDescription, taskDeadline);
        setNotification(translations[language].taskUpdated.replace("{taskName}", taskName).replace("{taskCategory}", taskCategory.name));
        setTimeout(() => setNotification(null), notificationTimeOut);
       
        await refreshTaskCards();
        clean();
    };

    const handleDeadlineChange = (deadline: Date) => {
        const formattedDate = new Date(deadline.getTime() - deadline.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0]; 
        setTaskDeadline(formattedDate); 
    };


    const isInputValid = () => {
        return (
            taskName.trim() !== '' &&
            (!taskDeadline || taskDeadline.trim() !== '' &&
            !isNaN(Date.parse(taskDeadline))) &&
            taskCategory.name.trim() !== ''
        );
    };


    return (
        <Container>
            <MenuContainer>
                <div style={{ marginBottom: "-2rem" }}>
                    <Heading level={2}>{translations[language].manageToDo}</Heading>
                </div>

                <Subtitle level={3}>{translations[language].taskName}</Subtitle>
                <GuidedInput
                    value={taskName}
                    suggestions={taskCards.flatMap(card => card.tasks.map(task => task.name))}
                    placeholder={translations[language].taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    setInputValue={(value) => {
                        const selectedTask = taskCards
                          .flatMap((card) => card.tasks)
                          .find((task) => task.name === value);
                    
                        if (selectedTask) {
                          setTaskId(selectedTask.id);
                          setTaskName(selectedTask.name);
                          setTaskDescription(selectedTask.description);
                          setTaskDeadline(selectedTask.deadline);
                          findCategory(selectedTask.id);
                        } else {
                          setTaskId(null);
                          setTaskDescription(""); 
                          setTaskDeadline("");
                          setTaskCategory({id: null, name: ""});
                        }
                    }}
                />

                <Subtitle level={3}>{translations[language].deadline}</Subtitle>
                <Input
                    value={taskDeadline || ""}
                    placeholder={translations[language].deadline}
                    type="date"
                    onChange={(e) => setTaskDeadline(e.target.value)}
                />

                <Subtitle level={3}>{translations[language].category}</Subtitle>
                <GuidedInput
                    value={taskCategory.name}
                    suggestions={taskCards.map(card => card.category)}
                    placeholder={translations[language].category}
                    onChange={(e) => setTaskCategory({name: e.target.value, id: null})}
                    setInputValue={(value) => {
                        const selectedCategory = taskCards.find(card => card.category === value);
                        if (selectedCategory) {
                            setTaskCategory({ name: selectedCategory.category, id: selectedCategory.id });
                        } else {
                            setTaskCategory({ name: value, id: null });
                        }
                    }}
                />

                <Subtitle level={3}>{translations[language].description}</Subtitle>
                <Input
                    value={taskDescription || ""}
                    placeholder={translations[language].description}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />


                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    {taskId ? (
                        <>
                            {isInputValid() ?
                                <Button onClick={handleUpdateTask}>{translations[language].modifyTask}</Button> :
                                <Button disabled>{translations[language].modifyTask}</Button>}
                            <Button onClick={handleRemoveTask}>{translations[language].removeTask}</Button>
                        </>
                    ) : isInputValid() ? (
                        <Button onClick={handleAddTask}>{translations[language].addTask}</Button>
                    ) : (
                        <Button disabled>{translations[language].addTask}</Button>
                    )}
                </ButtonContainer>
            </MenuContainer>

            <ToDo onDeadlineChange={handleDeadlineChange} />
        </Container>
    );
};

export default ToDoPage;
