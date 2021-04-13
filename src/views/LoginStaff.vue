<template>

  <div id = "login-page">
    <head>
      <title> This is the Main Login Page </title>
    </head>

    <body>


    <div class = "split left">
    <input type="radio" name="tab" id="signin" checked="checked"/>
    <input type="radio" name="tab" id="register"/>

      <div class = "centered-left">
          
        <form v-on:submit.prevent="login()">
          <div class="loadingio-spinner-eclipse-uoxpvuq5zt"><div class="ldio-z1piwl5e5pi">
              <div></div>
              </div></div>
          <br>
          <br>
          <h2 id = "heading"> Staff Login </h2>
          <p id = "description">  Enter your Staff ID to begin <p>

            <!-- Username -->
            <div class = "input">

              <div class = "title"> </div>
                    <input class = "text" type = "text" name = "username"  placeholder = "STAFF ID" v-model.trim.lazy = "username" required>
            </div>

            <!-- Password -->
            <div class = "input">
              <div class = "title">  </div>
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

             <div class="tabs">
          
          
          <label class="tab" for="link-to-student">
            <div class="text">
              <p><a href = "/login-student"> Not a Staff? Login as a Student instead </a></p>
              <p> <a href = "#"> Forgot Password </a></p>
              </div>
          </label>
          
    </div>
    </div>

    <div class = "split right">
      <div class = "centered-right">
        <!-- Gif placement -->
        <div class="loadingio-spinner-pulse-2y3o1uqx1kt"><div class="ldio-hv4tq3e0s57">
          <div></div><div></div><div></div>
          </div></div>
        <h1> NUS FoodChope </h1>

        <h2> Hostel Dining Made Easy </h2>

        <p> NUS FoodChope is an online platform developed to simplify the takeout process for all NUS hostel residents. 
          Try out this hassle-free food ordering system today! </p>
      </div>
        
        
      </div>
    </div>


    </body>
  </div>

 
</template>

<script>
import firebase from "firebase"
import database from "../firebase.js"

export default {

  data() {
    return {
      username:"",
      password:""
    }
  },
  methods: {
    submit:function() {
      
    },
    login:function() {
      var email = this.username + "@u.nus.edu"
      var account = database.collection("UserInfo").doc(email)
      
      account.get().then((doc) => {
        if (!doc.exists) {
          alert("The account does not exist")
          return 
        } else if (doc.data().role != "staff") {
            alert("You need to login as a student")
            return 
        } else {
          firebase
          .auth()
          .signInWithEmailAndPassword(email, this.password)
          .then(() => {
            alert('Successfully logged in');
            this.$router.push("/orders-overview")
          })
          .catch(() => {
            alert("Wrong Password");
          });
        }
    
      })
      
    },
  }
}
</script>


<style scoped>

body {
  font-family: Arial;
  color: white;
}

/* CSS left side */

.split .centered-left .title {
    width: 100%;
    margin-top: 20px;
    padding: 0 30px;
    
    font-size: 20px;
    text-align: left;
    
}

.split .centered-left .input {
    width: 100%;
    margin-top: 20px;
    padding: 0 30px;
    
}
::placeholder { 
  color: black;
  
}

.split .centered-left input.text {
    outline: 0;
    border-width: 0 0 2px;
    border-bottom: 1px solid #1890ff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0px 10px;
    
   
}
.split .centered-left input[type=submit] {
    color: #f6f7f9;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border: 2px solid black;
    border-radius: 4px;
    font-weight: 600;
    
}

.split .centered-left input[type=submit]:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);

}

.tabs {
    max-height: 50px;
    height: 50px;
    display: flex;
    background: rgb(144, 165, 187);
    
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


.logo-login {
  width: 100%;
}

/* Setting font for right-side */
h1 { 
  color: #f1eeee;
  font-family: 'Raleway',sans-serif;
  font-size: 60px;
  font-weight: 800;
  line-height: 72px;
  margin: 0 0 24px;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 2px 2px lightslategray;
  }

h2 { 
  color: #ffffff;
  font-family: 'Raleway',sans-serif;
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 24px;
  text-align: center;
  text-shadow: 1px 1px lightslategray;
  }

p { 
  color: #f8f8f8;
  font-family: 'Raleway',sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
  margin: 0 0 24px; 
  }

.split {
  height: 100%;
  width: 70%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.left {
  left: 0;
  background-color: rgb(144, 165, 187);
  
}

.right {
  right: 0;
  background-image:linear-gradient(to bottom,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url(../assets/styles/background2.jpg);
  background-size: cover;
  
}

.centered-left {
  position: absolute;
  top: 50%;
  left: 22%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.centered-right {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.centered img {
  width: 150px;
  border-radius: 50%;
}

.button{
  text-align: center;
  background-color: none;
  font-size: 19px;
  cursor: pointer;
  line-height: 12px;
  border: 1px solid black;
  border-radius: 4px;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}



/* right Gif CSS */

@keyframes ldio-hv4tq3e0s57-1 {
  0% { top: 36px; height: 128px }
  50% { top: 60px; height: 80px }
  100% { top: 60px; height: 80px }
}
@keyframes ldio-hv4tq3e0s57-2 {
  0% { top: 41.99999999999999px; height: 116.00000000000001px }
  50% { top: 60px; height: 80px }
  100% { top: 60px; height: 80px }
}
@keyframes ldio-hv4tq3e0s57-3 {
  0% { top: 48px; height: 104px }
  50% { top: 60px; height: 80px }
  100% { top: 60px; height: 80px }
}
.ldio-hv4tq3e0s57 div { position: absolute; width: 30px }.ldio-hv4tq3e0s57 div:nth-child(1) {
  left: 35px;
  background: #e15b64;
  animation: ldio-hv4tq3e0s57-1 1s cubic-bezier(0,0.5,0.5,1) infinite;
  animation-delay: -0.2s
}
.ldio-hv4tq3e0s57 div:nth-child(2) {
  left: 85px;
  background: #f8b26a;
  animation: ldio-hv4tq3e0s57-2 1s cubic-bezier(0,0.5,0.5,1) infinite;
  animation-delay: -0.1s
}
.ldio-hv4tq3e0s57 div:nth-child(3) {
  left: 135px;
  background: #abbd81;
  animation: ldio-hv4tq3e0s57-3 1s cubic-bezier(0,0.5,0.5,1) infinite;
  animation-delay: undefineds
}

.loadingio-spinner-pulse-2y3o1uqx1kt {
  width: 180px;
  height: 170px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-hv4tq3e0s57 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-hv4tq3e0s57 div {
   box-sizing: content-box;
    }
/* generated by https://loading.io/ */

/* left gif */

@keyframes ldio-z1piwl5e5pi {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
}
.ldio-z1piwl5e5pi div {
  position: absolute;
  animation: ldio-z1piwl5e5pi 1s linear infinite;
  width: 80px;
  height: 80px;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 0 0 #fbbc42;
  transform-origin: 40px 41px;
}
.loadingio-spinner-eclipse-uoxpvuq5zt {
  width: 61px;
  height: 61px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-z1piwl5e5pi {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.61);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-z1piwl5e5pi div { box-sizing: content-box; }
/* generated by https://loading.io/ */



</style>






    