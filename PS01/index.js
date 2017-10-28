var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;

var nestedData = [];
var formerDancers;
var currentDancers;
var testMap = d3.map();
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



//import the data from the .csv file
d3.csv('./data.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function (d) {
            return d.A1CURFOR
        })
        .entries(dataIn);
    //console.log(nestedData);

    currentDancers = nestedData.filter(function(d){return d.key == '1'})[0].values;
    formerDancers = nestedData.filter(function(d){return d.key == '2'})[0].values;
    console.log(currentDancers);
    console.log(formerDancers);
    //bind the data to the d3 selection, but don't draw it yet
    //svg.selectAll('rect')
    //    .data(loadData, function(d){return d;});

    circle_axis= svg.append('circle')
        .data(axislabel)
        .attr("cx", 300)           // position the x-centre
        .attr("cy", 300)           // position the y-centre
        .attr("r", function(d){
            console.log(d.value);
            return 10*d.value
        })
        .attr("stroke", "black")    // set the line colour
        .attr("fill", "none");    // set the fill colour


    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(currentDancers);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){


    console.log(testMap);
   console.log(testMap.get(5));


   var theta=90;


    //select all bars in the DOM, and bind them to the new data
    var lines = svg.selectAll('.bars')
        .data(pointData, function(d){return d.A6QUALS1;});

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.
    lines.exit()
        .remove();

    //update the properties of the remaining bars (as before)
    lines
        .transition()
        .duration(200)
        .attr('x1',300)
        .attr('x2',400)
        .attr('y1', function(d){
            return Math.cos(theta)*d.A6QUALS1
        })
        .attr('y2', function(d){
            return  Math.sin(theta)*d.A6QUALS1
        })
        .attr('stroke','#424949');

    /*//add the enter() function to make bars for any new countries in the list, and set their properties
    lines
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill', "slategray")
        .attr('x',function(d){
            return scaleX(d.countryCode);
        })
        .attr('y',function(d){
            return scaleY(d.totalPop);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return 400 - scaleY(d.totalPop);  //400 is the beginning domain value of the y axis, set above
        });

 */
    //take out bars for any old countries that no longer exist
    //rects.exit()
    //    .remove();

}


