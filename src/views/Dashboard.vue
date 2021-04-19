<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/orders-overview" class="navbarstyle">Overview</router-link></li>
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
			<label for="meal">Choose date of the orders you wish to view:</label>
			<input id="meal" type="date" name="meal" min="2021-04-14" max="2021-04-20" v-model="selectedDateStaff" v-on:change="fetch()" required>
			
			
			<br>
			<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMealStaff" v-on:change="fetch()" v-on:click="showChart=true"> 
			<label for="breakfast" class="radio">Breakfast</label> 
			<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMealStaff" v-on:change="fetch()" v-on:click="showChart=true"> 
			<label for="dinner" class="radio">Dinner</label>
		
		</div>
	</form>
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
			showChart:false,
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

			database.collection("Order_test").doc(newDate)
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
	color:rgb(0, 0, 0);
	text-transform:uppercase;
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
	/*border-radius: 25px;
	border: 2px solid #73AD21;*/
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
