<template>
<div>

<div class ="navbar">
  <ul>
      <li><router-link to="/dashboard" class="navbarstyle">Dashboard</router-link></li>
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
              <input id="meal" type="date" name="meal" v-bind:min="dateMin" v-bind:max="dateMax" v-model="selectedDate" v-on:change="fetch()" required>
              
              <div v-if="showBreakfastOption()">
                <input type="radio" class="radio" id="breakfast" name="breakfast-or-dinner" value="Breakfast" v-model="selectedMeal" v-on:change="fetch()"> 
                <label for="breakfast" class="radio">Breakfast</label> 
              </div>
              <div v-if="showDinnerOption()">
                <input type="radio" class="radio" id="dinner" name="breakfast-or-dinner" value="Dinner" v-model="selectedMeal" v-on:change="fetch()"> 
                <label for="dinner" class="radio">Dinner</label>
              </div>
            </div>
            </form>
        </div> </center>
        <br>
      </li>
    </ul> 
</div>
</div>

<order-listing :orders="orders" />
  

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
            //console.log(this.orders)
          })
        }).then( () => {
          this.orders.sort((a,b) => (a.collect_time > b.collect_time? 1 : -1))
        })
    },
    logout() {
      this.$router.push('/');
      firebase
      .auth()
      .signOut()
      .then(() => {
        alert('Successfully logged out');
        
      })
      .catch(error => {
        alert(error.message);
        this.$router.push('/');
    });
    },
    fetch: function() {
      //if date or meal is not selected, end the function
			if (this.selectedDate != '' && this.selectedMeal != '') {
				this.getOrders()
			}
		},
    showBreakfastOption() {

      if (this.selectedDate!='' ) {
        var day = new Date(this.selectedDate).getDay();
        return day!=0
      } else {
        return false
      }
    },
    showDinnerOption() {

      if (this.selectedDate!='' ) {
        var day = new Date(this.selectedDate).getDay();
        return day!=6
      } else {
        return false
      }
    }
  },

  mounted() {
		var today = new Date();
    var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10){
				dd='0'+dd
		}
		if(mm<10){
			mm='0'+mm
		} 
		this.selectedDate = yyyy+'-'+mm+'-'+dd;
    
	
		var startDay = new Date(today)
		startDay.setDate(startDay.getDate() - 6)
		dd = startDay.getDate();
		mm = startDay.getMonth()+1; //January is 0!
		yyyy = startDay.getFullYear();
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


#wrapper {
  display: block;
  margin-left: 38%;
}


</style>
