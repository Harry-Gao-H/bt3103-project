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
                label: "TOTAL ORDERS", 
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [],
                hidden:true,
              },

              {
                label: "Total orders WITH smaller portion for each cuisine", 
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [0,0,0,0]
              },
              {
                label: "Total orders WITHOUT smaller portion for each cuisine", 
                backgroundColor: ['#ff6384',
                '#36a2eb',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                ],
                data: [0,0,0,0]
              },

            ]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
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
                  min:0
              },
              stacked:true
           }],
           xAxes: [{
                    stacked: true,
                    ticks: {
                      beginAtZero: true
                    }
                  }]
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