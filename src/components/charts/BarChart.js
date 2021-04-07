import {Bar} from 'vue-chartjs' // Week 8 - Activity 1 - Step 3

import database from '../../firebase.js'

export default {
  extends: Bar,
  props:{
    itemsProps: {
        type: Array
    } 
},
  data: function () {
    return {
        datacollection: {
            results:[],
            //labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn omlette"],
            labels: [],
            datasets: [
                {
                label: "Orders", // is like the legend, which we dont need
                backgroundColor: ['blue','purple','teal','orange','green','pink'],
                data: []
              }
            ]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales : {
              yAxes: [{
                  ticks : {
                      beginAtZero : true 
                  }
              }]
          }
        }
    }
  },


  methods: {

    // fetchItems: function () {
    //     database.collection('Order_test').doc(this.itemsProps[0])
    //     .collection(this.itemsProps[1]).get().then(snapshot => {
    //       snapshot.docs.forEach(doc => { 

    //         console.log(this.itemsProps[0])
    //         console.log(this.itemsProps[1])
    //         console.log(doc.data())

    //         for (var dish in doc.data().cuisine) {
    //           if(!this.datacollection.labels.includes(dish)) {
    //             this.datacollection.labels.push(dish)

    //             console.log(this.datacollection.labels)

    //             this.datacollection.datasets[0].data.push(parseInt(doc.data().quantity)) 
    //             //this.datacollection.datasets[0].backgroundColor.push('blue')  
    //           } else {
    //             var index = this.datacollection.labels.indexOf(dish)
    //             this.datacollection.datasets[0].data[index] += (parseInt(doc.data().quantity))
    //           }
    //         }
        
    //       })
    //       this.renderChart(this.datacollection, this.options)
    //     })
    //   },
    fetchItems: function () {
      database.collection('Order_test').doc('14-4-2021')
      .collection('Breakfast').get().then(snapshot => {
        snapshot.docs.forEach(doc => { 

          // console.log(this.itemsProps[0])
          // console.log(this.itemsProps[1])
          console.log(doc.data())

          for (var dish in doc.data().cuisine) {
            if(!this.datacollection.labels.includes(dish)) {
              this.datacollection.labels.push(dish)

              //console.log(this.datacollection.labels)

              this.datacollection.datasets[0].data.push(parseInt(doc.data().quantity)) 
              //this.datacollection.datasets[0].backgroundColor.push('blue')  
            } else {
              var index = this.datacollection.labels.indexOf(dish)
              this.datacollection.datasets[0].data[index] += (parseInt(doc.data().quantity))
            }
          }
      
        })
        this.renderChart(this.datacollection, this.options)
      })
    },

      test: function() {
        console.log("testing")
      }
      

  }, 

 

  created () {
    //console.log(this.itemsProps[0])
    //console.log(this.itemsProps[1])
    this.fetchItems()
  }
}