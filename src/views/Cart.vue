<template>
<div>
    <div class ="navbar">
        <ul>
            <li><router-link to="/profile">Profile</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li><router-link to="/history">History</router-link></li>
            <li class="navbarstyle" v-on:click="logout()">Logout</li>  
        </ul>
    </div>
    
    <div class="shopping-cart">
        <!-- Title -->
        <div class = "title">
            Your Cart
        </div>

        <!--{{items}}-->    
        <div class = "item" v-for="item in items" v-bind:key="item[0]" >
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

            <button v-on:click="remove(item)">Remove</button>

            </div>
        <div class = "credits">
        <p>Your Credit: {{credit}} | Credit needed: {{creditCount()}}</p>
        </div>
        <br>

        <div class = "confirm">
        <button v-on:click="sendOrders()"> Confirm Order</button> 
        </div>
       

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
            //creditCounter : 0,
            credit: 0,
            userId:"",
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
                        this.credit = snapshot.data().credit
                        this.userId = user.email.split("@")[0]
                        this.items = snapshot.data().cart
                        this.items.sort((a,b) => (a.date>b.date) ? 1 : ((b.time > a.time) ? -1:0))
                    })
            }

            //console.log(this.items)
            
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
        remove:function(item){
            for(let i = 0; i < this.items.length; i++) {
                if (item == this.items[i]) {
                    this.items.splice(i, 1)
                    database.collection("UserInfo").doc(this.user.data.email).update({
                        cart:this.items
                    }).then(()=> {
                        location.reload()
                    })


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
            //disallow uploading the orders if credit not enough
            if (this.credit < this.creditCount()) {
                alert("Your credit is not enough")
                return 
            } else if (this.items.length == 0) {
                alert("Please add cuisine before confirming order")
                return 
            } else {
                this.updateDatabase(0)
                alert("Your order has been confirmed!")
            }
            this.$router.push("/menu")
        },

        updateDatabase:function(i) {
            //i stands for index
            console.log(i)
            
            if (i >= this.items.length) {
                //reduce the credit from user account
                database.collection("UserInfo").doc(this.user.data.email).update({
                    credit : this.credit - this.creditCount()
                }).then(() => {
                    //delete the item from user cart, and add them to history
                    database.collection("UserInfo").doc(this.user.data.email).update({
                        cart : []
                    })
                    var docRef = database.collection("UserInfo").doc(this.user.data.email)
                    var updatedHistory = []
                    docRef.get().then(
                        snapshot => {
                            if (typeof(snapshot.data().history) !== 'undefined') {
                                updatedHistory = snapshot.data().history
                            }
                            console.log(updatedHistory)
                        }
                        
                    ).then( () => {
                        docRef.update({
                            history: updatedHistory.concat(this.items)
                        })
                    }).then (() => {
                        location.reload()
                    })
                })
                return
            }
            var item = this.items[i]
            var dayToDate = {
                0 : "18-4-2021",
                1 : "19-4-2021",
                2 : "20-4-2021",
                3 : "14-4-2021",
                4 : "15-4-2021",
                5 : "16-4-2021",
                6 : "17-4-2021",
            } 
            var day = new Date(item.date).getDay()
            var docRef = database.collection("Order").doc(dayToDate[day]).collection(item.meal).doc(this.userId)
            

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("push to existing")
                    var newOrders = doc.data().orders
                    newOrders.push(item)
                    console.log(newOrders)
                    docRef.update({ orders : newOrders}).then(() => this.updateDatabase(i+1))
                } else {
                    console.log("push to new");
                    console.log({ "orders": [item] })

                    docRef.set({
                        "orders": [item]
                    }).then(() => this.updateDatabase(i+1))
                }
            })
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
 
 .shopping-cart {
  width: 70%;
  height: 100%;
  margin: 25px 0 auto 300px;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.title {
  height: 60px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}
 
.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
}


.buttons {
  position: relative;
  padding-top: 30px;
  margin-right: 60px;
}

.cuisine {
  padding-top: 10px;
  min-width: 450px;
  max-width: 450px;
  height: 120px;
}

.quantity {
  padding-top: 10px;
  margin-left: 5%;
}

.date,
.time{
  padding-top: 10px;
  min-width: 100px;
  margin-left: 7%;
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

.credits {
    padding-top: 10px;
    text-align:center;
}

.confirm {
    padding-top: 2px;
    text-align: center;
    font-weight: bold;
}
</style>
