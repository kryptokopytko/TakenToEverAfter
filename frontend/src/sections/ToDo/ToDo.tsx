import { useEffect, useState } from "react";
import { Body, Heading, Label } from "../../styles/typography";
import Button, { ButtonContainer } from "../../components/ui/Button";
import { GridContainer, SpaceBetweenContainer } from "../../styles/section";
import { Card } from "../../styles/card";
import { SubTaskList, Container } from "./ToDoStyles";
import { StyledCalendar } from "./Calendar";
import { exportToPDF } from "../Printables/exportToPdf";
import { Task } from "../../types";
import { handleTaskCompletion } from "../../dummyDBApi";
import { Link } from "react-router-dom";
import Checkbox from "../../components/ui/Checkbox";
import { useUser } from "../../providers/UserContext";
import { Description } from "../../styles/Description";

interface ToDoProps {
  isHomePage?: boolean;
  initialTasks: Task[];
  onTaskChange?: (taskName: string, category: string) => void;
}

const ToDo: React.FC<ToDoProps> = ({ isHomePage, initialTasks, onTaskChange }) => {
  const { weddingDate } = useUser();
  const [tasks, setTasks] = useState(initialTasks);
  const [isExpanded, setIsExpanded] = useState(!isHomePage);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalTasks = tasks.reduce((total, task) => total + task.subTasks.length, 0);
  const completedTasks = tasks.reduce(
    (completed, task) => completed + task.subTasks.filter((subTask) => subTask.completed).length,
    0
  );

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);


  const getTasksForDate = (date: Date) => {
    return tasks
      .flatMap((task) => task.subTasks)
      .filter((subTask) => new Date(subTask.deadline).toDateString() === date.toDateString())
      .map((subTask) => subTask.name);
  };


  const isDateDeadline = (date: Date) => {
    return getTasksForDate(date).length > 0;
  };


  const isWeddingDate = (date: Date) => {
    const weddingDateFormatted = new Date(weddingDate.split(".").reverse().join("-"));
    return weddingDateFormatted.toDateString() === date.toDateString();
  };


  const tileClassName = ({ date }: { date: Date }) => {
    if (isWeddingDate(date)) {
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

  const handleTaskChange = (categoryIndex: number, subTaskIndex: number) => {
    const task = tasks[categoryIndex];
    const subTask = task.subTasks[subTaskIndex];

    { onTaskChange ? onTaskChange(subTask.name, task.category) : {} };
    handleTaskCompletion(subTask.name, task.category, !subTask.completed);
    const updatedTasks = tasks.map((task, index) => {
      if (index === categoryIndex) {
        const updatedSubTasks = task.subTasks.map((subTask, subIndex) => {
          if (subIndex === subTaskIndex) {
            return { ...subTask, completed: !subTask.completed };
          }
          return subTask;
        });
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container id="todo-list">
      <SpaceBetweenContainer>
        <Heading level={1}>To Do:</Heading>
        <Heading level={1}>
          {completedTasks} / {totalTasks}
        </Heading>
      </SpaceBetweenContainer>

      <StyledCalendar
        value={selectedDate}
        onClickDay={(date) => setSelectedDate(date)}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      <div>
        <GridContainer isExpanded={isExpanded} minWidth="28rem">
          {tasks.map((task, categoryIndex) => (
            <Card color="primary" key={categoryIndex}>
              <SpaceBetweenContainer border>
                <Heading level={4}>{task.category}</Heading>
                <Heading level={4}>
                  {task.subTasks.filter((subTask) => subTask.completed).length}/
                  {task.subTasks.length}
                </Heading>
              </SpaceBetweenContainer>

              <SubTaskList>
                {task.subTasks.map((subTask, subTaskIndex) => (
                  <div style={{ position: 'relative' }}>
                    <SpaceBetweenContainer key={subTaskIndex} className="subtask-container">
                      <Checkbox
                        checked={subTask.completed}
                        onChange={() => handleTaskChange(categoryIndex, subTaskIndex)}
                      />

                      <Body size="big" style={{ marginLeft: "0.5rem" }}>
                        {subTask.name}
                      </Body>
                      <Label size="extraSmall" style={{ marginRight: "0.5rem" }}>
                        {subTask.deadline}
                      </Label>

                      <Description>{subTask.description}</Description>
                    </SpaceBetweenContainer>
                  </div>
                ))}
              </SubTaskList>

            </Card>
          ))}
        </GridContainer>
      </div>

      <ButtonContainer>
        <Button onClick={() => exportToPDF("todo-list")}>Export to PDF</Button>
        {isHomePage ? (
          <>
            <Link to="to_do">
              <Button>Manage To Do</Button>
            </Link>
            <Button onClick={toggleList}>
              {isExpanded ? "Collapse List" : "Expand List"}
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
