import { useState } from "react";
import styled from "styled-components";
import { Body, Heading, Label } from "../themes/typography";
import Button, { ButtonContainer } from "./Button";
import { Card, GridContainer, SpaceBetweenContainer } from "../themes/section";

const ToDoContainer = styled.div`
  background-color: ${({ theme }) => theme.light};
  padding: 1rem 3rem;
`;

const Container = styled.div`
  padding: 2rem 0;
  width: 100%;
`;

const SubTaskList = styled.ul`
  list-style-type: none;
  padding: 0 1rem;
`;

const CustomCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CustomCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ checked, theme }) => (checked ? theme.secondary : theme.light)};
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 0.25rem;
  transition: all 150ms;
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    fill: white;
  }
`;



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
      { subCategory: 'Choose kayaks', completed: true, deadline: '2024-09-30' },
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

  const totalTasks = tasks.reduce((total, task) => total + task.subTasks.length, 0);
  const completedTasks = tasks.reduce(
    (completed, task) => completed + task.subTasks.filter((subTask) => subTask.completed).length,
    0
  );

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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleList = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container>
      <ToDoContainer>
        <SpaceBetweenContainer>
          <Heading level={1}>To Do:</Heading>
          <Heading level={1}>
            {completedTasks} / {totalTasks}
          </Heading>
        </SpaceBetweenContainer>

        <GridContainer isExpanded={isExpanded} minWidth='28rem'>
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
                          <svg viewBox="0 -2 24 24" width="18" height="18">
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

        <ButtonContainer>
          <Button>Add Task</Button>
          <Button>Manage Tasks</Button>
          <Button onClick={toggleList}>
            {isExpanded ? 'Collapse List' : 'Expand List'}
          </Button>
        </ButtonContainer>
      </ToDoContainer>
    </Container>
  );
};

export default ToDo;
