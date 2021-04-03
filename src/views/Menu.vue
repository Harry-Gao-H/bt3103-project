<template>
<div>
<div class ="navbar">
  <ul>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/cart">Cart</router-link></li>
      <li><router-link to="/">Logout</router-link></li>
  </ul>
</div>

<div id="content">
   <PageContent v-bind:itemsList="itemsListProps"></PageContent>
</div>
</div>
</template>

<script>
import PageContent from '@/components/PageContent.vue'
import database from "../firebase.js"


export default {
  components: {
    PageContent

  },
  data() {
    return {
      title:'Your first Vue Component',
      
      items: [],

      itemsListProps: [
        
        {
          id: "#000",
          name: "Prawn omelette",
          imageURL:
            "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
        
        },
        {
          id: "#001",
          name: "Chicken Rice",
          imageURL:
            "https://cdn.kuali.com/wp-content/uploads/2004/08/21143457/hainanese-chicken-rice-830x536.jpg",
        
        },
        {
          id: "#025",
          name: "Dry Beef Hor Fun",
          imageURL:
            "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
    
        },
        {
          id: "#067",
          name: "Sambal KangKung",
          imageURL:
            "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
          show: false,
      
        },
        {
          id: "#077",
          name: "Pork Fried Rice",
          imageURL:
            "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
          show: false,
  
        },
        {
          id: "#099",
          name: "Mapo Tofu",
          imageURL:
            "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
          show: false,
  
        },
        {
          id: "#200",
          name: "Cereal Prawn",
          imageURL:
            "https://3.bp.blogspot.com/-SMxoySoXcK0/T696enjIijI/AAAAAAAACoc/A5bFWd024KY/s1600/IMG_5140.JPG",
          show: false,
        },
      ]
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
    }
  }
  

}
</script>

<style scoped>

#content {
  width: 100%;
  background-color: #f1f1f1;
}

</style>
