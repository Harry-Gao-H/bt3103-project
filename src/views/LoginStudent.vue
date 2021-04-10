<template>

  <div id = "login-page">
    <head>
      <title> This is the Student Login Page </title>
    </head>

    <body>
    
    <div class = "login-content">
      <input type="radio" name="tab" id="signin" checked="checked"/>
      <input type="radio" name="tab" id="register"/>

      <div class = "pages">

        <!-- Student login page -->
        <div class="page">
          <form v-on:submit.prevent="login()">
          <img src="../assets/foodchop.png" class="logo">
          <br>
          <br>
          <h2 id = "heading"> NUS FoodChope Student Login </h2>
          <p id = "description"> Enter your NUSNET ID to begin <p>
            <br>

            <!-- Username -->
            <div class = "input">

              <div class = "title"> USERNAME </div>
                    <input class = "text" type = "text" name = "username" placeholder = "NUSNET ID" v-model.trim.lazy = "nusnet" required>
            </div>

            <!-- Password -->
            <div class = "input">
              <div class = "title"> PASSWORD </div>
                <input class = "text" type = "password" name = "password" placeholder = "Password" v-model.lazy="password" required>
            </div>

            <!-- Submit Button -->
            <div class = "input">
              <input type="submit" value="LOGIN"/>
              <br>
              <br>
              <br>
            </div>
            </form>
            </div>

      </div>

      <div class="tabs">
          <label class="tab" for="link-to-student">
            <div class="text"> Not a Staff? Login as a Student instead </div>
          </label>
          <label class="tab" for="link-to-staff">
            <div class="text">
              <p><a href = "/login-staff"> Not a Student? Login as a Staff instead </a></p>
              <p class = "reset"> <a href = "#"> Forgot Password </a></p>
              </div>
          </label>
          
    </div>
    </div>
    </body>
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
  body {
    color: white;
    font-family:  sans-serif;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-content {
    min-height: 500px;
    text-align: center;
    width: 20%;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #e9e9e9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: hi 0.5s;
    transform: translateZ(0px);
}

.login-content * {
    box-sizing: border-box;
}

.title {
  text-align: left;
  font-weight: bold;

}

.pages {
    flex: 1;
    white-space: nowrap;
    position: relative;
    transition: all 0.4s;
    display: flex;
    padding-top: 20px;
    
}

.pages .page {
    min-width: 100%;
    padding: 20px 15px 0;
    padding-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logo{
    width: 95px;
    height: 90px;
    align-items: center;

}

#heading{
    margin-bottom: 0;
    color: #333333;
}

#description{
    color: black;
    margin-top: 10px;
    font-size: 18px;
}

.pages .page:nth-of-type(1) .input {
    transform: translateX(-100%) scale(0.5);
}
.pages .page:nth-of-type(2) .input {
    transform: translateX(100%) scale(0.5);
}
.pages .page .input {
    transition: all 1s;
    opacity: 0;
    transition-delay: 0s;
}

.pages .page .title {
    margin-bottom: 10px;
    font-size: 14px;
    position: relative;
    line-height: 14px;
}
.pages .page .input {
    width: 100%;
    margin-top: 20px;
    padding: 0 30px;
}
.pages .page input.text {
    background: #f6f7f9;
    border: none;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0px 10px;
    color: rgba(0, 0, 0, 0.5);
    outline: none;
}
.pages .page input[type=submit] {
    background: #E60023;
    color: #f6f7f9;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border: none;
    border-radius: 4px;
    font-weight: 600;
}
.tabs {
    max-height: 50px;
    height: 50px;
    display: flex;
    background: #fff;
    
}
.tabs .tab {
    flex: 1;
    color: #5d708a;
    text-align: center;
    line-height: 30px;
    transition: all 0.2s;
}
.tabs .tab .text {
    font-size: 14px;
    transform: scale(1);
    transition: all 0.2s;
    cursor: pointer;
    margin-top: -20px;
}

.tabs .tab .text:hover {
   text-decoration: underline;
}
input[type=radio] {
    display: none;
}
input[type=radio]:nth-of-type(1):checked ~ .tabs .tab:nth-of-type(1) {
    display: none;
    color: #3f4c7f;
}
input[type=radio]:nth-of-type(1):checked ~ .tabs .tab:nth-of-type(1) .text {
    transform: scale(0.9);
}
input[type=radio]:nth-of-type(1):checked ~ .pages {
    transform: translateX(0%);
}
input[type=radio]:nth-of-type(1):checked ~ .pages .page:nth-of-type(1) .input {
    opacity: 1;
    transform: translateX(0%);
    transition: all 0.5s;
}
input[type=radio]:nth-of-type(1):checked ~ .pages .page:nth-of-type(1) .input:nth-child(1) {
    transition-delay: 0.2s;
}
input[type=radio]:nth-of-type(1):checked ~ .pages .page:nth-of-type(1) .input:nth-child(2) {
    transition-delay: 0.4s;
}
input[type=radio]:nth-of-type(1):checked ~ .pages .page:nth-of-type(1) .input:nth-child(3) {
    transition-delay: 0.6s;
}
input[type=radio]:nth-of-type(1):checked ~ .pages .page:nth-of-type(1) .input:nth-child(4) {
    transition-delay: 0.8s;
}
input[type=radio]:nth-of-type(1):checked ~ .pages .page:nth-of-type(1) .input:nth-child(5) {
    transition-delay: 1s;
}
input[type=radio]:nth-of-type(2):checked ~ .tabs .tab:nth-of-type(2) {
    display: none;
    color: #3f4c7f;
}
input[type=radio]:nth-of-type(2):checked ~ .tabs .tab:nth-of-type(2) .text {
    transform: scale(0.9);
}
input[type=radio]:nth-of-type(2):checked ~ .pages {
    transform: translateX(-100%);
}
input[type=radio]:nth-of-type(2):checked ~ .pages .page:nth-of-type(2) .input {
    opacity: 1;
    transform: translateX(0%);
    transition: all 0.5s;
}
input[type=radio]:nth-of-type(2):checked ~ .pages .page:nth-of-type(2) .input:nth-child(1) {
    transition-delay: 0.2s;
}
input[type=radio]:nth-of-type(2):checked ~ .pages .page:nth-of-type(2) .input:nth-child(2) {
    transition-delay: 0.4s;
}
input[type=radio]:nth-of-type(2):checked ~ .pages .page:nth-of-type(2) .input:nth-child(3) {
    transition-delay: 0.6s;
}
input[type=radio]:nth-of-type(2):checked ~ .pages .page:nth-of-type(2) .input:nth-child(4) {
    transition-delay: 0.8s;
}
input[type=radio]:nth-of-type(2):checked ~ .pages .page:nth-of-type(2) .input:nth-child(5) {
    transition-delay: 1s;
}

@keyframes hi {
    from {
        transform: translateY(50%) scale(0, 0);
        opacity: 0;
   }
}

/*
#login-page{
  background-color: white;
  width: 100%;
  height: 100vh;
  padding-top: 20px;
}
*/

</style>






    