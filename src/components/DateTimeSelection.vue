<template>
  <div id="dropdown">
	<form>
		<div>
			<label for="meal">Choose your preferred date and time:</label>
			<input id="meal" type="date" name="meal" min="2021-04-14" max="2021-04-20" v-model="selectedDate" v-on:change="fetch()" required>
			{{selectedDate}}
			
			<br>
			<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMeal" v-on:change="fetch()"> 
			<label for="breakfast" class="radio">Breakfast</label> 
			<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMeal" v-on:change="fetch()"> 
			<label for="dinner" class="radio">Dinner</label>
			{{selectedMeal}}
		</div>
	</form>

	<!--{{cuisines}}-->

	<div>
		<div v-show = "selectedMeal == 'Breakfast'">
			<p>Breakfast Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTime">
				<option value="0730">07:30</option>
				<option value="0800">08:00</option>
				<option value="0830">08:30</option>
				<option value="0900">09:00</option>
				<option value="0930">09:30</option>
			</select>
		</div>

		<div v-show = "selectedMeal == 'Dinner'">
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

	<br>
	
	<button v-on:click="showMenu=true" id="buttonClick">Check Menu</button>

	<div v-show="showMenu">
		<ul>
			<li v-for="cuisine in cuisines" v-bind:key="cuisine[0]" >
				<h2><a v-on:click="goToProductPage(cuisine)">{{cuisine[0]}}</a></h2>
				
				<p v-for="dish in cuisine[1].dishes" v-bind:key = "dish">
					{{dish}}
				</p>
			</li>
		</ul>
	</div>
	

  </div>
</template>

<script>
import database from "../firebase.js"

export default {
    props:{
        itemsList: {
            type: Array
        } 
    },
	data() {
		return {
			selectedDate:'',
			selectedMeal:'',
			showMenu:false,
			takeawayTime:'',
			cuisines:[]
		}
	},

	methods: {
		fetchCuisines: function() {
			//change the form of date
			var strings = this.selectedDate.split("-")
			var newDate = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]
			
			console.log(newDate)
			console.log(this.selectedMeal)

			this.cuisines=[]; // clear the cuisines
			database.collection("Menu").doc(newDate)
				.collection(this.selectedMeal).get().then(snapshot => {
				snapshot.docs.forEach(doc => {
						this.cuisines.push([doc.id,doc.data()])
					})
				})
		},
		fetch: function() {
			//fetch cuisines from database when time and meal are selected
			if (this.selectedDate != '' && this.selectedMeal != '') {
				this.fetchCuisines()
			}
		},
		goToProductPage:function(cuisine) {
			this.$router.push( {name: "Product", params: { "cuisine": cuisine}} )
		}
		,
		f:function() {
			// for test
			alert("testing")
		}
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
</style>