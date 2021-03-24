<template>
  <div id="dropdown">
	<form>
		<div>
			<p>Are you planning to Dine-in or Takeaway?</p>
			<input type="radio" class="radio" id="dining" name="dinOrTake"> 
			<label for="dining" class="radio">Dine-in</label> 
			<input type="radio" class="radio" id="takeaway" name="dinOrTake"> 
			<label for="takeaway" class="radio">Takeaway</label>

			<label for="meal">Choose your preferred date and time:</label>
			<input id="meal" type="datetime-local" name="meal" min="2021-02-20T17:30" max="2021-03-05T21:30" required>
			<span class="validity"></span>
		</div>
	</form>
	<small>Dining hours are 1730pm to 22pm</small>

  </div>

	

</template>

<script>

export default {

	data () {
		return {
			selectedDate: '',
			
		}
	}
	
}


</script>


<style scoped>
#dropdown {
font-family: Avenir, Helvetica, Arial, sans-serif;

}
label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
}

input,
label {
    margin: .4rem 0;
}

.radio { 
	display: inline;
	padding: 10px;
}

</style>