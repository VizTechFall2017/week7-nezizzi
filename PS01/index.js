var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;
console.log(width);
console.log(height);

var marginLeft = 50;
var marginTop = 50;

var nestedData = [];
var formerDancers;
var currentDancers;
var testMap = d3.map();

//circle variables
var circles;
var circle_axis;
var circles2;
var circle_axis2;
var center_x=50;
var center_y=25;
var R=10;
var center_x2=420;
var center_y2=20;

var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');


var axislabel = [{value: 1, text: "None"},
    {value: 2, text: "Diploma from Dance School"},
    {value: 3, text: "Diploma from Performing Arts School"},
    {value: 4, text: "Bachelor's Degree"},
    {value: 5, text: " Advanced Diploma from Dance School"},
    {value: 6, text: "Advanced Diploma from Performing Arts School"},
    {value: 7, text: "Graduate Degree"},
    {value: 8, text: "Other"},
    {value: "D", text: "Did not answer"}
];


var LABEL= axislabel.forEach(function (d) {
    testMap.set(d.value, d.text);
});

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//console.log(testMap);
//console.log(testMap.get(5));


//import the data from the .csv file
d3.csv('./data.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function (d) {
            return d.A1CURFOR
        })
        .entries(dataIn);

    currentDancers = nestedData.filter(function(d){return d.key == '1'})[0].values;
    formerDancers = nestedData.filter(function(d){return d.key == '2'})[0].values;
    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('line')
        .data(currentDancers, function(d){return d.A6QUALS1;})
        .enter()
        .append('line');

    //circle axes
    circles=svg.selectAll('circle')
        .data(axislabel)
        .enter()
        .append('circle');

    circle_axis= circles
        .attr("cx", center_x)
        .attr("cy", center_y)
        .attr("r", function(d){
            //console.log(d.value);
            return R*d.value
        })
        .attr("stroke", "black")
        .attr('stoke-width', '10')
        .attr("fill", "none")
        .attr('data-toggle', 'tooltip')
        .attr('title', function(d){
            return  d.text;
        })
        .on("mouseover", function(d) {
            div.transition()
                .duration(10)
                .style("opacity", .9);
            div.html(d.text)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(1000)
                .style("opacity", 0);
        });

    svg2.selectAll('line')
        .data(currentDancers, function(d){return d.A6QUALS1;})
        .enter()
        .append('line');

    circles2=svg.selectAll('circle')
        .data(axislabel)
        .enter()
        .append('circle');

    circle_axis2= circles2
        .attr("cx", center_x2)
        .attr("cy", center_y2)
        .attr("r", function(d){
            //console.log(d.value);
            return R*d.value
        })
        .attr("stroke", "black")
        .attr('stoke-width', '10')
        .attr("fill", "none")
        .attr('data-toggle', 'tooltip')
        .attr('title', function(d){
            return  d.text;
        })
        .on("mouseover", function(d) {
            div.transition()
                .duration(10)
                .style("opacity", .9);
            div.html(d.text)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(1000)
                .style("opacity", 0);
        });




    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(currentDancers);

});



function drawPoints(pointData){

   var lines = svg.selectAll('line')
       .data(pointData, function(d){
           //console.log(d.A6QUALS1);
           return d.A6QUALS1;
       });

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.
    lines.exit()
        .remove();

    //update the properties of the remaining bars (as before)
    lines
        .append('line')
        .attr('x1',center_x)
        .attr('y1',center_y)
        .attr('x2', function(d){
            return center_x - R*d.A6QUALS1*Math.cos(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('y2', function(d){
            return  center_y - R*d.A6QUALS1*Math.sin(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('stroke','red');

    //add the enter() function to make bars for any new countries in the list, and set their properties
    lines
        .enter()
        .append('line')
        .attr('x1',center_x)
        .attr('y1',center_y)
        .attr('x2', function(d){
            return center_x - R*d.A6QUALS1*Math.cos(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('y2', function(d){
            return center_y - R*d.A6QUALS1*Math.sin(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('stroke','red');

    var lines2 = svg2.selectAll('line')
        .data(pointData, function(d){
            //console.log(d.A6QUALS1);
            return d.A6QUALS1;
        });

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.
    lines2.exit()
        .remove();

    //update the properties of the remaining bars (as before)
    lines2
        .append('line')
        .attr('x1',center_x2)
        .attr('y1',center_y2)
        .attr('x2', function(d){
            return center_x2 - R*d.A6QUALS1*Math.cos(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('y2', function(d){
            return  center_y2 - R*d.A6QUALS1*Math.sin(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('stroke','red');

    //add the enter() function to make bars for any new countries in the list, and set their properties
    lines2
        .enter()
        .append('line')
        .attr('x1',center_x2)
        .attr('y1',center_y2)
        .attr('x2', function(d){
            return center_x2 - R*d.A6QUALS1*Math.cos(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('y2', function(d){
            return center_y2 - R*d.A6QUALS1*Math.sin(Math.floor(Math.random()*360)*(Math.PI/180))
        })
        .attr('stroke','red');


}


