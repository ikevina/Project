
function buildCharts(STATE) {

  d3.json("/fires/"+STATE).then(function(fires){
    FIRE_YEAR = [];
    FIRE_YEARlabels = [];
    FIRE_YEARValues = [];

    for (var i = 0; i < fires.length; i++){
    FIRE_YEAR.push(fires[i].FIRE_YEAR);
    FIRE_YEARlabels.push(fires[i].STAT_CAUSE_DESCR);
    FIRE_YEARValues.push(fires[i].FIRE_SIZE_CLASS);
    
    }

console.log( FIRE_YEAR,
   FIRE_YEARlabels,
   FIRE_YEARValues)

    var barTrace = {
      x: FIRE_YEARValues ,
      y: FIRE_YEARValues,
      type: 'bar',
      text: FIRE_YEARlabels,
      mode: 'markers',
      marker: {
        color: FIRE_YEAR,
        size: FIRE_YEARValues
      }
    };
    var barfires = [barTrace];
    
    var barlayout = {
      title: 'Causes of Fires 2009',
      xaxis: {
        title: 'Causes',
      },
      yaxis: {
        title: 'Signifigant Forest Fires',
      },
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bar', barfires, barlayout);

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

     var pieTrace = {
      values:FIRE_YEARlabels,
      labels: FIRE_YEARlabels,
      hovertext: FIRE_YEARlabels,
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

  });
}

function init() {
  var selector = d3.select("#selDataset");
  d3.json("/names").then((STATENames) => {
    var STATE = []
    for (key in STATENames){
      STATE.push(STATENames[key]);
    }

    STATENames.forEach((STATE) => {
      selector
        .append("option")
        .text(STATE)
        .property("value", STATE);
    });

    const firstSTATE = STATENames[0];
    buildCharts(firstSTATE);
    // buildMetadata(firstSTATE);
  });
}

function optionChanged(newSTATE) {
  buildCharts(newSTATE);
  // buildMetadata(newSTATE);
}

// Initialize the dashboard
init();