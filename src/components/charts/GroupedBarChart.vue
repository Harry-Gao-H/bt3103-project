
<script>
//import groupedbarchart from './GroupedBarChart.js'
import database from '../../firebase.js'

import {Bar} from 'vue-chartjs' 



export default {
    extends: Bar,

  components: {
    //'grouped-bar-chart': groupedbarchart


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


    // clearData:function() {
    //   this.datacollection.labels = []
    //   this.datacollection.datasets[0].data = []
    //   this.datacollection.datasets[1].data = [0,0,0,0]
    //   this.datacollection.datasets[2].data = [0,0,0,0]

    //   this.renderChart(this.datacollection, this.options)
    // },

               
    updateData:function(date, meal) {
      this.datacollection.labels = []
      this.datacollection.datasets[0].data = []
      this.datacollection.datasets[1].data = [0,0,0,0]
      this.datacollection.datasets[2].data = [0,0,0,0]

      database.collection('Order').doc(date)
      .collection(meal).get().then(snapshot => {
        snapshot.docs.forEach(doc => { 

          for (var index in doc.data().orders) {

            for (var order in doc.data().orders[index]) { 

              if (order == "cuisine") {

                for (var i in doc.data().orders[index][order]) {

                  if (typeof doc.data().orders[index][order][i] == 'string') {
                    if (!this.datacollection.labels.includes(doc.data().orders[index][order][i])) {
                      this.datacollection.labels.push(doc.data().orders[index][order][i])
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
          })
      })


      database.collection('Order').doc(date)
      .collection(meal).get().then(snapshot => {
        snapshot.docs.forEach(doc => { 

          for (var index in doc.data().orders) {

            // console.log(doc.data().orders[index])

            for (var order in doc.data().orders[index]) { 
              // console.log(order)

              if (order == "small") {



                if (doc.data().orders[index]["small"]) {
                  // console.log(doc.data().orders[index]["small"])
                  // console.log(doc.data().orders[index])

                  for (var i in doc.data().orders[index]) {
                    if (i == "cuisine") {
                      // console.log(doc.data().orders[index][i][0])
                      if (this.datacollection.labels.includes(doc.data().orders[index][i][0])) {
                        var index2 = this.datacollection.labels.indexOf(doc.data().orders[index][i][0])
                        // console.log(index2)
                        // console.log(doc.data().orders[index]["quantity"])
                        this.datacollection.datasets[1].data[index2] += (doc.data().orders[index]["quantity"])

                      }
                    }
                  }
                }
                  if (!doc.data().orders[index]["small"]) {
                    for (var j in doc.data().orders[index]) {
                      if (j=="cuisine") {
                        if (this.datacollection.labels.includes(doc.data().orders[index][j][0])) {
                          var index3 = this.datacollection.labels.indexOf(doc.data().orders[index][j][0])
                          this.datacollection.datasets[2].data[index3] += doc.data().orders[index]["quantity"]
                        }
                      }
                    }
                  }

              }
             

              }
            }
          })
          this.renderChart(this.datacollection, this.options)

      })





    },

  }, 

 

  // created () {
  //   //console.log(this.itemsProps[0])
  //   //console.log(this.itemsProps[1])
  //   //this.fetchItems()
  //   this.clearData()
  // },

};
</script>

<style scoped>


button{
    width:200px;
    padding:15px 0;
    text-align:center;
    margin:20px 10px;
    border-radius:25px;
    font-weight:bold;
    border:2px solid #009688;
    background:transparent;
    color:rgb(22, 20, 20);
    cursor:pointer;
    font-size:20px;
    background-color: #f7f2e1;
    
}


</style>