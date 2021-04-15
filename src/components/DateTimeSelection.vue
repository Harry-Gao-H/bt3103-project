<template>
  <div id="dropdown">
	<form>
		<div>
			<p id="test"></p>
			<label for="meal">Choose your preferred date and time:</label>
			<input id="datefield" type="date" name="meal" v-bind:min="dateMin" v-bind:max="dateMax" v-model="selectedDate" v-on:change="fetch()" required>
			
			
			<br>

			<div v-show= "!isSunday() && selectedDate!=''">
				<input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMeal" v-on:change="fetch()"> 
				<label for="breakfast" class="radio">Breakfast</label> 
			</div>

			<div v-show= "!isSaturday() && selectedDate!=''">
				<input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMeal" v-on:change="fetch()"> 
				<label for="dinner" class="radio">Dinner</label>
			
			</div>

		</div>
	</form>

	<br>
	
	<button v-on:click="displayMenu()" id="buttonClick">Check Menu</button>

	<p>Note: Only breakfast is served on Saturday and only dinner is served on Sunday </p>
	
	<div v-show="showMenu">
		<v-container grid-list-lg>
        <v-layout row>
            <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5"
                >Available Meal Selections</v-flex
            >
        </v-layout>
        <v-layout row wrap class="meal-plans">
            <v-flex xs12 sm12 md3>
                <v-card height="100%" class="card-outter">  
                    <v-responsive>
                        <v-img
                            src="http://source.unsplash.com/hjCA3ecCXAQ"
                            height="500px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text"
                                            >ASIAN</span
                                        >
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Asian</h3>
                            <div>
								<ol>
									<template v-for="cuisines in filtered('Asian')">
										<li v-for="dish in cuisines.foods" :key="dish">
											{{dish}}
										</li>
									</template>
								</ol>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions class="card-actions">
                        <v-btn
                            outlined
                            block
                            color="green"
                            v-on:click="goToProductPage(filtered('Asian'))"
                        >
                            Select</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm12 md3>
                <v-card height="100%" class="card-outter">
                    <v-responsive>
                        <v-img
                            src="http://source.unsplash.com/6S27S6pZ6o0"
                            height="500px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text"
                                            >MALAY</span
                                        >
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Malay</h3>
                            <div>
                                <ol>
									<template v-for="cuisines in filtered('Malay')">
										<li v-for="dish in cuisines.foods" :key="dish">
											{{dish}}
										</li>
									</template>
								</ol>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions class="card-actions">
                        <v-btn
                            outlined
                            block
                            color="green"
                            v-on:click="goToProductPage(filtered('Malay'))"
                        >
                            Select</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm12 md3>
                <v-card height="100%" class="card-outter">
                    <v-responsive>
                        <v-img
                            src="http://source.unsplash.com/1SPu0KT-Ejg"
                            height="500px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text"
                                            >VEGETARIAN</span
                                        >
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Vegetarian</h3>
                            <div>
                                <ol>
									<template v-for="cuisines in filtered('Vegetarian')">
										<li v-for="dish in cuisines.foods" :key="dish">
											{{dish}}
										</li>
									</template>
								</ol>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions class="card-actions">
                        <v-btn
                            outlined
                            block
                            color="green"
                            v-on:click="goToProductPage(filtered('Vegetarian'))"
                        >
                            Select</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm12 md3>
                <v-card height="100%"  class="card-outter">  
                    <v-responsive>
                        <v-img
                            src="https://images.unsplash.com/photo-1598578013897-10940997c1a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=691&q=80"
                            height="500px"
                        >
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline white--text"
                                            >WESTERN</span
                                        >
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-responsive>

                    <v-card-text>
                        <div>
                            <h3 class="headline mb-0">Western</h3>
                            <div>
                                <ol>
									<template v-for="cuisines in filtered('Western')">
										<li v-for="dish in cuisines.foods" :key="dish">
											{{dish}}
										</li>
									</template>
								</ol>
                            </div>
                        </div>
                    </v-card-text>

                    <v-card-actions class="card-actions">
                        <v-btn
                            outlined
                            block
                            color="green"
                            v-on:click="goToProductPage(filtered('Western'))"
                        >
                            Select</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
	</div>


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

			var dict = {
				type: "",
				foods:[],
			}

			this.cuisines=[]; // clear the cuisines
			database.collection("Menu").doc(newDate)
				.collection(this.selectedMeal).get().then(snapshot => {
				snapshot.docs.forEach(doc => {
						let copyDict= JSON.parse(JSON.stringify(dict));
						copyDict["type"] = doc.id;
						copyDict["foods"] = doc.data().dishes.map(dish => dish.toLowerCase().split(' ').map(function(word) { 
              return (word.charAt(0).toUpperCase() + word.slice(1));}).join(' '));
						this.cuisines.push(copyDict)
					})
				})
				console.log(this.cuisines)
		},

		filtered(category) {
			const res = this.cuisines.filter(({type}) => type == category);
			console.log(res);
			return res;
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
		dd = oneWeekAfter.getDate();
		mm = oneWeekAfter.getMonth() + 1; //January is 0!
		yyyy = oneWeekAfter.getFullYear();
		if(dd<10){
				dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 
		this.dateMax = yyyy+'-'+mm+'-'+dd;
	},

}


</script>


<style scoped>
#dropdown {
font-family: Avenir, Helvetica, Arial, sans-serif;

}


li {
	text-align: left;
	font-size:1em;
}

.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}

.listing {
	margin-bottom: 2%;
	margin-top: 2%;
	text-align: left;
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

button{
    width:200px;
    padding:15px 0;
    text-align:center;
    margin:20px 10px;
	margin-top:5px;
    border-radius:5px;
    font-weight:bold;
    border:2px solid #009688;
    background:transparent;
    color:rgb(22, 20, 20);
    cursor:pointer;
    font-size:20px;
    background-color: #f7f2e1;
    
}

button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
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