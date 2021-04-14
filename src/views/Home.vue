<template>
  <div class="home">
    
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import firebase from 'firebase'


export default {
  name: 'Home',
  components: {
    Login
  },
  
  created() {
    if (firebase.auth().currentUser == null){
      console.log("No user login now ")
    } else {
      console.log(firebase.auth().currentUser.email)
    }

    
  }
  
}
</script>
