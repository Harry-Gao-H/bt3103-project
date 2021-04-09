<template>
    <div>
  <head>
    <title> This is the Student Login Page </title>
  </head>
  
  <div class ="content">
    <h1 id = "login"> LOGIN </h1>
    <h2 id = "student"> STUDENT </h2>
    <div id = "details">
      <form v-on:submit.prevent="login()">
      <input type = "text" placeholder="Your NUSNET" name = "NUSNET" v-model.trim.lazy="nusnet" required> <br><br>
      <input type = "password" placeholder = "Your Password" name = "password" v-model.lazy="password"  required> <br><br>

      <button type = "submit" value = "Login"> Login </button>
      <p> <a href = "#"> Forgot Password </a> </p>
        
      </form>
    </div>

    
  </div>
    </div>
</template>


<script>
import firebase from "firebase"

export default {
  data() {
      return {
        nusnet:"",
        password:"",
      }
  },
  methods: {
    submit:function() {
      this.$router.push("/menu")
    },

    login:function() {
      var email = this.nusnet + "@u.nus.edu"
      firebase
        .auth()
        .signInWithEmailAndPassword(email, this.password)
        .then(() => {
          alert('Successfully logged in');
          this.$router.push('/menu');
        })
        .catch(() => {
          alert("Wrong Password or Account");
        });
    },
  }
}
</script>



<style scoped>

#student {
  position: relative;
  text-align: center;
  font-family: Sans-serif;
  margin-bottom:20px;
}

#details{
  position: relative;
  text-align: center;
}

input[type = text]{
  position: relative;
  text-align: center;
  margin: auto;
  width: 15%;
  height: 40px;
}

input[type = password]{
  position: relative;
  text-align: center;
  margin: auto;
  width: 15%;
  height: 40px;
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