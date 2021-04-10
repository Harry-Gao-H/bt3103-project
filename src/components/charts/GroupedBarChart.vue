<template>
  <div id="main">
        <div id="chart">
            <!--<bar-chart v-bind:itemsProps="itemsProps"></bar-chart>-->
            <button v-on:click="clearData()"> Clear Data </button> 
            <!--<button v-on:click="updateData()"> Update Data </button> -->
            <grouped-bar-chart ref="chart"></grouped-bar-chart>

            
        </div>
        <!--<h1 v-for="item in this.itemsProps" v-bind:key="item">{{item}} </h1>-->
    </div>
</template>

<script>
import groupedbarchart from './GroupedBarChart.js'


export default {
  //  props:{
  //       itemsProps: {
  //           type: Array
  //       } 
  //   },

  components: {
    'grouped-bar-chart': groupedbarchart
  },
  
  methods : {
    clearData:function() {
      //console.log("update")
      this.$refs.chart.clearData()
    },
    updateData:function(date, meal) {
      this.$refs.chart.updateData(date, meal)
    },
    // updateData2:function(date, meal) {
    //   this.$refs.chart.updateData2(date, meal)
    // }
  }
};
</script>

<style scoped>


button{
    width:200px;
    padding:15px 0;
    text-align:center;
    margin:20px 10px;
    border-radius:25px;
    font-weight:bold;
    border:2px solid #009688;
    background:transparent;
    color:rgb(22, 20, 20);
    cursor:pointer;
    font-size:20px;
    background-color: #f7f2e1;
    
}


</style>