<template>
    
  <div>
  <head>
    <title> This is the Staff Login Page </title>
  </head>
  
  <div class="content">
    
    <h1 id = "login"> LOGIN </h1>
    <h2 id = "staff"> STAFF </h2>
    
    <div class = "details">
      <form v-on:submit.prevent="submit()">
      <input type = "text" name = "username" placeholder = "USERNAME" v-model.trim.lazy ="username" required> <br><br>
      <input type = "password" name = "password" placeholder = "PASSWORD" v-model.lazy="password" required> <br><br>

         <button style="color:black" type = "submit" value = "Login"> Login </button>
      
      <p> <a href = "#"> Forgot Password </a> </p>
      
      </form>
    </div>

    
</div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      username:"",
      password:""
    }
  },
  methods: {
    submit:function() {
      this.$router.push("/orders-overview")
    }
  }
}
</script>


<style scope>


#staff {
  position: relative;
  text-align: center;
  font-family: Sans-serif;
   margin-bottom:20px;
}

.details{
  position: relative;
  text-align: center;
}

input[type = text]{
  position: relative;
  text-align: center;
  margin: auto;
  width: 15%;
  height: 40px;
  color: #fff;
  font-size:18px;
  border-style: solid;
  border-width: 3px;
}

input[type = password]{
  position: relative;
  text-align: center;
  margin: auto;
  width: 15%;
  height: 40px;
  color: #fff;
  font-size:18px;
  border-style: solid;
  border-width: 3px;
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

a {
  color: #fff
}

</style>
