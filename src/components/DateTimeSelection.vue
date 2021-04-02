<template>
  <div id="dropdown">
	<form>
		<div>
			<label for="meal">Choose your preferred date and time:</label>
			<input id="meal" type="date" name="meal" min="2021-04-14" max="2021-04-20" v-model="selectedDate" required>
			{{selectedDate}}
			
			<br>
			<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="breakfast" v-model="selectedMeal"> 
			<label for="breakfast" class="radio">Breakfast</label> 
			<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="dinner" v-model="selectedMeal"> 
			<label for="dinner" class="radio">Dinner</label>
			
		</div>
	</form>

	<div>
  
		<button v-on:click="subTotalVal=true" id="buttonClick">Check Menu</button>

		<div v-show="subTotalVal">
			<ul>
				<li v-for="item in itemsList" v-bind:key="item.name" >

					<h2><router-link to="/product">{{item.name}}</router-link></h2>
					<img v-bind:src="item.imageURL"/>
				</li>
			</ul>
		</div>

		<div v-show = "selectedMeal == 'breakfast'">
			<p>Breakfast Takeaway Time</p>
			<select id="time" name="time" v-model="takeawayTime">
				<option value="0730">07:30</option>
				<option value="0800">08:00</option>
				<option value="0830">08:30</option>
				<option value="0900">09:00</option>
				<option value="0930">09:30</option>
			</select>
		</div>

		<div v-show = "selectedMeal == 'dinner'">
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
	

  </div>
</template>

<script>

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
			subTotalVal:false,
			takeawayTime:''
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