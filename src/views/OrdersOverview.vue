<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li class="navbarstyle" v-on:click="logout()">Logout</li>
  </ul>
</div>

<div id="content">
  
  <form>
  <div id="wrapper">
  <input id="dateSelect" type="date" v-model="selectedDate" v-on:change="fetch()" required>
  
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
    modal: false,
  }),

  methods: {
    getOrders(date) {
      var dict = {
        stud_id: "",
        collect_time: "",
        meal_type: [],
        smaller: false,
        quantity: 0,
        remark: "",
        };
      
      var strings = this.selectedDate.split("-")
			date = strings[2] + "-" + strings[1].substring(1,2) + "-" + strings[0]

      if (this.selectedMeal == "Breakfast"){
        this.orders = [];
        database.collection("Order_test").doc(date)
          .collection(this.selectedMeal).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              let copyDict= JSON.parse(JSON.stringify(dict))
              copyDict["stud_id"] = doc.id,
              copyDict["collect_time"] = doc.data().takeawayTiming,
              copyDict["meal_type"] = doc.data().dishes.map(dish => dish.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ')),
              copyDict["smaller"] = doc.data().smallerPortion,
              copyDict["quantity"] = doc.data().quantity,
              copyDict["remark"] = doc.data().remark,
              this.orders.push(copyDict)
            })
          })
          console.log(this.orders)
      } else {
        this.orders=[];
        database.collection("Order_test").doc(date)
          .collection(this.selectedMeal).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              let copyDict= JSON.parse(JSON.stringify(dict))
              copyDict["stud_id"] = doc.id,
              copyDict["collect_time"] = doc.data().takeawayTiming,
              copyDict["meal_type"] = doc.data().dishes.map(dish => dish.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ')),
              copyDict["smaller"] = doc.data().smallerPortion,
              copyDict["quantity"] = doc.data().quantity,
              copyDict["remark"] = doc.data().remark,
              this.orders.push(copyDict)
                })
              })  
            }
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
    this.getOrders(this.selectedDate);
  },
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
