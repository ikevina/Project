function buildMetadata(FIRE_NAME){

  // @TODO: Complete the following function that builds the metafires panel

  // Use `d3.json` to fetch the metafires for a sample
  d3.json("/fires/"+FIRE_NAME).then(function(fires){
    console.log(fires);
    // Use d3 to select the panel with id of `#sample-metafires`
    let metaPanel = d3.select("#FIRE_NAME-fires");
    // Use `.html("") to clear any existing fires
    metaPanel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metafires.
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
    console.log(fires.FIRE_SIZE_CLASS);
    // Enter FIRE_SIZE_CLASS frequency between A and G
    var FIRE_SIZE_CLASSfrequency = fires.fires;

    // Trig to calc meter point
    var degrees = 180 - 180*FIRE_SIZE_CLASSfrequencies,
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

    var gaugefires = [
      { type: 'scatter',
        x: [0], 
        y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'FIRE_SIZE_CLASSfrequencies',
        text: FIRE_SIZE_CLASSfrequencies,
        hoverinfo: 'text+name'},

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

          Plotly.newPlot('gauge', gaugefires, gaugeLayout);
  },

  function(reason){
    console.log("No fires returned!");
    console.log(reason);
  });
};

function buildCharts(FIRE_NAME) {

  // @TODO: Use `d3.json` to fetch the sample fires for the plots
  d3.json("/samples/"+FIRE_NAME).then(function(fires){
    //console.log(fires)
    FIRE_YEAR = fires.FIRE_YEAR;
    FIRE_YEARlabels = fires.FIRE_YEAR_labels;
    FIRE_YEARValues = fires.FIRE_YEAR_values;

    // @TODO: Build a Bubble Chart using the sample fires
    var bubleTrace = {
      x: FIRE_YEAR,
      y: FIRE_YEARvalues,
      text: FIRE_YEARlables,
      mode: 'markers',
      marker: {
        color: FIRE_YEAR,
        size: FIRE_YEARvalues
      }
    };
    var bublefires = [bubleTrace];
    
    var bubbleLayout = {
      title: 'bubble chart',
      xaxis: {
        title: 'otu IDs',
      },
      yaxis: {
        title: 'sample size',
      },
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', bublefires, bubbleLayout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 FIRE_NAME_values,
    // otu_ids, and labels (10 each).
    //The data is already sorted in the backend by pandas
    pieFIRE_YEAR = fires.FIRE_YEAR.slice(0,10);
    pieFIRE_YEARlables = fires.FIRE_YEAR_labels.slice(0,10);
    pieValues = fires.FIRE_YEAR_values.slice(0,10);
    
    var pieTrace = {
      values: pieValues,
      labels: pieFIRE_YEARIds,
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
    console.log("did not receive data!");
    console.log(reason);
  });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((FIRE_NAMENames) => {
    FIRE_NAMENames.forEach((FIRE_NAME) => {
      selector
        .append("option")
        .text(FIRE_NAME)
        .property("value", FIRE_NAME);
    });

    // Use the first sample from the list to build the initial plots
    const firstFIRE_NAME = FIRE_NAMENames[0];
    buildCharts(firstFIRE_NAME);
    buildMetadata(firstFIRE_NAME);
  });
}

function optionChanged(newFIRE_NAME) {
  // Fetch new fires each time a new sample is selected
  buildCharts(newFIRE_NAME);
  buildMetadata(newFIRE_NAME);
}

// Initialize the dashboard
init();
