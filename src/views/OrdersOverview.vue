<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li class="navbarstyle" v-on:click="logout()">Logout</li>
  </ul>
</div>

<div id="content">
   <PageContentStaff v-bind:itemsList="itemsListProps"></PageContentStaff>
</div>
</div>
</template>

<script>
import PageContentStaff from '@/components/PageContentStaff.vue'
import database from "../firebase.js"
import firebase from "firebase"

export default {
  components: {
    PageContentStaff

  },
  data() {
    return {
    }
    
  },
  methods: {
    fetchItems:function() {
      database.collection("Menu").doc("14-4-2021")
        .collection("Breakfast").get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.items.push(doc.data())
          })
        })
    },
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

#content {
  width: 100%;
  background-color: #f1f1f1;
}

.navbarstyle {
  text-decoration:none;
  color:#fff;
  text-transform:uppercase;
}

</style>
