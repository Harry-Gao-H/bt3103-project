<template>

    <div>
        <section>
            <nav>
                <p>
          
                  <br><router-link to="/">Profile</router-link>
                  <br><router-link to="/">Logout</router-link>
                </p>
            </nav>
        
            <div id="content">
                <div id = "profile">
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
        </section>
        
 
    </div> 
<!--<header>
<label> Credits Left: 20</label>
<button>Cart</button>
</header>-->


<!--
<br><br><br><br><br><br>
<ul>
<li>
<DateDropdown></DateDropdown>
</li>
</ul>

<ul>
<li>
<MealAndSectionDropdown v-bind:itemsList="itemsList"></MealAndSectionDropdown>
</li>
</ul>
-->

 
</template>


<script>

export default {
  data() {
      return {
          itemsList : [["Chicken rice", "24 Feb 2021 17:30", 20, "Dine in"], ["Chicken rice", "24 Feb 2021 17:30", 30, "Take away"],
           ["Ramen", "24 Feb 2021 17:30", 25, "Dine in"], ["Nasi Lemak", "24 Feb 2021 18:30", 25, "Dine in"]]
      }
  }

}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Style the header */
header {
  background-color: #3895D3;
  padding: 20px;
  text-align: center;
  color: black;
  line-height: 0.3;
}

#subtitle {
  font-family: Monospace;
  font-size: 25px;
}

#title {
  font-family: "Times New Roman", serif;
  font-size: 50px;
 
}

/* Create two columns that float next to each other */
/*navigation column*/
nav {
  float: left;
  width: 15%;
  background-color: white;
  padding-right: 20px;
  height: 300px;
}

/* Style the paragraph inside the navigation */
nav p {
  text-align: center;
  padding-top: 100px;
  font-size: 25px;
  line-height: 2.5;
}

/* Style the main content column beside navigation*/
#content {
  float: left;
  padding: 35px;
  width: 85%;
  background-color: #f1f1f1;
}

/* Clear floats after the columns */
section:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the footer */
footer {
  background-color: #777;
  padding: 10px;
  text-align: center;
  color: white;
  line-height: 0.5;
}

a:hover {
  color: red;
}

table {
  border: 1px solid black;
  width: 70%;
  margin-left: 80px;
}

td {
  border: 1px solid black;
  text-align: center;
  padding: 15px;
  font-size: 20px;
  line-height: 1.5;
}


th {
  font-size: 22px;
  border: 1px solid black;
  height: 45px;
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
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
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