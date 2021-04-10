<template>

<div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="this.orders"
      item-key="stud_id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Order List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-app>
</div>
</template>

<script>
export default {
  name: "orderListing",
  props: {
    orders: {
      type: Array,
    }
  },

  data () {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: 'Student ID',
          align: 'start',
          sortable: false,
          value: 'stud_id',
        },
        { text: 'Collection Time', value: 'collect_time' },
        { text: 'Meal Type', value: 'meal_type' },
        { text: 'Smaller Proportion', value: 'smaller' },
        { text: 'Remark', value: 'remark'}
      ],
    }
  },
  
  watch: {}

};
</script>

<style scoped>

</style>