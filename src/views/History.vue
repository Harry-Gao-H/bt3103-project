<template>
<div>
    <div class ="navbar">
        <ul>
            <li><router-link to="/profile">Profile</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
            <li class="navbarstyle" v-on:click="logout()">Logout</li>  
        </ul>
    </div>
    <div class="content">
        {{items}}
        <h1>Your Order History</h1>
        <p>Your Credit: {{credit}} </p>
        
        
        <input type="radio" class="radio" id="coming" name="coming-or-expired" value="coming" v-model="orderType" > 
        <label for="coming" class="radio">Coming Orders  </label>     
        <input type="radio" class="radio" id="expired" name="coming-or-expired" value="expired" v-model="orderType"> 
        <label for="expired" class="radio">Expired Orders  </label>
         
        <table v-if="orderType == 'coming'">
            <tr>
                <th>Cuisine</th>
                <th>Date</th>
                <th>Time</th>
                <th>Quantity</th>
                <th>Remark</th>
            </tr>
                
            <tr v-for="item in comingOrders" v-bind:key="item[0]">
                <td>{{getCuisine(item.cuisine)}} </td>
                <td>{{item.date}}</td>
                <td>{{item.time}}</td>
                <td>{{item.quantity}}</td>
                <td>{{getRemark(item.small)}} <br><br>{{item.remark}} </td>
            </tr>

        </table> 

        <table v-if="orderType == 'expired'">
            <tr>
                <th>Cuisine</th>
                <th>Date</th>
                <th>Time</th>
                <th>Quantity</th>
                <th>Remark</th>
            </tr>

            <tr v-for="item in expiredOrders" v-bind:key="item[0]">
                <td>{{getCuisine(item.cuisine)}} </td>
                <td>{{item.date}}</td>
                <td>{{item.time}}</td>
                <td>{{item.quantity}}</td>
                <td>{{getRemark(item.small)}} <br><br>{{item.remark}} </td>
            </tr>

        </table>    
        
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import database from "../firebase.js"

export default {

    name: 'History',
    data() {
        return {
            items: [],
            comingOrders:[],
            expiredOrders:[],
            credit: 0,
            userId:"",
            orderType:""
        }
    },
    created() {

        firebase.auth().onAuthStateChanged(user =>  {
        
            if (user) {
                database.collection("UserInfo").doc(user.email).get()
                    .then(snapshot=> {
                        this.credit = snapshot.data().credit
                        this.userId = user.email.split("@")[0]
                        this.items = snapshot.data().history
                        this.items.sort(
                            function(a, b) {
                                if (a.date != b.date) {
                                    return a.date > b.date ? 1:-1
                                } else {
                                    return a.time > b.time ? 1 : -1
                                }
                        
                            })

                        var today = new Date()

                        for (let i = 0; i < this.items.length; i++) {
                            var item = this.items[i]
                            var date = new Date(item.date)
                            if (date >= today) {
                                this.comingOrders.push(item)

                            } else if (date < today) {
                                this.expiredOrders.push(item)
                            }
                        }
                        /*
                        this.comingOrders.sort(
                            function(a, b) {
                                if (a.date != b.date) {
                                    return a.date > b.date ? 1:-1
                                } else {
                                    return a.time > b.time ? 1 : -1
                                }
                        
                            })
                        this.expiredOrders.sort(
                            function(a, b) {
                                if (a.date != b.date) {
                                    return a.date > b.date ? 1:-1
                                } else {
                                    return a.time > b.time ? 1 : -1
                                }
                        
                            })

                        */
                    })
            }
            
        })
    },
    methods: {
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
        creditCount:function(){
            var counter = 0; 
            for(let i = 0; i < this.items.length;i++) {
                counter+=this.items[i].quantity;
            }
            this.creditCounter = counter;
            return counter;
        },

        getCuisine:function(cuisine) {
            var string =  cuisine[1].dishes.toString()
            return cuisine[0] + " : " + string.toLowerCase()
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
