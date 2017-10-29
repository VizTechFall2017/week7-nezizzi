var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;
var nestedData = [];
var formerDancers;
var currentDancers;
var testMap = d3.map();
var circles;
var circle_axis;

var svg = d3.select('svg')
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

var circle_array= [1,2,3,4,5,6,7,8];

var LABEL= axislabel.forEach(function (d) {
    testMap.set(d.value, d.text);
});

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
       .data(currentDancers, function(d){return d.A6QUALS1;});


    //circle axes
    circles=svg.selectAll('circle')
        .data(axislabel)
        .enter()
        .append('circle');

    circle_axis= circles
        .attr("cx", 300)           // position the x-centre
        .attr("cy", 300)           // position the y-centre
        .attr("r", function(d){
            //console.log(d.value);
            return 25*d.value
        })
        .attr("stroke", "black")    // set the line colour
        .attr("fill", "none");    // set the fill colour


    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(currentDancers);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

   var theta=100*Math.random()* (Math.PI / 180);

    //select all bars in the DOM, and bind them to the new data
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
        .attr('x1',300)
        .attr('y1',300)
        .attr('x2', function(d){
            console.log(d.A6QUALS1);
            return d.A6QUALS1//*Math.cos(theta)
        })
        .attr('y2', function(d){
            return d.A6QUALS1//*Math.cos(theta)
        })
        .attr('stroke','red');

    //add the enter() function to make bars for any new countries in the list, and set their properties
    lines
        .enter()
        .append('line')
        .attr('x1',300)
        .attr('y1',300)
        .attr('x2', function(d){
            return d.A6QUALS1
        })
        .attr('y2', function(d){
            return  d.A6QUALS1
        })
        .attr('stroke','red');
}


