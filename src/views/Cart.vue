<template>
    
    <div>
        <button onclick="location.href='/menu'" type="button" id="back">Back</button>
        <h1>Your Cart</h1>
        <h4>Your RC/Hall</h4>
        <div id="content">
        <table>
            <tr>
                <th>Dishes</th>
                <th>Time</th>
                <th>Quantity</th>
                <th>Type</th>
            </tr>
                
            <tr v-for="item in itemsBooked" v-bind:key="item[0]">
                <td>{{item[0]}} <button v-on:click="remove(item)">remove</button></td>
                <td>{{item[1]}}</td>
                <td><button v-on:click="decrease">-</button> {{item[2]}} <button v-on:click="increase">+</button></td>
                <td>{{item[3]}}</td>
            </tr>

        </table>
            
        </div>
        <p>Your Credit: {{credit}}   Credit needed: {{creditCount()}}</p>
        <button v-on:click="displayMessage()" > Confirm Order</button>
    </div>

</template>

<script>
export default {
    name: 'Cart',
    data() {
        return {
            itemsBooked : [["Chicken rice", "24 Feb 2021 17:30", 1, "Take-away"] ],
            creditCounter : 0,
            credit: 20
        }
    },
    props: {
        //itemsBooked: Array
    },
    methods: {
        remove:function(item){
            for(let i = 0; i < this.itemsBooked.length;i++) {
                if (item == this.itemsBooked[i]) {
                    this.itemsBooked.splice(i, 1)
                }
            }
        },
        creditCount:function(){
            var counter = 0; 
            for(let i = 0; i < this.itemsBooked.length;i++) {
                counter+=this.itemsBooked[i][2];
            }
            this.creditCounter = counter;
            return counter;
        },
        displayMessage:function(){
            this.itemsBooked = []
            this.credit -= this.creditCounter
            alert("Your order has been confirmed!")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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


#back {
    position: absolute;
    left: 10%;
    top: 30px;
    text-align: left;
    font-size: 90%;
    font-weight: bold;
    padding: 0.9%
}
</style>
