<template>

<div>

    <div id="content">
        <div id = "profile">
            <ul>
            <li> 
              <center><DateTimeSelection></DateTimeSelection></center>
              <br>
            </li>
            </ul>
        </div>
    </div>
        
</div> 
 
</template>


<script>
import DateTimeSelection from './DateTimeSelection.vue'


export default {
  components: {
    'DateTimeSelection':DateTimeSelection,
  },

  
}
</script>

<style scoped>

#content {
  width: 100%;
  background-color: #f1f1f1;
}
img{
  height:50px;
  width:50px;
}

</style>