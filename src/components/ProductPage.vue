<template>

<div id="main">
  <div class = "back">
    <button onclick="location.href='/menu'" type="button" id="back" autofocus>Back</button>
    </div>


  <v-app id="inspire">
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="480"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="250"
        src="https://source.unsplash.com/random/?${type}-food,food"
      ></v-img>
  
      <v-card-title>{{cuisine[0].type}}</v-card-title>
  
      <v-card-text>
        <v-row
          align="left"
          class="mx-0"
        >
          <div class="my-4 subtitle-1">
            <p><i class="inline-icon material-icons">date_range</i> {{selectedDate}}  |  <i class="inline-icon material-icons">restaurant</i> {{meal}}</p>
          </div>
    
          <div>
            <span v-for= "dish in cuisine[0].foods" v-bind:key = "dish">
              {{dish}} \
            </span>
          </div>
          <br>
        </v-row>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-title>Takeaway Timings</v-card-title>
  
      <v-card-text class="pb-0 mx-0">
        <div v-if = "meal == 'Breakfast'">
            <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>7:30PM</v-chip>
    
            <v-chip>8:00PM</v-chip>
    
            <v-chip>8:30PM</v-chip>
    
            <v-chip>9:00PM</v-chip>

            <v-chip>9:30PM</v-chip>
         </v-chip-group>
      </div>

      <div v-else>
            <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>18:00PM</v-chip>
    
            <v-chip>18:30PM</v-chip>
    
            <v-chip>19:00PM</v-chip>
    
            <v-chip>19:30PM</v-chip>

            <v-chip>20:00PM</v-chip>
         </v-chip-group>
      </div>

      <v-checkbox
        v-model="smallProportionOption"
        :label="`I want a smaller portion: ${(smallProportionOption ? 'Yea! Save it!' : 'Nope')}`"
      ></v-checkbox>

      <v-textarea
            outlined
            name="remark"
            label="Additional Remarks"
            v-model.trim="remark"
            value="Any additional remarks you want the food operator to know?"
          >
      </v-textarea>
      YOUR CREDIT: {{userInfo.credit}}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="teal lighten-1"
          class="white--text"
          @click="addOrderToCart"
        >
          Add to Cart
          <v-icon
          right
          dark
        >
          mdi-basket-unfill
        </v-icon>
        
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
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
            type: "",
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
        this.type = this.cuisine[0].type;
        database.collection("UserInfo").doc(this.user.data.email).get()
            .then(snapshot=> {
                this.userInfo = snapshot.data()
            });
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
        },
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
  display: inline-block;
  position: relative;
  left: auto
}

.inline-icon {
   vertical-align: text-bottom;
   font-size: -6px;
}

#back {
  cursor: pointer;
  background-color: white;
  border: 4px solid rgb(10, 168, 102) ;
  font-size: 16px;
  color: #001d11;
  text-decoration: none;
  padding: 5%;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: grey;
  border-radius: 6px;
}

#inspire{
  background-image: linear-gradient(to bottom,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url(https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
  background-repeat: no-repeat;
  background-size:cover;
  box-shadow: 10px 10px grey;
}

#main {
  background-color: rgb(13, 19, 18);
}

</style>
