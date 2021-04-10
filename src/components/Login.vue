<template>

  <div id = "login-page">
    <head>
      <title> This is the Main Login Page </title>
    </head>

    <body>
    
    <div class = "login-content">

      <div class = "pages">
          
        <div class="page">
          <img src="../assets/foodchop.png" class="logo">
          <br>
          <br>
          <h2 id = "heading"> Welcome To NUS FoodChope </h2>
          <p id = "description"> Hostel Dining Made Easy </p>

            <div class = "staff">
              <button class = "button" > <router-link to="/login-staff">Staff</router-link> </button>

              </div>

<div class = "student">
               <button class = "button"> <router-link to="/login-student">Student</router-link> </button>

              </div>
              </div>
    </div>
    </div>
    </body>
  </div>

 
  </template>


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


#description{
    color: black;
    margin-top: 10px;
    font-size: 18px;
}

.button{
  text-align: center;
    background-color: #f6f7f9;
    font-size: 19px;
    cursor: pointer;
    line-height: 18px;
    border: 1px solid black;
    border-radius: 4px;

}


</style>






    