<template>

<div>

    <div id="content">
        <div id = "profile">
            <ul>
            <li> 
              <center><DateTimeSelectionStaff v-bind:itemsList="itemsList"></DateTimeSelectionStaff></center>
              <br>
            </li>
            </ul>
        </div>
    </div>
        
</div> 
 
</template>


<script>
import DateTimeSelectionStaff from './DateTimeSelectionStaff.vue'


export default {
  props:{
      itemsList:{
          type:Array
      }
  },

  components: {
    'DateTimeSelectionStaff':DateTimeSelectionStaff,
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