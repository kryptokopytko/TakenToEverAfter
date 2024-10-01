import { useState } from "react";
import { Body, Heading, Label } from "../../../styles/typography";
import Button, { ButtonContainer } from "../../Button";
import { GridContainer, SpaceBetweenContainer } from "../../../styles/section";
import { Card } from "../../../styles/card";
import { SubTaskList, CustomCheckboxLabel, CustomCheckboxWrapper, StyledCheckbox, HiddenCheckbox, Container } from "./ToDoStyles";
import { StyledCalendar } from "./Calendar";
import { exportToPDF } from "../Printables/exportToPdf";

const initialTasks = [
  {
    category: 'Planning',
    subTasks: [
      { subCategory: 'Create guest list', completed: false, deadline: '2024-10-05' },
      { subCategory: 'Select venue', completed: true, deadline: '2024-09-25' },
    ],
  },
  {
    category: 'Catering',
    subTasks: [
      { subCategory: 'Confirm menu', completed: false, deadline: '2024-10-10' },
      { subCategory: 'Hire caterer', completed: true, deadline: '2024-09-28' },
    ],
  },
  {
    category: 'Decorations',
    subTasks: [
      { subCategory: 'Choose flowers', completed: false, deadline: '2024-10-15' },
      { subCategory: 'Design table setup', completed: false, deadline: '2024-10-12' },
      { subCategory: 'Choose color theme', completed: false, deadline: '2024-10-20' },
      { subCategory: 'Choose kayaks', completed: true, deadline: '2024-09-29' },
    ],
  },
  {
    category: 'Entertainment',
    subTasks: [
      { subCategory: 'Book DJ', completed: true, deadline: '2024-09-22' },
      { subCategory: 'Plan activities', completed: true, deadline: '2024-09-23' },
    ],
  },
];

const ToDo = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalTasks = tasks.reduce((total, task) => total + task.subTasks.length, 0);
  const completedTasks = tasks.reduce(
    (completed, task) => completed + task.subTasks.filter((subTask) => subTask.completed).length,
    0
  );
  const getTasksForDate = (date: Date) => {
    return tasks
      .flatMap((task) => task.subTasks)
      .filter((subTask) => new Date(subTask.deadline).toDateString() === date.toDateString())
      .map((subTask) => subTask.subCategory);
  };

  const isDateDeadline = (date: Date) => {
    return getTasksForDate(date).length > 0;
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (isDateDeadline(date)) {
      return 'highlight';
    }
    return null;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const tasksForDate = getTasksForDate(date);
    if (tasksForDate.length > 0) {
      return (
        <Body size='small' color='primary'>
          {tasksForDate.map((task, index) => (
            <span key={index}>{task}</span>
          ))}
        </Body>
      );
    }
    return null;
  };

  const handleTaskChange = (categoryIndex: number, subTaskIndex: number) => {
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
                  <SpaceBetweenContainer key={subTaskIndex}>
                    <CustomCheckboxWrapper>
                      <CustomCheckboxLabel>
                        <HiddenCheckbox
                          checked={subTask.completed}
                          onChange={() => handleTaskChange(categoryIndex, subTaskIndex)}
                        />
                        <StyledCheckbox checked={subTask.completed}>
                          <svg viewBox="8 4 10 14" width="18" height="18">
                            <polyline points="4 6 10 17 22 3 11 12" />
                          </svg>
                        </StyledCheckbox>
                      </CustomCheckboxLabel>
                    </CustomCheckboxWrapper>
                    <Body size="big" style={{ marginLeft: '0.5rem' }}>
                      {subTask.subCategory}
                    </Body>
                    <Label size="extraSmall" style={{ marginRight: '0.5rem' }}>
                      {subTask.deadline}
                    </Label>
                  </SpaceBetweenContainer>
                ))}
              </SubTaskList>
            </Card>
          ))}
        </GridContainer>
      </div>

      <ButtonContainer>
        <Button onClick={() => exportToPDF("todo-list")}>Export to PDF</Button>
        <Button>Manage Tasks</Button>
        <Button onClick={toggleList}>
          {isExpanded ? "Collapse List" : "Expand List"}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ToDo;
