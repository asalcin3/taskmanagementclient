<template>
  <div>
    <h2>Tasks</h2>
    <DxDataGrid
      ref="tasksDataGrid"
      :data-source="tasksList"
      key-expr="id"
      :allow-column-reordering="true"
      :remote-operations="true"
      :show-row-lines="true"
      @saved="onSaved"
      >
      <DxEditing
            :allow-updating="false"
            :allow-adding="true"
            :allow-deleting="true"
            mode="row" 
        />
      <DxColumn dataField="title" data-type="string" caption="Title"  cell-template="titleCellTemplate" />
      <template #titleCellTemplate="data">
            <router-link
              :to="{
                name: 'taskDetails',
                params: { taskId: data.data.data.id },
              }"
            >
              {{ data.data.data.title }}
            </router-link>
        
          </template>
      <DxColumn dataField="description" data-type="string" caption="Description" />
      <DxColumn dataField="isCompleted" data-type="boolean" caption="Complete" />
      <DxColumn type="buttons" caption="Actions">
        <DxGridButton name="edit" icon="edit" hint="Edit" @click="editTask" />
        <DxGridButton
          name="delete"
          hint="Delete"
          icon="trash"
          @click="deleteTask" />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>

<script setup>
import "devextreme/data/odata/store";
import { onMounted, computed, ref } from "vue";
import TaskService from "../services/tasks.service.js";
import { useTaskStore } from "../store/task.store.js";
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxButton as DxGridButton,
} from "devextreme-vue/data-grid";

const taskStore = useTaskStore();
onMounted(async () => {
  await TaskService.getAllTasks().then((response) => {
    taskStore.fillTaskData(response.data);
  });
});
var tasksList = computed(() => taskStore.tasksList);
const tasksDataGrid = ref(null);
const editTask = (e) => {
  if (e.row && e.row.rowIndex !== undefined) {
    tasksDataGrid.value?.instance.editRow(e.row.rowIndex);
  }
};
const refreshTasksData = async () => {
  await TaskService.getAllTasks().then((response) => {
    taskStore.fillTaskData(response.data);
  });
}
const onSaved = async (e) => {
  if(e.changes.length > 0){
    var changedTask = e.changes[0].data;
    if(e.changes[0].type === 'insert'){
      await TaskService.createTask(changedTask);
    }
    else if (e.changes[0].type === "update") {
      await TaskService.updateTask(changedTask.id, changedTask);
      refreshTasksData();
    }
  }
}
const deleteTask = async (e) => {
  if(e.row && e.row.data){
    var taskId = e.row.data.id;
     await TaskService.deleteTask(taskId).then((response) => {
      taskStore.fillTaskData(response.data);
    })
  }
};

</script>
<style lang="scss">
.dx-datagrid-filter-row {
  background-color: transparent;
}
</style>
