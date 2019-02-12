
function buildCharts(STATE) {
   

  d3.json("/fires/"+STATE).then(function(fires){
    FIRE_YEAR = [];
    FIRE_CAUSE = [];
    FIRE_SIZE = [];
    ybarvalue = [];

    for (var i = 0; i < fires.length; i++){
    FIRE_YEAR.push(fires[i].FIRE_YEAR);
    FIRE_CAUSE.push(fires[i].STAT_CAUSE_DESCR);
    FIRE_SIZE.push(fires[i].FIRE_SIZE_CLASS);
    ybarvalue.push(i + 1)
    }

    var barTrace = {
      x: FIRE_CAUSE,
      y: ybarvalue,
      type: 'bar',
      text: FIRE_CAUSE,
      mode: 'markers',
      marker: {
        color: FIRE_YEAR,
        size: FIRE_CAUSE
      }
    };
    var barfires = [barTrace];
    
    var barlayout = {
      title: 'Causes of Fires',
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
      y: FIRE_SIZE,
      // text: FIRE_CAUSE,
      // text: FIRE_SIZE,
      mode: 'markers',
      marker: {
      //  color: FIRE_YEAR,
       size: FIRE_SIZE
       }
     };
     var bublefires = [bubleTrace];
     
     var bubbleLayout = {
      title: 'Fires by the Size',
      xaxis: {
       title: 'Years',
      },
      yaxis: {
      //  title: 'Cause',
      },
      showlegend: false,
      height: 600,
      width: 1200
     };
     
     Plotly.newPlot('bubble', bublefires, bubbleLayout);

    
     var pieTrace = {
      values: FIRE_SIZE,
      labels: FIRE_CAUSE,
      // ["Arson", "Campfire", "Children", "Debris Burning", "Equipment Use", "Fireworks", "Lightning", "Miscellaneous", "Missing/Undefined", "Powerline", "Railroad", "Smoking", "Structure"],
      hovertext: FIRE_CAUSE,
      type: 'pie',
     };
         
     var piedata = [pieTrace];
     
     var pieLayout = {
      title: 'pie chart',
      showlegend: true,
      height: 1000,
      width: 1000
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