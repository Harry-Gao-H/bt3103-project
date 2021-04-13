<template>
  <div class="banner">
            <div class="navbar">
                <img src="./assets/foodchop.png" class="logo">
                <h1 style="color:white">NUS FoodChope</h1>
                <ul>
                    
                </ul>
            </div>

             <router-view/>
        </div>
</template>

<style>
@import './assets/styles/style.css';

#app {
  font-family: 'Oswald', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-shadow: 3px 4px rgba(black, .1);
  color: #2c3e50;
}

h1 {
  font-family: 'Raleway',sans-serif;
  font-size:50px;
  text-shadow: 2px 2px lightslategray;
  font-weight: 700;
  
}


</style>