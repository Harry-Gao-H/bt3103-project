<template>
<div>
  <div class = "back">
    <button onclick="location.href='/menu'" type="button" id="back">Back</button>
    </div>

<div class="container">

  <!-- Left Column / Headphones Image -->
  <div class="left-column">
    <img src = "../assets/food.jpeg">
  </div>
 
  <!-- Right Column -->
  <div class="right-column">
 
    <!-- Product Description -->
    <div class="product-description">
      <span>{{selectedDate}} </span>
      <h2> {{meal}}</h2>
      <h3> {{cuisine[0].type}} </h3>
      <br>
      <p v-for= "dish in cuisine[0].foods" v-bind:key = "dish">
            {{dish}} |
     </p>
    </div>
 
    <!-- Meal Configuration -->
    <div class="product-configuration">
 
      <!-- Time -->
      <div class="takeaway-time">
        <span>Takeaway time</span>
 
        <div class="meal-time">
          <div v-show = "meal == 'Breakfast'">
                    
                    <select id="time" name="time" v-model="time" >
                        <option value="0730">07:30</option>
                        <option value="0800">08:00</option>
                        <option value="0830">08:30</option>
                        <option value="0900">09:00</option>
                        <option value="0930">09:30</option>
                    </select>
                </div>

                <div v-show = "meal == 'Dinner'">
      
                    <select id="time" name="time" v-model="time">
                        <option value="1800">18:00</option>
                        <option value="1830">18:30</option>
                        <option value="1900">19:00</option>
                        <option value="1930">19:30</option>
                        <option value="2000">20:00</option>
                    </select>
                </div>

        </div>
      </div>
 
      <!-- Quantity -->
      <div class="meal-config">
        <span>  Select Quantity </span>

        <div class="meal-choose" >
            <select class="form-control" name="model" id="model" v-model="quantity">
            <option v-for="option in quantity_options" v-bind:value="option.id" v-bind:key="option.id">{{option.text}}</option>
            </select>
        </div>
        
        <!-- Proportion -->
        <span>  I want a smaller portion </span>
        <div class="choose">
            <input type="checkbox" class = "small-checkbox" id="small" v-model="smallProportionOption"> <label for = "small">
            {{smallProportionOption}} </label>
        </div>
      

      <span> Any remarks? </span>
      <div class = "remark">
          <textarea id="remark" name="remark" rows="2" cols="50" v-model.lazy.trim="remark"></textarea> 
            </div>
    </div>
 
    <!-- Credits  -->
    <div class="credit">
      <span> Your credit: {{userInfo.credit}} </span>
    </div>
    <div class = "cart">
      <button id="addCart" v-on:click="addOrderToCart()">Add to Cart</button> 
    </div>
    

    {{cuisine}}
  </div>
</div>
</div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import database from "../firebase.js"
export default {
    name: 'product',
    data () {
        return {
            selectedDate: '',
            meal:"",
            cuisine:[],
            quantity:1,
            smallProportionOption:false,
            time:"",
            remark: "",
            userInfo:{},
            quantity_options: [
            {
                text: "1",
                id: 1
            },
            {
                text: "2",
                id: 2
            },
            {
                text: "3",
                id: 3
            }],
        }
    },
    created:function() {
        this.cuisine = this.$route.params.cuisine
        this.meal = this.$route.params.meal
        this.selectedDate = this.$route.params.date
        database.collection("UserInfo").doc(this.user.data.email).get()
            .then(snapshot=> {
                this.userInfo = snapshot.data()
            })
        
        
    },
    methods: {
        addOrderToCart: function() {
            if (this.time == "") {
                alert("Please select the time")
                return 
            } 

            alert("This order is successfully added to your cart")
            var thiscart = this.userInfo.cart
            var newCuisine = [this.cuisine[0].type, {dishes: this.cuisine[0].foods}]
            thiscart.push({cuisine: newCuisine, quantity: this.quantity, small:this.smallProportionOption,
                                 time:this.time, date: this.selectedDate, remark:this.remark, meal:this.meal})
            database.collection("UserInfo").doc(this.user.data.email).update({
                cart:thiscart
            })
            this.$router.push("/menu")
        }
    },
    computed: {
    ...mapGetters({
        // map `this.user` to `this.$store.getters.user`
            user: "user"
        })
    }
};
</script>

<style scoped>
.back {
  margin-left: 5%;
  display: inline-block;
}

#back {
  cursor: pointer;
  background-color: white;
  border: 2px solid black ;
  font-size: 16px;
  color: #358ED7;
  text-decoration: none;
  padding: 5%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  
}

/* Basic Styling */
body {
  height: 100%;
  width: 100%;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
 
.container {
  max-width: 1200px;
  max-height: 75vh;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  background-color: white;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
}

/* Columns */
.left-column {
  width: 30%;
  position: relative;
  margin-top: 20px;
  margin-bottom: 10px;
}
 
.right-column {
  width: 70%;
  margin-top: 20px;
}

/* Left Column */
.left-column img {
  width: 90%;
  min-height: 100%;
  position: absolute;
}

/* Meal Description */
.product-description {
  border-bottom: 1px solid #E1E8EE;
  padding-bottom: 1%;
  margin-bottom: 2%;
}
.product-description span {
  font-size: 15px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
}
.product-description h2 {
  font-weight: 700;
  font-size: 40px;
  color: rgb(8, 8, 8);
  text-transform: uppercase;
  margin-top: 1%;
}

.product-description h3 {
  font-weight: 500;
  font-size: 22px;
  text-transform: uppercase;
  margin-top: 1%;
}

.product-description p {
  font-size: 15px;
  color: grey;
  display: inline;
}

/* Takeaway time */
.takeaway-time  {
  margin-bottom: 1%;
}

.takeaway-time span {
  font-size: 15px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
}
 
.meal-time div {
  display: inline-block;
  margin-top: 1%;
}

#time {
  cursor: pointer;
  padding: 4px;
	border-radius: 1px;
	background-color: #ddd;
	list-style: none;
  margin-top: 1%;
  width: 50px;
}

/* Meal Configuration */
.meal-choose {
  margin-bottom: 2%;
}
 
.meal-config {
  margin-bottom: 1%;
}

.meal-config span {
  font-size: 15px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
}

/* Quantity */
.form-control {
  cursor: pointer;
  padding: 4px;
	border-radius: 1px;
	background-color: #ddd;
	list-style: none;
  margin-top: 1%;
  width: 50px;
}

/* Proportion */
label{
    display: inline-block;
    border: 1px solid grey;
    color: black;
    border-radius: 2px;
    white-space: nowrap;
    margin: 3px 0px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: all .2s;
}

label {
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 1%;
    margin-bottom: 2%;
}

label::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-weight: 900;
    font-size: 12px;
    padding: 2px 6px 2px 2px;
    transition: transform .3s ease-in-out;
}

input[type="checkbox"]:checked + label::before {
    transform: rotate(-360deg);
    transition: transform .3s ease-in-out;
}

input[type="checkbox"]:checked + label {
    background-color: lightgreen;
    color: black;
    transition: all .2s;
}

input[type="checkbox"] {
  display: absolute;
}
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
input[type="checkbox"]:focus + label {
  border: 2px solid #358ED7;
}

/* Remarks */
#remark{
  border-bottom:1px solid #358ED7;
}

/* Credit */

.credit {
  font-size: 15px;
  color: #358ED7;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 2%;
}
.cart {
  display: inline-block;
  
}

#addCart {
  cursor: pointer;
  border: 1px solid black ;
  font-size: 16px;
  color: #358ED7;
  text-decoration: none;
  padding: 3%;
  text-align: center;
  margin: auto;
}

#addCart:hover {
  background-color: greenyellow;
}

</style>
