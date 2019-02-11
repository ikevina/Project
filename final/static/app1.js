function buildMetadata(STATE){
 
 d3.json("/fires/"+ STATE).then(function(fires){
  
  let metaPanel = d3.select("FIRE_NAME-fires");
 
  metaPanel.html("");

  for (const [key,value] of Object.entries(fires)){
   
   if (key === "FIRE_SIZE_CLASS"){
    continue;
   }
   else if (key === "LONGITUDE" || key === "LATITUDE" || key === "STATE"){
    metaPanel.append("p").text(`${key}:\n${value}`);
   }else{
    metaPanel.append("p").text(`${key}:${value}`)
   }
  }
  // BONUS: Build the Gauge Chart
  // buildGauge(fires.FIRE_SIZE_CLASS);
  //console.log(fires.FIRE_SIZE_CLASS);
  // Enter FIRE_SIZE_CLASS frequency between A and G
  var FIRE_SIZE_CLASSfrequency = FIRE_SIZE_CLASS.fires;
​
  // Trig to calc meter point
  var degrees = 180 - 180*FIRE_SIZE_CLASSfrequency,
    radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);
  //generate colors
  var colors = [];
  var texts = [];
  for (let i="A"; i<"G"; i++ ) {
    let color = 255/10*i
    colors.push(`rgba(${color}, 124, 0, .5)`);
    texts.push(`${"F"-i}-${"G"-i} times`)
  }
  colors.push("rgba(255, 255, 255, 0)");   
​
  var gaugefires = [
   { type: 'scatter',
    x: [0], 
    y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'FIRE_SIZE_CLASSfrequencies',
    text: FIRE_SIZE_CLASSfrequencies,
    hoverinfo: 'text+name'},
​
   { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: texts,
    textinfo: 'text',
    textposition:'inside',
    marker: {colors: colors},
    labels: texts,
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
   }];
​
    var gaugeLayout = {
      shapes:[{
       type: 'path',
       path: path,
       fillcolor: '850000',
       line: {
        color: '850000'
       }
      }],
      title: 'STATEfire FIRE_SIZE_CLASSfrequencies',
      height: 700,
      width: 700,
      xaxis: {zeroline:false, showticklabels:false,
           showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
           showgrid: false, range: [-1, 1]}
     };
​
     Plotly.newPlot('gauge', gaugefires, gaugeLayout);
 },
​
 function(reason){
  //console.log("No fires returned!");
  //console.log(reason);
 });
};
​
function buildCharts(STATE) {
​
 // @TODO: Use `d3.json` to fetch the sample fires for the plots
 d3.json("/fires/"+STATE).then(function(fires){
​
  ////console.log(fires)
  FIRE_YEAR = [];
  FIRE_YEARlabels = [];
  FIRE_YEARValues = [];
​
  for (var i = 0; i < fires.length; i++){
  FIRE_YEAR.push(fires[i].FIRE_YEAR);
  FIRE_YEARlabels.push(fires[i].STAT_CAUSE_DESCR);
  FIRE_YEARValues.push(fires[i].FIRE_SIZE_CLASS);
  
  }
​
  console.log( FIRE_YEAR,
   FIRE_YEARlabels,
   FIRE_YEARValues)
​
  // @TODO: Build a Bubble Chart using the sample fires
  var bubleTrace = {
   x: FIRE_YEAR,
   y: FIRE_YEARlabels,
   text: FIRE_YEARlabels,
   text: FIRE_YEARValues,
   mode: 'markers',
   marker: {
    color: FIRE_YEAR,
    size: FIRE_YEARValues
   }
  };
  var bublefires = [bubleTrace];
  
  var bubbleLayout = {
   title: 'Fires by the Cause',
   xaxis: {
    title: 'Years',
   },
   yaxis: {
    title: 'Cause',
   },
   showlegend: false,
   height: 600,
   width: 1200
  };
  
  Plotly.newPlot('bubble', bublefires, bubbleLayout);
​
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 STATE_values,
  // otu_ids, and labels (10 each).
  //The data is already sorted in the backend by pandas
  
  // var pieFIRE_YEAR = [];
  var pieFIRE_YEARlables = [];
  var pieValues = [];
  
​
  for (var i = 0; i < fires.length; i++){
   // pieFIRE_YEAR =push( fires[i].FIRE_YEAR);
   pieFIRE_YEARlables = push(fires[i].STAT_CAUSE_DESCR);
   pieValues =pieFIRE_YEARlables;
  }
  var pieTrace = {
   values:pieFIRE_YEARlables,
   labels: pieFIRE_YEARlables,
   hovertext: pieFIRE_YEARLables,
   type: 'pie',
  };
  
  var piedata = [pieTrace];
  
  var pieLayout = {
   title: 'pie chart',
   showlegend: true,
   height: 500,
   width: 500
  };
  Plotly.newPlot('pie', piedata, pieLayout);
 },
 //callback function to handle error in case we did not receive the json fires.
 function(reason){
  //console.log("did not receive data!");
  //console.log(reason);
 });
};
​
function init() {
 // Grab a reference to the dropdown select element
 var selector = d3.select("#selDataset");
​
 // Use the list of sample names to populate the select options
 d3.json("/names").then((STATENames) => {
  //console.log(STATENames)
  var STATE = []
  for (key in STATENames){
   STATE.push(STATENames[key]);
  }
  //console.log(STATE);
  STATENames.forEach((STATE) => {
   selector
    .append("option")
    .text(STATE)
    .property("value", STATE);
  });
​
  // Use the first sample from the list to build the initial plots
  const firstSTATE = STATENames[0];
  //console.log("FirstState: ", firstSTATE);
  buildCharts(firstSTATE);
  buildMetadata(firstSTATE);
 });
}
​
function optionChanged(newSTATE) {
 // Fetch new fires each time a new sample is selected
 // console.log("New State: " + newSTATE)
 buildCharts(newSTATE);
 buildMetadata(newSTATE);
}
​
// Initialize the dashboard
init();