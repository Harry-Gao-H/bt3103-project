<template>
<div>
 
    <span>
        <menu-hero></menu-hero>
        <menu-details></menu-details>
        <div id="content">
          <PageContent></PageContent>
        </div>
    </span>  


</div>
</template>

<script>
import PageContent from '@/components/PageContent.vue'
//import database from "../firebase.js"
import firebase from "firebase"
import MenuHero from '@/components/MenuHero';
import MenuDetails from '@/components/MenuDetails';

export default {
    name: 'home',
    components: {
        MenuHero,
        MenuDetails,
        PageContent
    },

  data() {
    return {
      title:'Menu Page',
      
      items: []
    }
    
  },
  methods: {
    logout() {
      this.$router.push('/');
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          
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
