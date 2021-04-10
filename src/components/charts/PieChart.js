import {Pie} from 'vue-chartjs' 

import database from '../../firebase.js'



export default {
  extends: Pie,
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
                label: "Total orders for each cuisine", 
                // backgroundColor: ['rgba(255, 99, 132, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // ],
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],

                // borderColor: ['rgba(255, 99, 132, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // ],
                
                data: []
              }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'Total orders for each cuisine'
            },
            responsive: true,
            maintainAspectRatio: false,
          //   scales : {
          //     yAxes: [{
          //         ticks : {
          //             beginAtZero : true 
          //         }
          //     }]
          // }
        }
    }
  },


  methods: {

    // fetchItems: function () {
    //   database.collection('Order_test').doc('14-4-2021')
    //   .collection('Breakfast').get().then(snapshot => {
    //     snapshot.docs.forEach(doc => { 
    //       //console.log(doc.data())

    //       for (var dish in doc.data()) {
    //         //console.log(doc.data()[dish])
    //         //console.log(doc.data().quantity)
    //         //console.log(doc.data()["cuisine"])
    //         if(!this.datacollection.labels.includes(doc.data()["cuisine"])) {
    //           this.datacollection.labels.push(doc.data()["cuisine"])

    //           this.datacollection.datasets[0].data.push(parseInt(doc.data()["quantity"])) 

    //         } else {
    //           var index = this.datacollection.labels.indexOf(dish)
    //           this.datacollection.datasets[0].data[index] += (parseInt(doc.data()["quantity"]))
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
  
                //console.log(this.datacollection.labels)
                 // this.datacollection.datasets[0].data.push(parseInt(doc.data()["quantity"])) 
                 this.datacollection.datasets[0].data.push(doc.data()["quantity"]) 
                //console.log(this.datacollection.datasets[0].data)
                
               } else {
                var index = this.datacollection.labels.indexOf(doc.data()["cuisine"])
                //console.log(index)
                // this.datacollection.datasets[0].data[index] += (parseInt(doc.data()["quantity"]))
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