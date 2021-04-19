<template>

<div id="app">
  <v-app id="inspire">
  <v-card>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filter"
          single-line
          hide-details
        ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="this.orders"
      item-key="stud_id"
      class="elevation-1"
      :search= "search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Order List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
    </v-card>
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
      search: "",
      singleExpand: false,
      headers: [
        {
          text: 'Student ID',
          align: 'start',
          sortable: false,
          value: 'stud_id',
        },
        { text: 'Collection Time', value: 'collect_time' },
        { text: 'Cuisine', value: 'meal_type' },
        { text: 'Dishes', value: 'dishes' },
        { text: 'Quantity', value: 'quantity'},
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