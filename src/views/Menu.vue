<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/cart">Cart</router-link></li>
      <li><router-link to="/history">History</router-link></li>
      <li class="navbarstyle" v-on:click="logout()">Logout</li>
  </ul>
</div>

<div id="content">
   <PageContent></PageContent>
</div>
</div>
</template>

<script>
import PageContent from '@/components/PageContent.vue'
//import database from "../firebase.js"
import firebase from "firebase"

export default {
  components: {
    PageContent

  },
  data() {
    return {
      title:'Your first Vue Component',
      
      items: []
    }
    
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          this.$router.push('/');
        })
        .catch(error => {
          alert(error.message);
          this.$router.push('/');
        });
    },
  }
  

}
</script>

<style scoped>

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}


</style>
