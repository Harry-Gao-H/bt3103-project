<template>
<div id="product">
<button onclick="location.href='/menu'" type="button" id="back">Back</button>
    <div class="flex-col">
        <div class="center" style="color : white" >
            <!--{{cuisine}}-->
            <h2>{{meal}}: {{cuisine[0]}}</h2>
			<p v-for="dish in cuisine[1].dishes" v-bind:key = "dish">
                {{dish}}
            </p>
            <label for="small">I want a smaller proportion</label>
            <input type="checkbox" id="small" v-model="smallProportionOption"> 
            
            {{smallProportionOption}}
            <br>

            <label for="model">Select Quantity:</label>
            <select class="form-control" name="model" id="model" v-model="model">
            <option v-for="option in quantity_options" v-bind:value="option.id" v-bind:key="option.id">{{option.text}}</option>
            </select>

            <br>
            <button id="addCart" v-on:click="displayMessage()">Add to Cart</button> 
        </div>
        
        <!--
        <img class = "left" src="https://cdn.kuali.com/wp-content/uploads/2004/08/21143457/hainanese-chicken-rice-830x536.jpg">
        <div class = "right">
            <h1>Chicken Rice</h1>

            <p>Calories: 25cal <br>
            Diet: Normal diet
            </p>

            <strong style="margin-bottom:3%">Reduce Food Waste<br></strong>
            <input type="checkbox" id="noVeg" name="remark" value="noVeg"> 
            <label for="noVeg">I do not want vegetable</label>
            <br>
            <input type="checkbox" id="noSauce" name="remark" value="noSauce"> 
            <label for="noSauce">I do not want extra-packed sauce</label>
            <br>
            <input type="checkbox" id="small" name="remark" value="small"> 
            <label for="small">I want a smaller proportion</label>
            <br> 
            
            <p>Date & time selected: 24 Feb 2021 17:30 <br> <b>You selected Takeaway</b> </p>
         
            <div class="form-group">
                <label for="model">Select Quantity:</label>
                <select class="form-control" name="model" id="model" v-model="model">
                <option v-for="option in quantity_options" v-bind:value="option.id" v-bind:key="option.id">{{option.text}}</option>
                </select>
            </div>
  
            <p>Your Credit: 20</p>
            <button id="addCart" v-on:click="displayMessage()">Add to Cart</button> 
            
        </div>
        -->
    </div>
</div>
</template>


<script>
export default {
    name: 'product',
    data () {
        return {
            selectedDate: '',
            meal:"",
            cuisine:[],
            quantity:0,
            smallProportionOption:"",
            time:"",

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
    },
    methods: {
        displayMessage: function() {
            alert("Add successfully")
            this.$router.push("/menu")
        }
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