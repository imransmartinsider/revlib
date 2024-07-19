<template>
  <div>
    <div class="api-input">
      <input v-model="apiUrl" placeholder="Enter API URL" class="api-url-input">
      <button @click="fetchData" class="fetch-button">Fetch Data</button>
    </div>
    
    <table v-if="tableData.length > 0" class="table">
      <thead>
        <tr>
          <th v-for="header in tableHeaders" :key="header" class="table-header">{{ header }}</th>
          <th class="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="row.id" :class="{'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0}">
          <td v-for="header in tableHeaders" :key="header" class="table-cell">
            <input v-if="editingRow === row.id && header.toLowerCase() !== 'id'" v-model="editedRow[header.toLowerCase()]" :placeholder="header" class="edit-input">
            <span v-else>{{ row[header.toLowerCase()] }}</span>
          </td>
          <td class="table-cell action-cell">
            <template v-if="editingRow !== row.id">
              <button @click="editRow(row)" class="action-button">Edit</button>
              <button @click="deleteRow(row.id)" class="action-button delete-button">Delete</button>
            </template>
            <template v-else>
              <button @click="saveRow(row)" class="action-button">Save</button>
              <button @click="cancelEdit" class="action-button cancel-button">Cancel</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    
    <form @submit.prevent="addRow" v-if="tableData.length > 0" class="add-form">
      <input v-for="header in tableHeaders" :key="header" v-model="newRow[header.toLowerCase()]" :placeholder="header" class="add-input">
      <button type="submit" class="add-button">Add Row</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiUrl: '',
      tableHeaders: [],
      tableData: [],
      newRow: {},
      editingRow: null,
      editedRow: {}
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.tableData = data;
        if (this.tableData.length > 0) {
          this.tableHeaders = Object.keys(this.tableData[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async addRow() {
      // Simulate adding a new row
      this.tableData.push(this.newRow);
      this.newRow = {};
    },
    editRow(row) {
      this.editingRow = row.id;
      this.editedRow = { ...row };
    },
    async saveRow(row) {
      // Update row in tableData
      const index = this.tableData.findIndex(r => r.id === row.id);
      this.tableData[index] = { ...this.editedRow };
      this.editingRow = null;
      this.editedRow = {};
    },
    cancelEdit() {
      this.editingRow = null;
      this.editedRow = {};
    },
    deleteRow(id) {
      this.tableData = this.tableData.filter(row => row.id !== id);
    }
  }
};
</script>

<style>
/* Import CSS file directly */
@import './styles.css';
/* Additional styles here if needed */
</style>