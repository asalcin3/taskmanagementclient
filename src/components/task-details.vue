<template>
    <div class="task-details">
      <h2>Task Details</h2>
      <div class="content-block">
      <div class="dx-card">
        <div class="dx-fieldset d-flex row fields-row">
          <div class="dx-field">
            <div class="dx-field-label">
              Task title:
            </div>
            <div class="dx-field-value">
              <DxTextBox v-model:value="taskTitle" />
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">
              Task description:
            </div>
            <div class="dx-field-value">
              <DxTextBox v-model:value="taskDescription" />
            </div>
          </div>
          
          <div
            class="dx-field"
            style="align-self: start"
          >
            <div class="dx-field-label">
              Date due:
            </div>
            <div class="dx-field-value">
              <DxDateBox
                v-model:value="taskDateDue"
                display-format="dd-MM-yyyy"
                date-serialization-format="yyyy-MM-ddTHH:mm:ss"
                />
            </div>
          </div>
        </div>
        <div class="dx-fieldset d-flex row fields-row">
          <div class="dx-field">
            <div class="dx-field-label">
              Assignees
            </div>
            <div class="dx-field-value">
              <DxTagBox
                v-model:value="taskAssignees"
                display-expr="email"
                value-expr="id"
                placeholder=""
                :items="usersList"
              />
            </div>
          </div>

          <div class="dx-field" style="align-self: start">
            <div class="dx-field-label">
              Completed: 
            </div>
            <div class="dx-field-value" style="width: min-content">
              <DxCheckBox
                v-model:value="taskCompleted"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="actions">
        <DxButton text="Save" type="success" @click="saveTask" />
      </div>
    </div>
  </template>
  
  <script setup>
  import {ref,  computed, onMounted } from "vue";
  import TaskService from "../services/tasks.service.js";
  import UserService from "../services/users.service.js";
  import DxButton from "devextreme-vue/button";
  import { useUserStore } from "@/store/user.store.js";
  import { useRoute, useRouter } from 'vue-router';
  import { useTaskStore } from "@/store/task.store.js";
  import { DxTextBox } from "devextreme-vue/text-box";
  import { DxTagBox } from "devextreme-vue/tag-box";
  import { DxCheckBox } from "devextreme-vue/check-box";
  import { DxDateBox } from "devextreme-vue/date-box";
  const userStore = useUserStore();
  const taskStore = useTaskStore();
  const route = useRoute();
  const taskId = ref(null);
  taskId.value = parseInt(route.params.taskId);
  const loading = ref(true);
  const router = useRouter();

  const usersList = computed(() => userStore.usersList);
  onMounted(async () => {
      await UserService.getUsers().then((response) =>{
        userStore.fillUsersData(response.data);
      });
 
      await TaskService.getTaskWithAssignees(taskId.value)
      .then((response) => {
        taskStore.fillSelectedTaskData(response.data)
    }).finally(() => {
      loading.value = false;

      });
      
  });
  const taskTitle = computed({
    get:() => taskStore.selectedTask.title,
    set: (val) => taskStore.setSelectedTitle(val)
  });
  const taskDescription = computed({
    get:() => taskStore.selectedTask.description,
    set: (val) => taskStore.setSelectedDescription(val)
  });
  const taskCompleted = computed({
    get:() => taskStore.selectedTask.isCompleted,
    set: (val) => taskStore.setIsComlpeted(val)
  });
  const taskDateDue = computed({
    get:() => taskStore.selectedTask.dateDue,
    set: (val) => taskStore.setDateDue(val)
  });
  const taskAssignees = computed({
    get:() => taskStore.selectedTask.assignees,
    set: (val) => taskStore.setSelectedAssignees(val)
  });
  const saveTask = async () => {
    var task = {
      id: taskId.value,
      title: taskTitle.value,
      description: taskDescription.value,
      isCompleted: taskCompleted.value,
      dateDue: taskDateDue.value,
      assignees: taskAssignees.value
    }
    await TaskService.updateTask(task);
    router.push("/tasks");

  };

  </script>
  
  <style lang="scss">
  .task-details {
    min-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  