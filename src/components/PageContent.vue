<template>

<div>

    <nav>
      <p>
      <router-link to="/">Menu</router-link>
      <br><router-link to="/cart">Cart</router-link>
      </p>
    </nav>

    <div id="content">
        <div id = "profile">
            <ul>
            <li> 
              <center><DateDropdown v-bind:itemsList="itemsList"></DateDropdown></center>
              <br>
              <MealAndSectionDropdown v-bind:itemsList="itemsList"></MealAndSectionDropdown> 
            </li>
            </ul>
        </div>
    </div>
        
</div> 
 
</template>


<script>
import DateDropdown from './DateDropdown.vue'
import MealAndSectionDropdown from './MealAndSectionDropdown.vue'

export default {
  props:{
      itemsList:{
          type:Array
      }
  },

  components: {
    'DateDropdown':DateDropdown,
    'MealAndSectionDropdown':MealAndSectionDropdown,
  },
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

nav {
  float: left;
  width: 15%;
  background-color: white;
  padding-right: 20px;
  height: 400px;
}

/* Style the paragraph inside the navigation */
nav p {
  text-align: center;
  padding-top: 100px;
  font-size: 25px;
  line-height: 2.5;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

#content {
  padding: 35px;
  width: 85%;
  background-color: #f1f1f1;
}

/* Style the footer */
footer {
  background-color: #777;
  padding: 10px;
  text-align: center;
  color: white;
  line-height: 0.5;
}


table {
  border: 1px solid black;
  width: 70%;
  margin-left: 80px;
}

td {
  border: 1px solid black;
  text-align: center;
  padding: 15px;
  font-size: 20px;
  line-height: 1.5;
}


th {
  font-size: 22px;
  border: 1px solid black;
  height: 45px;
}

#request {
  font-size: 25px;
  height: 45px;
  background-color: #41b3a3;
}

#itemsList{
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}


button{
    font-weight:bold;
    height:40px;
    width:100px;
    font-size:17px;
    margin-left:500px;
}

center{
  display:block;
  margin-left:auto;
  margin-right:auto;
}


</style>