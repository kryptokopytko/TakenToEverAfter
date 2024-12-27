import api from "./axiosInstance";

export const updateTask = async (
    taskId: number,
    categoryId: number | null,
    categoryName: string,
    name: string,
    description: string | null = null,
    deadline: string | null = null
  ) => {
    try {
      if (!categoryId) {
        const newCategory = await addCategory(categoryName);
        categoryId = newCategory.id;
      }
  
      const updatedTask = {
        category: categoryId,
        name: name,
        description: description,
        deadline: deadline,
      };
      const response = await api.patch(`/tasks/tasks/${taskId}/`, updatedTask, 
        { withCredentials: true }
      );
      console.log("Task updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };
  
  export const addCategory = async (categoryName: string) => {
    try {
      const response = await api.post("/todo_list_categories/", categoryName);
      console.log("New category created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  };
  
  export const addTask = async (
    categoryId: number | null,
    categoryName: string,
    name: string,
    description: string,
    deadline: string | null = null
  ) => {
    try {
      if (!categoryId) {
        const newCategory = await addCategory(categoryName);
        categoryId = newCategory.id;
      }
  
      const newTask = {
        categoryId,
        name,
        description,
        deadline,
      };
  
      const response = await api.post("/tasks/", newTask);
      console.log("Task created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };
  
  export const removeTask = async (id: number) => {
    try {
      const response = await api.delete(`/tasks/${id}/`);
  
      console.log(`Task with ID ${id} removed successfully.`);
      return response.data;
    } catch (error) {
      console.error(`Error removing task with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const updateTaskCompletion = async (
    taskId: number,
    isCompleted: boolean
  ) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/`, isCompleted);
      console.log("Task completion status updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating task completion status:", error);
      throw error;
    }
  };
  
  export const addAssignee = async (accountId: number, assigneeName: string) => {
    try {
      const newAssignee = {
        account: accountId,
        name: assigneeName,
      };
      const response = await api.post("/task_assignees/", newAssignee);
      console.log("New assignee created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating assignee:", error);
      throw error;
    }
  };
  
  export const assignTask = async (
    taskId: number,
    assigneeId: number,
    accountId: number
  ) => {
    try {
      const newAssignment = {
        account: accountId,
        assignee: assigneeId,
        task: taskId,
      };
      const response = await api.post("/task_assignments/", newAssignment);
      console.log("Task assigned:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error assigning task:", error);
      throw error;
    }
  };
  
  export const getTasks = async () => {
    try {
      const response = await api.get(`/tasks/user-tasks`, 
        { withCredentials: true }
      );
      const taskCards = response.data.taskCards.map((card: TaskCard): TaskCard => {
        return {
          id: card.id,
          category: card.category,
          tasks: card.tasks.map((task: Task): Task => ({
            id: task.id,
            name: task.name,
            completed: task.completed,
            deadline: task.deadline,
            description: task.description, 
            assignees: task.assignees
          })),
    }});
      return taskCards; 
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; 
    }
  }
  