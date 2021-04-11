import {Bar} from 'vue-chartjs' 

import database from '../../firebase.js'


export default {
  extends: Bar,
//   props:{
//     itemsProps: {
//         type: Array
//     } 
// },
  data: function () {
    return {
        datacollection: {
            results:[],
            labels: [],
            datasets: [
                {
                label: "Total orders", 
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#c15b3e"],
                data: []
              }
            ]
        },
        options: {
            legend: { display: false },
            title: {
              display: false,
              text: "Total orders for each cuisine",
              size:16,
            },
            responsive: true,
            maintainAspectRatio: false,
            scales : {
              yAxes: [{
                  ticks : {
                      beginAtZero : true, 
                      precision: 0
                  }
              }]
          }
        }
    }
  },


  methods: {

    // fetchItems: function () {
    //   database.collection('Order_test').doc('14-4-2021')
    //   .collection('Breakfast').get().then(snapshot => {
    //     snapshot.docs.forEach(doc => { 

    //       for (var dish in doc.data()) {
    //         console.log("test")
    //         console.log(dish)
    //         if(!this.datacollection.labels.includes(doc.data()["cuisine"])) {
    //           this.datacollection.labels.push(doc.data()["cuisine"])

    //           // this.datacollection.datasets[0].data.push(parseInt(doc.data()["quantity"])) 
    //           this.datacollection.datasets[0].data.push(doc.data()["quantity"]) 
    //          // console.log(this.datacollection.datasets[0].data)
             
    //         } else {
    //           var index = this.datacollection.labels.indexOf(dish)
    //           // this.datacollection.datasets[0].data[index] += (parseInt(doc.data()["quantity"]))
    //           this.datacollection.datasets[0].data[index] += (doc.data()["quantity"])
    //         }
    //       }
      
    //     })
    //     this.renderChart(this.datacollection, this.options)
    //   })
    // },

    clearData:function() {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      this.renderChart(this.datacollection, this.options)
    },


    updateData:function(date, meal) {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      database.collection('Order_test').doc(date)
      .collection(meal).get().then(snapshot => {
        snapshot.docs.forEach(doc => { 

          for (var dish in doc.data()) {
            if (dish == "cuisine") {
              if(!this.datacollection.labels.includes(doc.data()["cuisine"])) {
                this.datacollection.labels.push(doc.data()["cuisine"])

                 this.datacollection.datasets[0].data.push(doc.data()["quantity"]) 
                
               } else {
                var index = this.datacollection.labels.indexOf(doc.data()["cuisine"])

                this.datacollection.datasets[0].data[index] += (doc.data()["quantity"])
               }   
            }
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    },
    

  }, 

 

  created () {
    //console.log(this.itemsProps[0])
    //console.log(this.itemsProps[1])
    //this.fetchItems()
    this.clearData()
  }
}