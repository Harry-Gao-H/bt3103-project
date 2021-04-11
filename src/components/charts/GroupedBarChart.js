import {Bar} from 'vue-chartjs' 

import database from '../../firebase.js'
//import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"
//import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';


export default {
  extends: Bar,

  components: {
		//ChartJSPluginDataLabels,

	},

  data: function () {
    return {
        datacollection: {
            results:[],
            labels: [],
            datasets: [
              {
                label: "Total Orders", 
                backgroundColor: ["#25668e", "#634171","#2c8773","#873f2c"],
                data: [],
                //hidden:true,
              }, //35, 80

              {
                label: "Total orders with smaller portion", 
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#c15b3e"],
                data: [0,0,0,0]
              },
              {
                label: "Total orders without smaller portion", 
                backgroundColor: ['#aed3ea','#d2beda','#b2e6db','#e8c3b9',
                ],
                data: [0,0,0,0]
              },

            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: false,
              text: 'Total Number of each cuisine'
            },
            responsive: true,
            maintainAspectRatio: false,
        //     scales: {
        //       yAxes: [{
        //         stacked: true,
        //         ticks: {
        //           beginAtZero: true
        //         }
        //       }],
        //       xAxes: [{
        //         stacked: true,
        //         ticks: {
        //           beginAtZero: true
        //         }
        //       }]
        // }

        scales:{
          yAxes:[{
              ticks:{
                  min:0,
                  precision:0
              },
              //stacked:true
           }],
           xAxes: [{
                    // stacked: true,
                    ticks: {
                      beginAtZero: true
                    }
                  }]
      },

      tooltips: {
        mode: 'index',
      },

      plugins: {
        labels: {
          render: 'percentage',
          
        }
      }

      }
    }
  },


  methods: {


    clearData:function() {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      this.datacollection.datasets[1].data = [0,0,0,0]
      this.datacollection.datasets[2].data = [0,0,0,0]

      this.renderChart(this.datacollection, this.options)
    },


    // updateData:function(date, meal) {
    //   this.datacollection.labels = []
    //   this.datacollection.datasets[0].data = []
    //   this.datacollection.datasets[1].data = []

    //   database.collection('Order_test').doc(date)
    //   .collection(meal).get().then(snapshot => {
    //     snapshot.docs.forEach(doc => { 

    //       for (var dish in doc.data()) {
    //         if (dish == "cuisine") {
    //           if(!this.datacollection.labels.includes(doc.data()["cuisine"])) {
    //             this.datacollection.labels.push(doc.data()["cuisine"])
    //            }
    //         }
    //       }
    //     })
    //   })

    //   database.collection('Order_test').doc(date)
    //   .collection(meal).get().then(snapshot => {
    //     snapshot.docs.forEach(doc => { 
    //       // console.log(this.datacollection.labels)

    //       for (var item in doc.data()) {
    //         if (item == "smallerPortion") {
    //           if (doc.data()["smallerPortion"]) {
    //             console.log(doc.data())
    //             console.log(doc.data()["quantity"])
    //             var index = this.datacollection.labels.indexOf(doc.data()["cuisine"])
    //             this.datacollection.datasets[0].data[index]+= (doc.data()["quantity"])


    //           } else if (!doc.data()["smallerPortion"]) {
    //             var index2 = this.datacollection.labels.indexOf(doc.data()["cuisine"])

    //             this.datacollection.datasets[1].data[index2]+= (doc.data()["quantity"])
    //             // console.log(this.datacollection.datasets[1].data)

    //           }
              
    //         }
    //       }
    //     })
    //     this.renderChart(this.datacollection, this.options)
    //   })
    // },

               
    updateData:function(date, meal) {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      this.datacollection.datasets[1].data = [0,0,0,0]
      this.datacollection.datasets[2].data = [0,0,0,0]

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
      })

      database.collection('Order_test').doc(date)
      .collection(meal).get().then(snapshot => {
        snapshot.docs.forEach(doc => { 

          for (var item in doc.data()) {
            // console.log(item+"hi")
            if (item == "smallerPortion") {
              if (doc.data()["smallerPortion"]) {

                if(this.datacollection.labels.includes(doc.data()["cuisine"])) {
  
                  var index = this.datacollection.labels.indexOf(doc.data()["cuisine"])

                  // this.datacollection.datasets[1].data.splice(index, 0, doc.data()["quantity"])
                  this.datacollection.datasets[1].data[index]+=(doc.data()["quantity"]) 
                  console.log(this.datacollection.datasets[1].data)
                 } 
              } 
              if (!doc.data()["smallerPortion"]) {
                 if(this.datacollection.labels.includes(doc.data()["cuisine"])) {
  
                  var index2 = this.datacollection.labels.indexOf(doc.data()["cuisine"])

                  // this.datacollection.datasets[1].data.splice(index, 0, doc.data()["quantity"])
                  this.datacollection.datasets[2].data[index2]+=(doc.data()["quantity"]) 
                  console.log(this.datacollection.datasets[2].data)
                 } 
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