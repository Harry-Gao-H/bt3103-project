<template>
<div>
  
  <button v-on:click="subTotalVal=true" id="buttonClick">Check Menu</button>

  <div v-show="subTotalVal">
    <ul>
          <li v-for="item in itemsList" v-bind:key="item.name" >

              <h2><router-link to="/product">{{item.name}}</router-link></h2>
              <img v-bind:src="item.imageURL"/>
          </li>
    </ul>
  </div>

  <div v-show ="false">
    <p>Did you Dine-in or Takeaway?</p>
			<input type="radio" class="radio" id="dining" name="dinOrTake"> 
			<label for="dining" class="radio">Dine-in</label> 
			<input type="radio" class="radio" id="takeaway" name="dinOrTake"> 
			<label for="takeaway" class="radio">Takeaway</label>
  </div>
  
</div>
</template>


<script>

export default {
    props:{
        itemsList: {
            type: Array
        } 
    },

  data() {
      return {
          subTotalVal:false,
		}
	}
	
}
</script>



<style scoped>

.radio { 
	display: inline;
	padding: 10px;
}

h1{
    color:ivory
}
h2{
  text-align: center
}
#itemsList{
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
}
ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}
li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}


* {
  --white: white;
  --gradient: linear-gradient(-45deg, #ffa600 0%, #ff5e03 50%);
  --form: #eeefef;
  --border-radius: 4px;
  --form-width: 500px;
  --form-mob-width: 320px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

#buttonClick {
  border-style: solid;
  padding: 7px;
}

button,
label {
  cursor: pointer;
}

label {
  display: block;
}

button,
input,
textarea {
  font-family: inherit;
  font-size: 100%;
  border: none;
}

textarea {
  resize: none;
}

body {
  font: 20px/1.5 sans-serif;
  background: var(--white);
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-top: 20vh;
}

/* FORM
–––––––––––––––––––––––––––––––––––––––––––––––––– */
[type="checkbox"] {
  position: absolute;
  left: -9999px;
}

.feedback-label,
.form {
  position: fixed;
  top: 50%;
  right: 0;
  backface-visibility: hidden;
}

.feedback-label {
  transform-origin: top right;
  transform: rotate(-90deg) translate(50%, -100%);
  /*uncomment this if you want to reverse the order of the characters*/
  /*transform: rotate(90deg) translateX(50%);*/
  z-index: 2;
}

.form {
  width: var(--form-width);
  max-height: 90vh;
  transform: translate(100%, -50%);
  padding: 30px;
  overflow: auto;
  background: var(--form);
  z-index: 1;
}

.feedback-label,
.form,
.form button {
  transition: all 0.35s ease-in-out;
}

.feedback-label,
.form input,
.form textarea,
.form button {
  border-radius: var(--border-radius);
}

.feedback-label,
.form button {
  background: var(--gradient);
  color: var(--white);
}

.feedback-label:hover,
.form button:hover {
  filter: hue-rotate(-45deg);
}

.feedback-label {
  padding: 5px 10px;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

form div:not(:last-child) {
  margin-bottom: 20px;
}

form div:last-child {
  text-align: right;
}

.form input,
.form textarea {
  padding: 0 5px;
  width: 100%;
}

.form button {
  padding: 10px 20px;
  width: 50%;
  max-width: 120px;
}

.form input {
  height: 40px;
}

.form textarea {
  height: 220px;
}

[type="checkbox"]:checked + .feedback-label {
  /*EDGE is buggy with calc + variables + transform - use a hardcoded value instead of variables*/
  transform: rotate(-90deg) translate(50%, calc((var(--form-width) + 100%) * -1)); 
  /*uncomment this if you want to reverse the order of the characters*/
  /*transform: rotate(90deg) translate(50%, var(--form-width));*/
}

[type="checkbox"]:focus + .feedback-label {
  outline: 2px solid rgb(77, 144, 254);
}

[type="checkbox"]:checked ~ .form {
  transform: translate(0, -50%);
}

/* MQ
–––––––––––––––––––––––––––––––––––––––––––––––––– */
@media screen and (max-width: 600px) {
  body {
    font-size: 16px;
  }

  .form {
    padding: 15px;
    width: var(--form-mob-width);
  }

  form div:not(:last-child) {
    margin-bottom: 10px;
  }

  [type="checkbox"]:checked + .feedback-label {
    transform: rotate(-90deg) translate(50%, calc((var(--form-mob-width) + 100%) * -1));
    /*uncomment this if you want to reverse the order of the characters*/
    /*transform: rotate(90deg) translate(50%, var(--form-mob-width));*/
  }
}



</style>