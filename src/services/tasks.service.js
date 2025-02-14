import axios from "axios";

class TaskService {
    async getAllTasks(){
        return await axios.get("/tasks");
    }
    async getTaskWithAssignees(id){
        return await axios.get(`/tasks/task-with-assignees/${id}`);
    }
    async getTaskById(id) {
        return await axios.get(`/tasks/${id}`);
    }

    async createTask(task) {
        return await axios.post("/tasks", {
            title: task.title,
            description: task.description,
            isCompleted: task.isCompleted
        });
    }
    async updateTask(taskData) {
        return await axios.put(`/tasks/${taskData.id}`, {
            title: taskData.title,
            description: taskData.description,
            isCompleted: taskData.isCompleted,
            dateDue: taskData.dateDue,
            assignees: taskData.assignees,
        });
    }
    async deleteTask(id){
        return await axios.delete(`/tasks/task/${id}`);
    }
}
export default new TaskService();