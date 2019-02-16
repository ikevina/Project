
function buildCharts(STATE) {
   

  d3.json("/fires/"+STATE).then(function(fires){
    FIRE_YEAR = [];
    FIRE_CAUSE = [];
    FIRE_SIZE = [];

    for (var i = 0; i < fires.length; i++){
    FIRE_YEAR.push(fires[i].FIRE_YEAR);
    FIRE_CAUSE.push(fires[i].STAT_CAUSE_DESCR);
    FIRE_SIZE.push(fires[i].FIRE_SIZE_CLASS);
    }
    var FIRE_CAUSE_COUNT = [];
    var FIRE_CAUSE_LIST = [];
    for (var i = 0; i < FIRE_CAUSE.length; i++){
      if (!FIRE_CAUSE_LIST.includes(FIRE_CAUSE[i])){
        FIRE_CAUSE_LIST.push(FIRE_CAUSE[i])
        FIRE_CAUSE_COUNT.push(1)
      }
      else{
        FIRE_CAUSE_COUNT[FIRE_CAUSE_LIST.indexOf(FIRE_CAUSE[i])] +=1
      }}

      var FIRE_YEAR_LIST = [];
      var FIRE_YEAR_COUNT = [];
      for (var i = 0; i < FIRE_YEAR.length; i++){
        if (!FIRE_YEAR_LIST.includes(FIRE_YEAR[i])){
          FIRE_YEAR_LIST.push(FIRE_YEAR[i])
          FIRE_YEAR_COUNT.push(1)
        }
        else{
          FIRE_YEAR_COUNT[FIRE_YEAR_LIST.indexOf(FIRE_YEAR[i])] +=1
        }}

    var barTrace = {
      x: FIRE_CAUSE_LIST,
      y: FIRE_CAUSE_COUNT,
      type: 'bar',
      text: FIRE_CAUSE_LIST,
      color: "red"
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

    var pieTrace = {
      values: FIRE_CAUSE_COUNT,
      labels: FIRE_CAUSE_LIST,
      hovertext: FIRE_CAUSE_LIST,
      type: 'pie',
     };
         
     var piedata = [pieTrace];
     
     var pieLayout = {
      title: 'Causes of Fires',
      showlegend: true,
      height: 1000,
      width: 1000
     };
     
     Plotly.newPlot('pie', piedata, pieLayout);

    var lineTrace1 = {
      x: FIRE_YEAR_LIST,
      y: FIRE_YEAR_COUNT,
      mode: "markers",
      marker: {
        color: "red",
        size: 16,
        symbol: ["star", "star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star","star"]
      },
      type: "scatter"
     };

     var data = [lineTrace1];

     var lineLayout = {
      title: 'Fires by the Year',
      xaxis: {
       title: 'Years',
      },
      yaxis: {
       title: 'Incidents of Forest Fires',
      },
      showlegend: false,
      height: 600,
      width: 1200
     };
     Plotly.newPlot('myDiv', data, lineLayout);
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
  });
}

function optionChanged(newSTATE) {
  buildCharts(newSTATE);
}

// Initialize the dashboard
init();