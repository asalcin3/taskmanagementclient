import { ref } from "vue";
import { defineStore } from "pinia";
export const useTaskStore = defineStore("task", () => {
  var tasksList = ref([]);
  var selectedTask = ref({});
  var initialTaskData = ref({});
  const fillTaskData = (data) => {
    tasksList.value = data;
  };
  const fillSelectedTaskData = (data) => {
    selectedTask.value = data;
    setDateDue(data.dateDue);
  };
  const setSelectedTitle = (val) => {
    selectedTask.value.title = val;
  };
  const setSelectedDescription = (val) => {
    selectedTask.value.description = val;
  };
  const setIsComlpeted = (val) => {
    selectedTask.value.isCompleted = val;
  };
  const setDateDue = (val) => {
    console.log(val);
    if (!val || val === "0001-01-01T00:00:00") {
      selectedTask.value.dateDue = null;
    } else {
      selectedTask.value.dateDue = new Date(val);
    }
  };
  const setSelectedAssignees = (val) => {
    selectedTask.value.assignees = val;
  };
  return {
    setSelectedAssignees,
    setDateDue,
    setIsComlpeted,
    setSelectedDescription,
    setSelectedTitle,
    initialTaskData,
    selectedTask,
    fillSelectedTaskData,
    tasksList,
    fillTaskData,
  };
});
