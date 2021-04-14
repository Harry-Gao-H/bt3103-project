import {Pie} from 'vue-chartjs' 
import database from '../../firebase.js'

export default {
  extends: Pie,

  data: function () {
    return {
        datacollection: {
            results:[],
            labels: [],
            datasets: [
                {
                label: "Total orders", 
                // backgroundColor: ['rgba(255, 99, 132, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // ],
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#c15b3e"],

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
              text: 'Total orders'
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              labels: {
                render: 'percentage',
                precision: 2
                
              }
            }
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

    clearData:function() {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      this.renderChart(this.datacollection, this.options)
    },
    

    updateData:function(date, meal) {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      database.collection('Order').doc(date)
      .collection(meal).get().then(snapshot => {
        snapshot.docs.forEach(doc => { 

// console.log(doc.data().orders)

          for (var index in doc.data().orders) {
            // console.log(doc.data().orders[index])

            for (var order in doc.data().orders[index]) { // {array of orders} {quantity:1, cuisine:Array(2)}
              // console.log(order) // quantity, date, small, cuisine
              // console.log(doc.data().orders[index][order]) // values for above console.log
                                                          // (2) ["Asian", {...}]

              if (order == "cuisine") {
                // console.log(doc.data().orders[index][order])

                for (var i in doc.data().orders[index][order]) {
                  // console.log(doc.data().orders[index][order][i])
                  // console.log(typeof doc.data().orders[index][order][i])

                  if (typeof doc.data().orders[index][order][i] == 'string') {
                    if (!this.datacollection.labels.includes(doc.data().orders[index][order][i])) {
                      this.datacollection.labels.push(doc.data().orders[index][order][i])
                      // console.log(this.datacollection.labels)
                      // console.log(doc.data().orders[index]["quantity"])
                      this.datacollection.datasets[0].data.push(doc.data().orders[index]["quantity"])
                    } else {
                      var indexOfCuisine = this.datacollection.labels.indexOf(doc.data().orders[index][order][i]) 
                      this.datacollection.datasets[0].data[indexOfCuisine] += (doc.data().orders[index]["quantity"])
                      }
                    }
                }
              }
              }
            }

          }
          
          // for (var dish in doc.data()) {
          //   // console.log(dish.cuisine)
          //   if (dish == "cuisine") {
          //     if(!this.datacollection.labels.includes(doc.data()["cuisine"])) {
          //       this.datacollection.labels.push(doc.data()["cuisine"])
  
          //       //console.log(this.datacollection.labels)
          //        // this.datacollection.datasets[0].data.push(parseInt(doc.data()["quantity"])) 
          //        this.datacollection.datasets[0].data.push(doc.data()["quantity"]) 
          //       //console.log(this.datacollection.datasets[0].data)
                
          //      } else {
          //       var index = this.datacollection.labels.indexOf(doc.data()["cuisine"])
          //       //console.log(index)
          //       // this.datacollection.datasets[0].data[index] += (parseInt(doc.data()["quantity"]))
          //       this.datacollection.datasets[0].data[index] += (doc.data()["quantity"])
          //     }
               
          //   }

          // }

        )
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