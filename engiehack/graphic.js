// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) {return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


      // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Date");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // text label for the y axis
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("kWh");  

    // Title for the graph
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Building kWh 2018");

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { 
            //console.log(d.date)
            return x(d.date) })
        .y(function(d) { 
            //console.log(d.value)
            return y(d.value) })
        )

        // Print max, min, median, mean, and total to screen
        let max = d3.max(data, function(d) { return +d.value; })
        let min = d3.min(data, function(d) { return +d.value; })
        let median = d3.median(data, function(d) { return +d.value; })
        let mean = d3.mean(data, function(d) { return +d.value; })
        let sndDeviation = Math.sqrt(d3.variance(data, function(d) { return +d.value; }))
        let total = d3.sum(data, function(d) { return +d.value; })
        console.log('Min: ' + min + ' kWh');
        cole.log('Median: ' + median + ' kWh');
        consonsole.log('Max: ' + max + ' kWh');
        console.log('Mean: ' + mean + ' kWh');
        console.log('SrdDeviation: ' + sndDeviation + ' kWh');
        console.log('Total: ' + total + ' kWh');
        console.log(d3.values)
        
})

      
