<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li class="navbarstyle" v-on:click="logout()">Logout</li>
  </ul>
</div>

<div id="content">
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
    selectedDate: "10-4-2021",
    selectedMeal: "Breakfast",  
    orders: [],
  }),

  methods: {
    getOrders(date) {

      var dict = {
        stud_id: "",
        collect_time: "",
        meal_type: [],
        special_need: []
        };

      if (this.selectedMeal == "Breakfast"){
        this.orders = [];
        database.collection("Order_test").doc(date)
          .collection(this.selectedMeal).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              let copyDict= JSON.parse(JSON.stringify(dict))
              copyDict["stud_id"] = doc.id,
              copyDict["collect_time"] = doc.data().takeawayTiming,
              copyDict["meal_type"] = doc.data().mealSelect,
              this.orders.push(copyDict)
            })
          })
          console.log(this.orders)
      } else {
        this.orders=[];
        database.collection("Order_test").doc(date)
          .collection(this.selectedMeal).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              dict.stud_id = doc.id,
              dict.collect_time = doc.data().takeawayTiming,
              dict.meal_type = doc.data().mealSelect,
              this.orders.push(dict)
              console.log(this.orders)
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
  },
  created() {
    this.getOrders(this.selectedDate);
  },
}
</script>

<style scoped>

#content {
  width: 100%;
  background-color: #f1f1f1;
}

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}

</style>
