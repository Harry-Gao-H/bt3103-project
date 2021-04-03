<template>
    <div>
  <head>
    <title> This is the Student Login Page </title>
  </head>
  
  <body>
    
    <h1 id = "login"> LOGIN </h1>
    <h2 id = "student"> STUDENT </h2>
    
    <div id = "details">
      <form v-on:submit.prevent="submit()">
      <input type = "text" name = "username" placeholder = "USERNAME" required> <br><br>
      <input type = "password" name = "password" placeholder = "PASSWORD" required> <br><br>

      <button type = "submit" value = "Login"  > Login </button>
      <p> <a href = "#"> Forgot Password </a> </p>
        
      </form>
    </div>

    
  </body>
    </div>
</template>


<script>
export default {
  methods: {
    submit:function() {
      this.$router.push("/menu")
    }
  }
}
</script>



<style scoped>
#login {
  position: relative;
  top: 20px;
  text-align: center;
  color: #3895D3;
  font-family: verdana;
  font-size: 60px;
}

#student {
  position: relative;
  text-align: center;
  font-family: Sans-serif;
}

#details{
  position: relative;
  text-align: center;
}

input[type = text]{
  position: relative;
  text-align: center;
  margin: auto;
  width: 10%;
  height: 20px;
}

input[type = password]{
  position: relative;
  text-align: center;
  margin: auto;
  width: 10%;
  height: 20px;
}

input[type = submit]{
  display: block;
  background-color: #f7f2e1;
  position: relative;
  text-align: center;
  margin: auto;
  font-size: 15px;
  width: 10%;
  
}
</style >