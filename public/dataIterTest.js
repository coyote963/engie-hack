// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#datadaily")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
let time = [];
let value = [];
let linedata = [];
let parseTime = d3.timeParse("%Y-%m-%d");

var request = new XMLHttpRequest();
request.open("GET", "DataDaily.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);



  // Now I can use this dataset:
  function parseJSONYO(data){
    console.log(data)
    for (i = 0; i < data.length; i++) { 
      // do something
      time[i] = parseTime(data[i].TimeMeasured.substring(0,10))
      value[i] = parseInt(data[i].CurrentValue)
      linedata[i] = {'x': time[i], 'y':  value[i]}
    }

    for(i = data.length; i >= 0; i--){
      value[i]=value[i]-value[i-1];
      console.log(value[i]);
    }
  }

  parseJSONYO(my_JSON_object);
  
  
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: time,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: value
        }]
    },

    // Configuration options go here
    options: {}

  });
  console.log(time)
  console.log(time.length)
  console.log(value)
  console.log(linedata)        
console.log('test');
      
