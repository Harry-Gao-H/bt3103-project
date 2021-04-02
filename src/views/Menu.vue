<template>
<div>

   <PageContent v-bind:itemsList="itemsListProps"></PageContent>
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
            "https://delishar.com/wp-content/uploads/2016/04/Dry-Beef-Hor-Fun-3.jpg",
    
        },
        {
          id: "#067",
          name: "Sambal KangKung",
          imageURL:
            "https://minikitchenlab.com/wp-content/uploads/2017/09/Kangkung-Belacan-e1506580822679-1300x1300.jpg",
          show: false,
      
        },
        {
          id: "#077",
          name: "Pork Fried Rice",
          imageURL:
            "https://hazeldiary.com/wp-content/uploads/2020/08/King-of-Fried-Rice-Golden-Mile-Tower-XO-Fried-Rice.jpg",
          show: false,
  
        },
        {
          id: "#099",
          name: "Mapo Tofu",
          imageURL:
            "https://i2.wp.com/seonkyounglongest.com/wp-content/uploads/2020/09/Mapo-Tofu-12-minijpg.jpg?fit=1000%2C1500&ssl=1",
          show: false,
  
        },
        {
          id: "#200",
          name: "Cereal Prawn",
          imageURL:
            "https://i.pinimg.com/originals/ad/87/eb/ad87eb2113e4d6480a21acdbb5f36114.jpg",
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


h1{
    color:ivory
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navigationBar {
  float:right;
}

#dateDropdown {
  float:left;
  margin-top:250px;
  margin-left:25px;
  background-color:lightblue;
}

#mealDropdown {
  float:left;
  margin-top:250px;
  margin-left:50px;
  background-color:lightblue;
}


</style>
