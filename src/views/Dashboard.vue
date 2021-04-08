<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/orders-overview">Overview</router-link></li>
      <li><router-link to="/cart">Cart</router-link></li>
      <li v-on:click="logout()">Logout</li>

  </ul>
</div>

<div id="content">
        <div id = "profile">
            <ul>
            <li> 
              <center>
              <div id="dropdown">
	<form>
		<div>
			<label for="meal">Choose your preferred date and time:</label>
			<input id="meal" type="date" name="meal" min="2021-04-14" max="2021-04-20" v-model="selectedDateStaff" v-on:change="fetch()" required>
			{{selectedDateStaff}}
			
			<br>
			<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMealStaff" v-on:change="fetch()"> 
			<label for="breakfast" class="radio">Breakfast</label> 
			<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMealStaff" v-on:change="fetch()"> 
			<label for="dinner" class="radio">Dinner</label>
			{{selectedMealStaff}}
		</div>
	</form>

	<!--{{cuisinesStaff}}-->

	<div>
		<div v-show = "selectedMealStaff == 'Breakfast'">
			<p>Breakfast Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTimeStaff" v-on:change="fetch()">
				<option value="0730">07:30</option>
				<option value="0800">08:00</option>
				<option value="0830">08:30</option>
				<option value="0900">09:00</option>
				<option value="0930">09:30</option>
			</select>
		</div>

		<div v-show = "selectedMealStaff == 'Dinner'">
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

	<br>
	
	<button v-on:click="showMenuStaff=true; countMeals(); passData();" id="buttonClick">Check Menu</button>
	<!--<button v-on:click="showMenuStaff=true;" id="buttonClick">Check Menu</button>-->

	<div v-show="showMenuStaff">
		<ul>

			<li v-for="cuisine in cuisinesStaff" v-bind:key="cuisine[0]" >
				<h2><u v-on:click="goToProductPage(cuisine)">{{cuisine[0]}}</u></h2>
				
			<!--	<p v-for="cuisineType in cuisine[1]" v-bind:key = "cuisineType">
				{{cuisineType}}
				</p>  -->

				<p> {{cuisine[1].cuisine}}</p>

				<p v-for="dish in cuisine[1].dishes" v-bind:key = "dish">
					{{dish}}
				</p>

				<p> {{cuisine[1].takeawayTiming}} </p>

        <p> {{cuisine[1].quantity}} </p>

				
			</li>

		</ul>
	</div>
	

  </div></center>
              <br>
            </li>
            </ul>
        </div>
    </div>


<div class="chart">
  <h1>Bar Chart</h1> 
    
	<BarChart ref="barchart"></BarChart>
    
  </div>

</div>
</template>

<script>
//import PageContentStaff from '@/components/PageContentStaff.vue'
import BarChart from '@/components/charts/BarChart.vue'
import database from "../firebase.js"
export default {

	components: {
		//PageContentStaff,
		'BarChart':BarChart,

	},
	data() {
		return {
			selectedDateStaff:'',
			selectedMealStaff:'',
			showMenuStaff:false,
			takeawayTimeStaff:'',
			cuisinesStaff:[],
			//studentid: 'E0318191',
			//studentIDs:[],
			//mealsCount:'',
			//itemsProps : ['14-4-2021', 'Breakfast'],
		}
	},
	methods: {
			fetchcuisinesStaff: function() {
			//change the form of date
			var strings = this.selectedDateStaff.split("-")
			var newDate = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]
      //console.log(newDate)
			
			this.$refs.barchart.updateData(newDate, this.selectedMealStaff)

			this.cuisinesStaff=[]; // clear the cuisinesStaff

			database.collection("Order_test").doc(newDate)
				.collection(this.selectedMealStaff).get().then(snapshot => {
				snapshot.docs.forEach(doc => {
						this.cuisinesStaff.push([doc.id,doc.data()])
	
            //console.log(doc.id)
            //console.log(doc.data())
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
		goToProductPage:function(cuisine) {
			this.$router.push( {name: "Product", params: {"cuisine": cuisine, "meal": this.selectedMealStaff}} )
		},
		f:function() {
			// for test
			alert("testing")
		},

		countMeals: function() {
			this.mealsCount = this.cuisinesStaff.length;
			//console.log(this.cuisinesStaff.length)
		},

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

#content {
  width: 100%;
  background-color: #f1f1f1;
}

</style>
