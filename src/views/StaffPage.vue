<template>
<div>
<div class ="navbar">
 <ul>
                    <li><router-link to="/cart">Dashboard</router-link></li>
                    <li><router-link to="/">Logout</router-link></li>
                    
                </ul>
</div>
<div class="content">
        

 <table>
                        <tr>
                            <th>Time</th>
                            <th>Dishes</th>
                            <th>Quantity</th>
                            <th>Type</th>
                        </tr>
                            
                        <tr v-for="item in itemsList" v-bind:key="item[0]">
                            <td>{{item[1]}}</td>
                            <td>{{item[0]}}</td>
                            <td>{{item[2]}}</td>
                            <td>{{item[3]}}</td>
                        </tr>

                    </table>

                     
 
    </div> 
</div>
</template>


<script>
import database from "../firebase.js"

export default {
   data(){
    return{
        itemsList : [["Chicken rice", "24 Feb 2021 17:30", 20, "Dine in"], ["Chicken rice", "24 Feb 2021 17:30", 30, "Take away"],
           ["Ramen", "24 Feb 2021 17:30", 25, "Dine in"], ["Nasi Lemak", "24 Feb 2021 18:30", 25, "Dine in"]],
        orders : [], //creating data property called orders array []
        }
  },

  methods :{

    // fetchItems:function(){ //fetching orders from database
    //   database.collection('Order').get().then((querySnapShot)=>{
    //     querySnapShot.forEach(doc=>{
    //         console.log(doc.id, "=>", doc.data()); 
    //         })})   
    //     },

        fetchItems:function(){ //fetching orders from database
      database.collection('Order').doc().collection().get().then((querySnapShot)=>{
        querySnapShot.forEach(doc=>{
            console.log(doc.id, "=>", doc.data()); 
            })})   
        },

},
 created(){
      this.fetchItems();   
      },
}
</script>








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

#request {
  font-size: 25px;
  height: 45px;
  background-color: #41b3a3;
}


#itemsList{
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}

img{
  width:150px;
  height: 150px;
}

button{
    font-weight:bold;
    height:40px;
    width:100px;
    font-size:17px;
    margin-left:500px;
}

center{
  display:block;
  margin-left:auto;
  margin-right:auto;
}
</style>