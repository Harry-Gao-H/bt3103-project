<template>
  <div id="app">
      <header>
    <h1 id="title"> <img alt="NUS FoodChope logo" src="./assets/foodchop.png">
      NUS FoodChope 
    </h1>
  </header>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Oswald', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-shadow: 3px 4px rgba(black, .1);
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
  
}

img {
    height:60px;
    width:65px;
}

header {
  background-color:gold;
  text-align: center;
  color: navy;
  border:none;
  padding:2px;
  font-family: Oswald, Avenir, Helvetica, Arial, sans-serif;
  text-shadow: 3px 4px rgba(black, .1);
}

h1 {
  font-family: Oswald, Avenir, Helvetica, Arial, sans-serif;
  font-size:50px;
  text-shadow: 3px 4px grey;
}


</style>