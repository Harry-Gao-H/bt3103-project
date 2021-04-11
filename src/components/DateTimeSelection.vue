<template>
  <div id="dropdown">
	<form>
		<div>
			<p id="test"></p>
			<label for="meal">Choose your preferred date and time:</label>
			<input id="datefield" type="date" name="meal" v-bind:min="dateMin" v-bind:max="dateMax" v-model="selectedDate" v-on:change="fetch()" required>
			{{selectedDate}}
			
			<br>

			<div v-show= "!isSunday() && selectedDate!=''">
				<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMeal" v-on:change="fetch()"> 
				<label for="breakfast" class="radio">Breakfast</label> 
			</div>

			<div v-show= "!isSaturday() && selectedDate!=''">
				<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMeal" v-on:change="fetch()"> 
				<label for="dinner" class="radio">Dinner</label>
			{{selectedMeal}}
			</div>

		</div>
	</form>

	<!--
	<div>
		<div v-show = "selectedMeal == 'Breakfast'" class="box">
			<p>Breakfast Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTime">
				<option value="0730">07:30</option>
				<option value="0800">08:00</option>
				<option value="0830">08:30</option>
				<option value="0900">09:00</option>
				<option value="0930">09:30</option>
			</select>
		</div>

		<div v-show = "selectedMeal == 'Dinner'" class="box">
			<p>Dinner Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTime">
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
	
	<button v-on:click="displayMenu()" id="buttonClick">Check Menu</button>

	<div v-show="showMenu">
		<ul>
			<li v-for="cuisine in cuisines" v-bind:key="cuisine[0]" >
				<h2><u v-on:click="goToProductPage(cuisine)">{{cuisine[0]}}</u></h2>
				
				<p v-for="dish in cuisine[1].dishes" v-bind:key = "dish">
					{{dish}}
				</p>
			</li>
		</ul>
	</div>

	<p>Note: Only breakfast is served on Saturday and only dinner is served on Sunday </p>

  </div>
</template>

<script>
import database from "../firebase.js"




export default {
	data() {
		return {
			selectedDate:'',
			selectedMeal:'',
			showMenu:false,
			takeawayTime:'',
			cuisines:[],
			dateMin:"",
			dateMax:"",

			dateMap: {

			}
		}
	},

	methods: {
		fetchCuisines: function() {
			//var strings = this.selectedDate.split("-")
			//var newDate = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]
			//get the day of selected date
			var day = new Date(this.selectedDate).getDay();

			var dayToDate = {
				0 : "18-4-2021",
				1 : "19-4-2021",
				2 : "20-4-2021",
				3 : "14-4-2021",
				4 : "15-4-2021",
				5 : "16-4-2021",
				6 : "17-4-2021",
			} 

			var newDate = dayToDate[day]

			this.cuisines=[]; // clear the cuisines
			database.collection("Menu").doc(newDate)
				.collection(this.selectedMeal).get().then(snapshot => {
				snapshot.docs.forEach(doc => {
						this.cuisines.push([doc.id,doc.data()])
					})
				})
		},


		isSaturday() {
			return new Date(this.selectedDate).getDay() == 6
		},
		isSunday() {

			return new Date(this.selectedDate).getDay() == 0
		},
		fetch: function() {
			//fetch cuisines from database when time and meal are selected
			if (this.selectedDate != '' && this.selectedMeal != '') {
				this.fetchCuisines()
			}
		},
		goToProductPage:function(cuisine) {
			this.$router.push( {name: "Product", params: {"cuisine": cuisine, "meal": this.selectedMeal, "date":this.selectedDate}} )
		},
		displayMenu() {
			if (this.selectedDate!='' && this.selectedMeal!='') {
				this.showMenu = true
			}
		}
		
	},

	mounted() {
		var today = new Date();

		//get the date of tomorrow
		var tomorrow = new Date(today)
		tomorrow.setDate(tomorrow.getDate() + 1)
		var dd = tomorrow.getDate();
		var mm = tomorrow.getMonth()+1; //January is 0!
		var yyyy = tomorrow.getFullYear();
		if(dd<10){
				dd='0'+dd
			} 
		if(mm<10){
			mm='0'+mm
		} 
		this.dateMin = yyyy+'-'+mm+'-'+dd;

		//get the date of one week after
		var oneWeekAfter = new Date(today)
		oneWeekAfter.setDate(oneWeekAfter.getDate() + 7)
		var dd = oneWeekAfter.getDate();
		var mm = oneWeekAfter.getMonth()+1; //January is 0!
		var yyyy = oneWeekAfter.getFullYear();
		if(dd<10){
				dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		this.dateMax = yyyy+'-'+mm+'-'+dd;

		
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
#itemsList{
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
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

</style>