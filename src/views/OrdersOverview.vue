<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li class="navbarstyle" v-on:click="logout()">Logout</li>
  </ul>
</div>

<div>
  
  <form>
    <div id="wrapper">
      <input id="dateSelect" type="date" v-bind:min="dateMin" v-bind:max="dateMax" v-model="selectedDate" v-on:change="fetch()" required>
      
      <input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMeal" v-on:change="fetch()"> 
      <label for="breakfast" class="radio">Breakfast</label> 
      <input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMeal" v-on:change="fetch()"> 
      <label for="dinner" class="radio">Dinner</label>
    
    </div>
  </form>

  <order-listing :orders="orders" />
  
</div>

</div>
</template>

<script>
import orderListing from "../components/OrderListing"
import database from "../firebase.js"
import firebase from "firebase"

export default {
  components: {
    orderListing

  },
  
  data: () => ({
    selectedMeal: "",  
    orders: [],
    selectedDate: "",
    dateMin:"",
    dateMax:"",
  }),

  methods: {
    getOrders() {
      var dict = {
        stud_id: "",
        collect_time: "",
        meal_type: [],
        smaller: false,
        quantity: 0,
        remark: "",
        };


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
      /*
      var strings = this.selectedDate.split("-")
			date = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]
      */

      this.orders = [];
      database.collection("Order").doc(newDate)
        .collection(this.selectedMeal).get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            let copyDict= JSON.parse(JSON.stringify(dict));
            var container = doc.data().orders;
            copyDict["stud_id"] = doc.id;
            for (var i = 0; i < container.length; i++) {
              copyDict["collect_time"] = container[i].time,
              copyDict["meal_type"] = container[i].cuisine[1].dishes.map(dish => dish.toLowerCase().split(' ').map(function(word) { 
              return (word.charAt(0).toUpperCase() + word.slice(1));}).join(' ')),
              copyDict["smaller"] = container[i].small,
              copyDict["quantity"] = container[i].quantity,
              copyDict["remark"] = container[i].remark 
            }
            this.orders.push(copyDict)
            console.log(this.orders)
          })
        })
        },
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
    fetch: function() {
			if (this.selectedDate != '' ) {
				this.getOrders()
			}
		},
  },
  created() {
    this.getOrders();
  },

  mounted() {
		var today = new Date();

	
		var startDay = new Date(today)
		startDay.setDate(startDay.getDate() - 6)
		var dd = startDay.getDate();
		var mm = startDay.getMonth()+1; //January is 0!
		var yyyy = startDay.getFullYear();
		if(dd<10){
				dd='0'+dd
		}
		if(mm<10){
			mm='0'+mm
		} 
		this.dateMin = yyyy+'-'+mm+'-'+dd;


		var endDay = new Date(today)
		endDay.setDate(endDay.getDate() + 7)
		dd = endDay.getDate();
		mm = endDay.getMonth() + 1; //January is 0!
		yyyy = endDay.getFullYear();
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

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}

form {
   background-color: rgb(232, 237, 255);
   width: 100%;
}

#wrapper {
  display: block;
  margin-left: 38%;
}

label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: 0 auto;
}

.radio { 
	display: inline;
  margin-left: 20px;
}

</style>
