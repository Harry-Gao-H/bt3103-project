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

    <div class="order-cart">
        <!-- Title -->
        <div class = "title">
            Your Order History
        </div>

        <!-- Display Credits Left -->
         <div class = "credits"> Available Credits: {{credit}} </div>

        <!-- Select history option -->
        <div class = "options">
        <form>
            <input type="radio" class="radio" id="coming" name="coming-or-expired" value="coming" v-model="orderType" > 
            <label for="coming" class="radio">Coming Orders  </label>     
            <input type="radio" class="radio" id="expired" name="coming-or-expired" value="expired" v-model="orderType"> 
            <label for="expired" class="radio">Expired Orders  </label>
        </form> 
        </div>

        <!-- unfufilled items -->
        <div class = "item" v-if="orderType == 'coming'">
            <!-- Heading -->
        <div class = "header">
            <div class = "a"> Cuisine </div>
            <div class = "b"> Quantity </div>
            <div class = "c"> Date </div>
            <div class = "d"> Time </div>
            <div class = "e"> Remark </div>
        </div>
          
            <div class = "orders" v-for="item in comingOrders" v-bind:key="item[0]">
                <div class = "cuisine">
                {{getCuisine(item.cuisine)}} 
            </div>

            <div class = "quantity">
                  {{item.quantity}} 
            </div>

            <div class = "date">
                 {{item.date}} 
            </div>

            <div class = "time">
                 {{item.time}} 
            </div>

            <div class = "remark">
                 {{getRemark(item.small)}} <br>{{item.remark}}
            </div>
            </div>
        </div>

        <!-- expired items -->
        <div class = "item" v-if="orderType == 'expired'">
            <!-- Heading -->
            <div class = "header">
                <span class = "a"> Cuisine </span>
                <span class = "b"> Quantity </span>
                <span class = "c"> Date </span>
                <span class = "d"> Time </span>
                <span class = "e"> Remark </span>
            </div>

             <div class = "orders" v-for="item in expiredOrders" v-bind:key="item[0]">
                <div class = "cuisine">
                {{getCuisine(item.cuisine)}} 
            </div>

            <div class = "quantity">
                  {{item.quantity}} 
            </div>

            <div class = "date">
                 {{item.date}} 
            </div>

            <div class = "time">
                 {{item.time}} 
            </div>

            <div class = "remark">
                 {{getRemark(item.small)}} <br>{{item.remark}}
            </div>
            </div>
            </div>  
        
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
            orderType:"coming"
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
* {
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

  .order-cart {
  width: 70%;
  height: 60vh;
  margin: 25px 0 auto 300px;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.title {
  height: 60px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}

.credits{
    background-color: white;
    text-align:center;
    padding-top: 5px;
}

.options {
    border: 1px solid lightgrey;
    text-align: center;
    background-color:white;
    padding-top: 5px;
}

.orders {
  padding: 20px 30px;
  height: 120px;
  border: 1px solid lightgray;
  display: flex;
}

.old-orders {
  padding: 20px 30px;
  height: 120px;
  border: 1px solid lightgray;
  display: flex;
}



/* turns on flexbox */
.header{
    display:flex;
    padding: 20px 30px;
    font-weight: 700;
}

/* set width between each element */
.a{
    min-width: 450px;
    max-width: 450px;
    text-align: center;

}
.b{
    flex:1;
  margin-left: 3%;
  min-width: 50px;
  max-width: 120px;

}

.c{
  min-width: 100px;
  max-width: 100px;
  margin-left: 3%;

}

.d{
  min-width: 100px;
  max-width: 120px;
  margin-left: 6%;

}

.e{
    min-width: 120px;
    max-width: 120px;
    margin-left: 7.5%;
}

.cuisine {
  padding-top: 10px;
  min-width: 450px;
  max-width: 450px;
  height: 120px;
  text-align:center; 
}

.quantity {
  padding-top: 10px;
  margin-left: 5%;
}

.date,
.time{
  padding-top: 10px;
  min-width: 100px;
  margin-left: 8%;
}

.remark {
  padding-top: 10px;
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  min-width: 120px;
  max-width: 120px;
  margin-left: 5%;
}


</style>
