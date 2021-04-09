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
            <label for="small">I want a smaller proportion</label>
            <input type="checkbox" id="small" v-model="smallProportionOption"> 
            
            {{smallProportionOption}}
            <br>


            <label for="remark">Please note down your special need here if any :)</label>
            <br>
            <textarea id="remark" name="remark" rows="4" cols="50" v-model.lazy.trim="remark"></textarea> 
            {{remark}}

            <br>
            <label for="model">Select Quantity:</label>
            <select class="form-control" name="model" id="model" v-model="quantity">
            <option v-for="option in quantity_options" v-bind:value="option.id" v-bind:key="option.id">{{option.text}}</option>
            </select>


            {{quantity}}
            <br>
            
            <br>

            <p> Your credit: {{userInfo.credit}} </p>


            <button id="addCart" v-on:click="displayMessage()">Add to Cart</button> 
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
            smallProportionOption:"",
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
        displayMessage: function() {
            alert("Add successfully")

            var thiscart = this.userInfo.cart
            thiscart.push({cuisine: this.cuisine, quantity: this.quantity, small:this.smallProportionOption, time:this.time, remark:this.remark})
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

#back {
    position: absolute;
    left: 10%;
    top: 30px;
    text-align: left;
    font-size: 90%;
    font-weight: bold;
    padding: 0.9%
}

#addCart {
    margin-top: 8%;
    padding: 3%;
    font-weight: bold;
    font-size: 18px;
}

.center {
  margin: auto;
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


</style>