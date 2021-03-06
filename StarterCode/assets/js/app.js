
//first, get the data so I can see it.  
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var xValue = function(d) { return d.obesity;}, // data -> value
    xScale = d3.scaleLinear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.axisBottom(xScale);

// setup y
var yValue = function(d) { return d.healthcare;}, // data -> value
    yScale = d3.scaleLinear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));} // data -> display
    yAxis = d3.axisLeft(yScale);


// setup fill color
// var cValue = function(d) { return d.state;},
// color = d3.schemeCategory10;

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);


d3.csv("/StarterCode/assets/data/data.csv", function(error, data) {
  
    console.log(data)
    
    console.log(svg)

    
            // change string (from CSV) into number format
          
          
            // don't want dots overlapping axis, so add in buffer to data domain
            xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
            yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);
          
            // x-axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
              .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end")
                .text("Rate of Obesity");
          
            // y-axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Thousands of $ in healthcare costs");
          
            var circles = svg.selectAll('circle')
                .data(data)
                .enter()
              .append('circle')
                .attr('cx',function (d) { return xScale(d.obesity) })
                .attr('cy',function (d) { return yScale(d.healthcare) });
                });
          