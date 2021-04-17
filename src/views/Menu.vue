<template>
<div>
    <app-navigation-menu v-bind:cart="cart"></app-navigation-menu>
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
import AppNavigationMenu from '@/components/AppNavigationMenu';
import database from "../firebase.js";

export default {
    name: 'home',
    components: {
        MenuHero,
        MenuDetails,
        PageContent,
        AppNavigationMenu,
    },

  data() {
    return {
      title:'Menu Page',
      cart:[]
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
  },
    created() {

        firebase.auth().onAuthStateChanged(user =>  {
        
            if (user) {
                database.collection("UserInfo").doc(user.email).get()
                    .then(snapshot=> {
                        this.cart = snapshot.data().cart
                    })
            }
        })
    },
  
}
</script>

<style scoped>

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}


</style>
