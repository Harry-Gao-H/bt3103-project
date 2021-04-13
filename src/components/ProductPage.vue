<template>
<div id="product">
<button onclick="location.href='/menu'" type="button" id="back">Back</button>
    <div class="flex-col">
        <div class="center" style="color : white" >
            <!--{{cuisine}}-->
            <h2>{{selectedDate}}     {{meal}}: {{cuisine[0]}}</h2>
			<p v-for="dish in cuisine[1].dishes" v-bind:key = "dish">
                {{dish}}
            </p>
            <br>
            <br>
            <br>

            <div>
                <div v-show = "meal == 'Breakfast'">
                    <p>Breakfast Takeaway Time</p>
                    <select id="time" name="time" v-model="time" >
                        <option value="0730">07:30</option>
                        <option value="0800">08:00</option>
                        <option value="0830">08:30</option>
                        <option value="0900">09:00</option>
                        <option value="0930">09:30</option>
                    </select>
                </div>

                <div v-show = "meal == 'Dinner'">
                    <p>Dinner Takeaway Time</p>
                    <select id="time" name="time" v-model="time">
                        <option value="1800">18:00</option>
                        <option value="1830">18:30</option>
                        <option value="1900">19:00</option>
                        <option value="1930">19:30</option>
                        <option value="2000">20:00</option>
                    </select>
                </div>
        
            </div>

            <br>
            <label for="model">Select Quantity:</label>
            <select class="form-control" name="model" id="model" v-model="quantity">
            <option v-for="option in quantity_options" v-bind:value="option.id" v-bind:key="option.id">{{option.text}}</option>
            </select>

            {{quantity}}


            <br>
            <label for="small">I want a smaller proportion</label>
            <input type="checkbox" id="small" v-model="smallProportionOption"> 
            
            {{smallProportionOption}}
            <br>


            <label for="remark">Please note down your special need here if any :)</label>
            <br>
            <textarea id="remark" name="remark" rows="4" cols="50" v-model.lazy.trim="remark"></textarea> 
            {{remark}}

            <br>
            <br>

            <p> Your credit: {{userInfo.credit}} </p>


            <button id="addCart" v-on:click="addOrderToCart()">Add to Cart</button> 
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
            thiscart.push({cuisine: this.cuisine, quantity: this.quantity, small:this.smallProportionOption,
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

.flex-col {
  display: flex;
  justify-content: flex-start;
  margin: 10%;
  margin-top: 1%;
}

.flex-col--2 {
  width: 60%;
  padding: 5px;
  height:50%; 
  margin: 5px;
  font-size: 1.4em;
}

/* Button Design */

#back {
    position: absolute;
    left: 10%;
    top: 17%;
    width: 8%;
    text-align: center;
    font-size: 100%;
    line-height: 10px;
    font-weight: bold;
    padding: 0.9%;
    border-radius:10px;
    border:2px solid hsl(174, 100%, 29%);
    cursor:pointer;
    background: cornsilk;
}

button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

#addCart {
    margin-top: 5%;
    padding: 3%;
    font-weight: bold;
    cursor:pointer;
    border:2px solid hsl(174, 100%, 29%);
    border-radius:10px;
    font-size: 18px;
    background: cornsilk;
    color: black;
}

.center {
  margin: auto;
  text-align: center;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}

.left {
  float: left;
  width: 50%;
  height: auto;
  padding: 20px;
  
}

.right {
  text-align: left;
  float: right;
  width: 50%;
  padding: 20px; 
}

select {
	cursor: pointer;
    padding: 1px;
	border-radius: 1px;
	background-color: #ddd;
	list-style: none;
    margin-left: 3px
}


</style>