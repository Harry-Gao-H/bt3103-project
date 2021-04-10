<!-- Week 8 - Activity 1 - Step 3 -->
<template>
  <div id="main">
        <div id="chart">
            <!--<bar-chart v-bind:itemsProps="itemsProps"></bar-chart>-->
            <button v-on:click="clearData()"> Clear Data </button> 
            <!--<button v-on:click="updateData()"> Update Data </button> -->
            <bar-chart ref="chart"></bar-chart>

            
        </div>
        <!--<h1 v-for="item in this.itemsProps" v-bind:key="item">{{item}} </h1>-->
    </div>
</template>

<script>
import barchart from './BarChart.js'


export default {
  //  props:{
  //       itemsProps: {
  //           type: Array
  //       } 
  //   },

  components: {
    'bar-chart': barchart
  },
  
  methods : {
    clearData:function() {
      //console.log("update")
      this.$refs.chart.clearData()
    },
    updateData:function(date, meal) {
      this.$refs.chart.updateData(date, meal)
    }
  }
};
</script>

<style scoped>
/*#main{
    content:"";
    display:table;
    clear:both;
}
#chart{
  height:240px;
  width:240px;
  border-style: solid;
  border-color:rgb(155, 84, 84);
  border-width: 1px;
  padding:30px;
  float:left;
}*/

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