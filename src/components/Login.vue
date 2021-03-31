<template>
    
    <div>
  <head>
    <title> This is the Login Page </title>
  </head>
  
  <body>
    
    <h1 id = "login"> LOGIN </h1>
    <br>

    <button class = "button" > <router-link to="/login-staff">Staff</router-link> </button>

    <br>
    <br>
    
    <button class = "button"> <router-link to="/login-student">Student</router-link> </button>
    
  </body>

  </div>
</template>


<style scoped>
#login {
  position: relative;
  top: 20px;
  text-align: center;
  color: #3895D3;
  font-family: verdana;
  font-size: 60px;
}


.button{
  display: block;
  background-color: #f7f2e1;
  text-align: center;
  width: 200px;
  height: 40px;
  font-size: 20px;
  margin: 0 auto;
  
}

</style>
