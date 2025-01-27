import { useState } from "react";
import { Body, Heading, Label } from "../../styles/typography";
import Button, { ButtonContainer } from "../../components/ui/Button";
import { GridContainer, SpaceBetweenContainer } from "../../styles/section";
import { Card } from "../../styles/card";
import { SubTaskList, Container } from "./ToDoStyles";
import { StyledCalendar } from "./Calendar";
import { exportToPDF } from "../Printables/exportToPdf";
import useFunctionsProxy from "../../API/FunctionHandler";
import { Link } from "react-router-dom";
import Checkbox from "../../components/ui/Checkbox";
import { useUser } from "../../providers/UserContext";
import { Description, DescriptionContainer } from "../../styles/Description";
import { translations } from "../../translations";

interface ToDoProps {
  onDeadlineChange?: (deadline: Date) => void;
  isHomePage?: boolean;
  onTaskChange?: (taskName: string, category: string) => void;
}

const ToDo: React.FC<ToDoProps> = ({ isHomePage, onDeadlineChange, onTaskChange }) => {
  const { accountDetails, taskCards, language, setTaskCards } = useUser();
  const [isExpanded, setIsExpanded] = useState(!isHomePage);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const FunctionsProxy = useFunctionsProxy();

  const totalTasks = taskCards.reduce((total, card) => total + card.tasks.length, 0);
  const completedTasks = taskCards.reduce(
    (completed, card) => completed + card.tasks.filter((task) => task.completed).length,
    0
  );

  const getTasksForDate = (date: Date) => {
    return taskCards
      .flatMap((card) => card.tasks)
      .filter((task) => new Date(task.deadline!).toDateString() === date.toDateString())
      .map((task) => task.name);
  };


  const isDateDeadline = (date: Date) => {
    return getTasksForDate(date).length > 0;
  };


  const isWeddingDate = (date: Date) => {
    const weddingDateFormatted = new Date(accountDetails.weddingDate!.split(".").reverse().join("-"));
    return weddingDateFormatted.toDateString() === date.toDateString();
  };


  const tileClassName = ({ date }: { date: Date }) => {
    if (accountDetails.weddingDate && isWeddingDate(date)) {
      return "wedding-date";
    }
    if (isDateDeadline(date)) {
      return "highlight";
    }
    return null;
  };


  const tileContent = ({ date }: { date: Date }) => {
    const tasksForDate = getTasksForDate(date);
    if (tasksForDate.length > 0) {
      return (
        <Body size="small" color="primary">
          {tasksForDate.map((task, index) => (
            <div key={index}>
              {task}
              {index < tasksForDate.length - 1 && (
                <div style={{ height: "1px", backgroundColor: "white", margin: "0.5rem 0" }} />
              )}
            </div>
          ))}
        </Body>
      );
    }
    return null;
  };

  const handleTaskChange = (cardIndex: number, taskIndex: number) => {
    const card = taskCards[cardIndex];
    const task = card.tasks[taskIndex];

    { onTaskChange ? onTaskChange(task.name, card.category) : {} };
    FunctionsProxy.updateTask(task.id, card.id, card.category, task.name, task.description, task.deadline, !task.completed);
    setTaskCards(
      taskCards.map((card, index) =>
        index === cardIndex
          ? {
            ...card,
            tasks: card.tasks.map((task, idx) =>
              idx === taskIndex
                ? { ...task, completed: !task.completed }
                : task
            ),
          }
          : card
      )
    );
  };

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container id="todo-list">
      <SpaceBetweenContainer>
        <Heading level={1}>{translations[language].toDo + ":"}</Heading>
        <Heading level={1}>
          {completedTasks} / {totalTasks}
        </Heading>
      </SpaceBetweenContainer>

      <StyledCalendar
        value={selectedDate}
        onClickDay={(date) => {
          setSelectedDate(date);
          if (onDeadlineChange) {
            onDeadlineChange(date);
          }
        }}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />


      <div>
        <GridContainer isExpanded={isExpanded} minWidth="28rem">
          {taskCards.map((card, cardIndex) => (
            <Card color="primary" key={cardIndex}>
              <SpaceBetweenContainer border>
                <Heading level={4}>{card.category}</Heading>
                <Heading level={4}>
                  {card.tasks.filter((task) => task.completed).length}/
                  {card.tasks.length}
                </Heading>
              </SpaceBetweenContainer>

              <SubTaskList>
                {card.tasks.map((task, taskIndex) => (
                  <div style={{ position: 'relative' }} key={taskIndex}>
                    <SpaceBetweenContainer key={taskIndex} className="subtask-container">
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleTaskChange(cardIndex, taskIndex)}
                      />

                      <Body size="big" style={{ marginLeft: "0.5rem" }}>
                        {task.name}
                      </Body>
                      <Label size="extraSmall" style={{ marginRight: "0.5rem" }}>
                        {task.deadline}
                      </Label>
                      {task.description != "" && (
                        <DescriptionContainer move={-5}>
                          <Description>{task.description}</Description>
                        </DescriptionContainer>
                      )}
                    </SpaceBetweenContainer>
                  </div>
                ))}
              </SubTaskList>

            </Card>
          ))}
        </GridContainer>
      </div>

      <ButtonContainer>
        <Button onClick={() => exportToPDF("todo-list")}>{translations[language].exportToPDF}</Button>
        {isHomePage ? (
          <>
            <Link to="to_do">
              <Button>{translations[language].manageToDo}</Button>
            </Link>
            <Button onClick={toggleList}>
              {isExpanded ? translations[language].collapseList : translations[language].expandList}
            </Button>
          </>
        ) : (
          <></>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default ToDo;
