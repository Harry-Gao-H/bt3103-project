<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/orders-overview">Overview</router-link></li>
      <li class="navbarstyle" v-on:click="logout()">Logout</li>

  </ul>
</div>

<div id="content">
        <div id = "profile">
            <ul>
            <li> 
              <center> <div id="dropdown">
	<form>
		<div>
			<label for="meal">Choose date and time:</label>
			<input id="meal" type="date" name="meal" min="2021-04-14" max="2021-04-20" v-model="selectedDateStaff" v-on:change="fetch()" required>
			
			
			<br>
			<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMealStaff" v-on:change="fetch()" v-on:click="showChart=true"> 
			<label for="breakfast" class="radio">Breakfast</label> 
			<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMealStaff" v-on:change="fetch()" v-on:click="showChart=true"> 
			<label for="dinner" class="radio">Dinner</label>
		
		</div>
	</form>

<!--
	<div>
		<div v-show = "selectedMealStaff == 'Breakfast'" class="box">
			<p>Breakfast Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTimeStaff" v-on:change="fetch()">
				<option value="0730">07:30</option>
				<option value="0800">08:00</option>
				<option value="0830">08:30</option>
				<option value="0900">09:00</option>
				<option value="0930">09:30</option>
			</select>
		</div>

		<div v-show = "selectedMealStaff == 'Dinner'" class="box">
			<p>Dinner Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTimeStaff" v-on:change="fetch()">
				<option value="1800">18:00</option>
				<option value="1830">18:30</option>
				<option value="1900">19:00</option>
				<option value="1930">19:30</option>
				<option value="2000">20:00</option>
			</select>
		</div>
  
	</div>
-->
	<br>
	
	<!-- <button v-on:click="showMenuStaff=true; passData();" id="buttonClick">Check Menu</button> -->
	<!-- <button v-on:click="showBarChart=true" id="buttonClick">Populate Charts</button> -->

<!--
	<div v-show="showMenuStaff">
		<ul>

			<li v-for="cuisine in cuisinesStaff" v-bind:key="cuisine[0]" >
				<h2><u v-on:click="goToProductPage(cuisine)">{{cuisine[0]}}</u></h2>
				
				<p v-for="cuisineType in cuisine[1]" v-bind:key = "cuisineType">
				{{cuisineType}}
				</p>  

				<p> {{cuisine[1].cuisine}}</p>

				<p v-for="dish in cuisine[1].dishes" v-bind:key = "dish">
					{{dish}}
				</p>

				<p> {{cuisine[1].takeawayTiming}} </p>

        <p> {{cuisine[1].quantity}} </p>

				
			</li>

		</ul>
	</div>
	-->

</div></center>
    <br>
	<center> <p class="message" v-show="showChart"> Charts Populated for {{selectedMealStaff}} on {{this.formattedDate}}</p> </center>
    </li>
    </ul>
    
</div>


<div class="row">

<!--
<div v-show="showChart" class="column">
  <br>
  <h3> Total orders for each cuisine </h3> 
  <br>
<center>	<BarChart ref="barchart"></BarChart>  </center>
</div> 
-->

<div v-show="showChart" class="column">
  <br>
  <h3> Total orders along with/without smaller portions <br> for each cuisine</h3>
  <br>
  <!-- <p class="chartDetails"> {{selectedMealStaff}} on {{this.formattedDate}} </p> -->
<center>	<GroupedBarChart ref="groupedbarchart"></GroupedBarChart>  </center>
</div> 

<div v-show="showChart" class="column">
  <br>
<h3> Total orders for each cuisine </h3>
<br>
  <!-- <p class="chartDetails"> {{selectedMealStaff}} on {{this.formattedDate}} </p> -->
<center>	<PieChart ref="piechart"></PieChart>  </center>
</div> 



</div>




<!-- 
<div v-show="showBarChart" class="chart">
  <h1>Bar Chart</h1> 
	<BarChart ref="barchart"></BarChart>  
</div> 
-->

</div>
</div>
</template>

<script>
//import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import GroupedBarChart from '@/components/charts/GroupedBarChart.vue'

import database from "../firebase.js"
import firebase from "firebase"

export default {

	components: {
		//'BarChart':BarChart,
		'PieChart':PieChart,
		'GroupedBarChart': GroupedBarChart,

	},
	data() {
		return {
			selectedDateStaff:'',
			selectedMealStaff:'',
			showMenuStaff:false,
			takeawayTimeStaff:'',
			cuisinesStaff:[],
			showBarChart:false,
			formattedDate:'',
		}
	},
	methods: {
			fetchcuisinesStaff: function() {
			//change the form of date
			var strings = this.selectedDateStaff.split("-")
			var newDate = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]
			
			this.formattedDate = newDate;
			//this.$refs.barchart.updateData(newDate, this.selectedMealStaff)
			this.$refs.piechart.updateData(newDate, this.selectedMealStaff)
			this.$refs.groupedbarchart.updateData(newDate, this.selectedMealStaff)

			this.cuisinesStaff=[]; // clear the cuisinesStaff

			database.collection("Order").doc(newDate)
				.collection(this.selectedMealStaff).get().then(snapshot => {
				snapshot.docs.forEach(doc => {
						this.cuisinesStaff.push([doc.id,doc.data()])

					})
				})
		},
		fetch: function() {
			//fetch cuisinesStaff from database when time and meal are selected
			if (this.selectedDateStaff != '' && this.selectedMealStaff != '') {
				// if (this.takeawayTimeStaff!='') {
				this.fetchcuisinesStaff()
			}
		},
		// goToProductPage:function(cuisine) {
		// 	this.$router.push( {name: "Product", params: {"cuisine": cuisine, "meal": this.selectedMealStaff}} )
		// },
	logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.message);
          this.$router.push('/');
        });
    },

		// countMeals: function() {
		// 	this.mealsCount = this.cuisinesStaff.length;
		// 	//console.log(this.cuisinesStaff.length)
		// },

    // passData: function() {
    //   var strings = this.selectedDateStaff.split("-")
	// 		var newDate = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]
    //   this.itemsProps.push(newDate)
    //   this.itemsProps.push(this.selectedMealStaff)
    //   console.log(this.itemsProps)
    // },
	}
  

}
</script>

<style scoped>
#dropdown {
font-family: Avenir, Helvetica, Arial, sans-serif;

}
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
}

.radio { 
	display: inline;
	padding: 10px;
}

#content {
  width: 100%;
  background-color: #f1f1f1;
}

.navbarstyle {
	text-decoration:none;
	color:#fff;
	text-transform:uppercase;
}

button{
    width:200px;
    padding:15px 0;
    text-align:center;
    margin:20px 10px;
	margin-top:5px;
    border-radius:25px;
    font-weight:bold;
    border:2px solid #009688;
    background:transparent;
    color:rgb(22, 20, 20);
    cursor:pointer;
    font-size:20px;
    background-color: #f7f2e1;
    
}

.box select {
  background-color: #f00c0c;
  color: white;
  padding: 6px;
  width: 180px;
  border: none;
  font-size: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  -webkit-appearance: button;
  appearance: button;
  outline: none;
  margin-top:5px;
  font-size: 16px;
}

.box::before {
  content: "\f13a";
  font-family: FontAwesome;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  text-align: center;
  font-size: 28px;
  line-height: 45px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}

.box:hover::before {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(255, 255, 255, 0.2);
}

.box select option {
  padding: 30px;
}

.chart {
	width:100%;
    /*position:absolute;*/
    text-align: center;
    /*color:#fff;*/
    /*margin-top:80px;*/
	margin:20px auto;
    /*font-weight:100;*/
    line-height:25px;
	border-radius: 25px;
	border: 2px solid #73AD21;
	padding: 20px;
}

.chartTitle {
	font-size:35px;
	font-weight:bold;
}

.message {
	font-size:35px;
	font-weight:bold;
}

/* TESTING BELOW */
#main{
    display:table;
}

#chart{
width:100%;
    /*position:absolute;*/
    text-align: center;
    /*color:#fff;*/
    /*margin-top:80px;*/
	margin:20px auto;
    /*font-weight:100;*/
    line-height:25px;
	border-radius: 25px;
	border: 2px solid #73AD21;
	padding: 20px;
}

/*TESTING 2*/
.column {
	width:50%;
    /*position:absolute;*/
    text-align: center;
    /*color:#fff;*/
    /*margin-top:80px;*/
	margin:20px auto;
    /*font-weight:100;*/
    line-height:25px;
	border-radius: 25px;
	border: 2px solid #73AD21;
	padding: 20px;
	float:left;
	
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
