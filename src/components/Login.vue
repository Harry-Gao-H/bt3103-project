<template>
    
    <div class="content">
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
button{
    width:200px;
    padding:15px 0;
    text-align:center;
    margin:20px 10px;
    border-radius:25px;
    font-weight:bold;
    border:2px solid #009688;
    background:transparent;
    color:rgb(22, 20, 20);
    cursor:pointer;
    font-size:20px;
    background-color: #f7f2e1;
    
}

</style>
