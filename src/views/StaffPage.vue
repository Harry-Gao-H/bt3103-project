<template>
<div>

  <div class ="navbar">
  <ul>
    <li><router-link to="/cart">Dashboard</router-link></li>
    <li><router-link to="/">Logout</router-link></li>
    </ul>
  </div>

  <div class="content">
    <order-listing :orders="orders" />
  </div>

</div>
</template>


<script>
import database from "../firebase.js"
import orderListing from "../components/OrderListing"

export default {
  name: "staffPage",

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
  },

  created() {
    this.getOrders(this.selectedDate);
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 70%; 
  margin-left: auto;
  margin-right: auto;
}

td, th {
  border: 4px solid #dddddd;
  text-align: left;
  padding: 28px;
  font-size: 16px;
}
tr:nth-child(even) {
  background-color: #acff59ad;
}

#request {
  font-size: 25px;
  height: 45px;
  background-color: #41b3a3;
}


#itemsList{
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}

img{
  width:150px;
  height: 150px;
}

button{
    font-weight:bold;
    height:40px;
    width:100px;
    font-size:17px;
    margin-left:500px;
}

center{
  display:block;
  margin-left:auto;
  margin-right:auto;
}
</style>