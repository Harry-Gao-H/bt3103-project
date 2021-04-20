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
       
      
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#c15b3e"],

  
                
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

          }
          
     

        )
        this.renderChart(this.datacollection, this.options)
      })


    },
    

  }, 

 

  created () {
  
    this.clearData()
  }
}