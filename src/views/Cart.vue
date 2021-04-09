<template>
<div>
    <div class ="navbar">
        <ul>
            <li><router-link to="/profile">Profile</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li><router-link to="/">Logout</router-link></li>   
        </ul>
    </div>
    <div class="content">
    
        <h1>Your Cart</h1>
        {{items}}    
        <table>
            <tr>
                <th>Cuisine</th>
                <th>Date</th>
                <th>Time</th>
                <th>Quantity</th>
                <th>Remark</th>
            </tr>
                
            <tr v-for="item in items" v-bind:key="item[0]">
                <td>{{item.cuisine}} <button v-on:click="remove(item)">remove</button></td>
                <td>{{item.date}}</td>
                <td>{{item.time}}</td>
                <td><button v-on:click="decrease(item)">-</button> {{item.quantity}} <button v-on:click="increase(item)">+</button></td>
                <td>{{getRemark(item.smallProportionOption)}} <br>{{item.remark}} </td>
            </tr>

        </table>
            
        
        <p>Your Credit: {{credit}}   Credit needed: {{creditCount()}}</p>
        <button v-on:click="sendOrders()" > Confirm Order</button>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import database from "../firebase.js"

export default {

    name: 'Cart',
    data() {
        return {
            items: [],
            creditCounter : 0,
            credit: 20,
            //userInfo:{}
        }
    },
    created() {

        firebase.auth().onAuthStateChanged(user =>  {
        
            if (user) {
                database.collection("UserInfo").doc(user.email).get()
                    .then(snapshot=> {
                        //this.userInfo = snapshot.data()
                        //this.userInfo.email = user.email
                        this.items = snapshot.data().cart
                    })
            }
            
        })
    },
    methods: {
        remove:function(item){
            for(let i = 0; i < this.items.length;i++) {
                if (item == this.items[i]) {
                    this.items.splice(i, 1)
                }
            }
        },
        creditCount:function(){
            var counter = 0; 
            for(let i = 0; i < this.items.length;i++) {
                counter+=this.items[i].quantity;
            }
            this.creditCounter = counter;
            return counter;
        },
        sendOrders:function(){
            this.items = []
            this.credit -= this.creditCounter
            alert("Your order has been confirmed!")
        },

        increase:function(item) {
            item.splice(2,1,item[2]+1)
        },
        decrease:function(item) {
            if (item[2] > 1)
            item.splice(2,1,item[2]-1)
        },

        getRemark:function(smallerOption) {
            if (smallerOption) {
                return "Want a smaller proportion"
            }
        }


    },
    computed: {
        ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
        user: "user"
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
    width:100%;
    position:absolute;
    top:60%;
    transform:translateY(-50%);
    text-align: center;
    color:#fff;
}

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

</style>
