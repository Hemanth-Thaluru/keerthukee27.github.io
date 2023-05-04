
d3.csv("/Warn Database 1-22-2023 - Sheet1.csv", function(data) {
    console.log(data)
});
document.getElementById("modelresult").style="visibility:hidden;"
function changechoice(){
    var selectedValue = document.getElementById("choice").value
    if(selectedValue=='model_result'){
        // document.getElementById("modelresult").style="visibility:visible;"
        // document.getElementById("eda").style="visibility:hidden;"
        // document.getElementById("eda").style="visibility:hidden;"
        // document.getElementById("choosestate").style="visibility:hidden;"
        // document.getElementById("5states").style="visibility:hidden;"
        // document.getElementById("5cities").style="visibility:hidden;"
        // document.getElementById("chooseyear").style="visibility:hidden;"
        // document.getElementById("chooseyearforcity").style="visibility:hidden;"

        document.getElementById("modelresult").hidden=false
        document.getElementById("eda").hidden= true
        document.getElementById("choosestate").hidden= true
        document.getElementById("5states").hidden= true
        document.getElementById("5cities").hidden= true
        document.getElementById("chooseyear").hidden= true
        document.getElementById("chooseyearforcity").hidden= true
        
    }
    else{
        // document.getElementById("modelresult").style="visibility:hidden;"
        // document.getElementById("displayArea").style="visibility:hidden;"
        // document.getElementById("eda").style="visibility:visible;"
        // document.getElementById("5states").style="visibility:hidden;"
        // document.getElementById("5cities").style="visibility:hidden;"

        document.getElementById("modelresult").hidden= true
        document.getElementById("displayArea").hidden= true
        document.getElementById("eda").hidden= false
        document.getElementById("5states").hidden= true
        document.getElementById("5cities").hidden= true
        
    }
}


function changeanalysis(){
    var selectedValue = document.getElementById("analysis_type").value
    // document.getElementById("modelresult").style="visibility:hidden;"
    // document.getElementById("eda").style="visibility:visible;"

    document.getElementById("modelresult").hidden= true
    document.getElementById("eda").hidden= false

    if(selectedValue=='Top Five States'){
        // document.getElementById("5states").style="visibility:hidden;"
        // document.getElementById("5cities").style="visibility:hidden;"
        // document.getElementById("chooseyear").style="visibility:visible;"
        // document.getElementById("choosestate").style="visibility:hidden;"
        // document.getElementById("chooseyearforcity").style="visibility:hidden;"


        document.getElementById("5states").hidden= true
        document.getElementById("5cities").hidden= true
        document.getElementById("chooseyear").hidden= false
        document.getElementById("choosestate").hidden= true
        document.getElementById("chooseyearforcity").hidden= true


        d3.csv("/Warn Database 1-22-2023 - Sheet1.csv", function(data) {
                let year_list =[]
                for(var i=0;i<data.length;i++){
                    if(data[i]['WARN Received Date']!=NaN && data[i]['WARN Received Date']!='' && data[i]['WARN Received Date']!='nan'){
                        year = data[i]['WARN Received Date'].split('/')[2]
                        if(year.length==4){
                        year_list.push(year);
                        }
                    }
                }
                let uniqueYears = [...new Set(year_list)]
                var options = '<option value="#">Select a Year</option>';

            for (var i = 0; i < uniqueYears.length; i++) {
            options += '<option value="' + uniqueYears[i]+ '">' + uniqueYears[i] + '</option>';
                }
            $("#year_list").html(options);
              });
    }

    else if(selectedValue=='Top Five Cities'){
        // document.getElementById("5states").style="visibility:hidden;"
        // document.getElementById("5cities").style="visibility:hidden;"
        // document.getElementById("choosestate").style="visibility:visible;"
        // document.getElementById("chooseyear").style="visibility:hidden;"


        document.getElementById("5states").hidden= true
        document.getElementById("5cities").hidden= true
        document.getElementById("choosestate").hidden= false
        document.getElementById("chooseyear").hidden= true


        d3.csv("/Warn Database 1-22-2023 - Sheet1.csv", function(data) {
            let state_list =[]
            for(var i=0;i<data.length;i++){
                if(data[i]['State']!='' && data[i]['State']!=NaN){
                    if(state_list.includes(data[i]['State'])==false){
                    state_list.push(data[i]['State'])
                    }
                }
            }
            var options = '<option value="#">Select a State</option>';

        for (var i = 0; i < state_list.length; i++) {
        options += '<option value="' + state_list[i]+ '">' + state_list[i] + '</option>';
            }
            console.log("hii");
        $("#state_list").html(options);
          });

    }
    else{
        document.getElementById("modelresult").style="visibility:hidden;"
        document.getElementById("eda").style="visibility:visible;"
    }
}


function showYearsForCities(){
    // document.getElementById("5states").style="visibility:hidden;"
    // document.getElementById("5cities").style="visibility:hidden;"

    document.getElementById("5states").hidden= true
    document.getElementById("5cities").hidden= true

    statename = document.getElementById("state_list").value
    // document.getElementById("chooseyearforcity").style="visibility:visible;"
    document.getElementById("chooseyearforcity").hidden= false

    d3.csv("/Warn Database 1-22-2023 - Sheet1.csv", function(data) {
        year_list=[]
        for(var i=0;i<data.length;i++){
            if(data[i]['State']==statename){
                if(data[i]['WARN Received Date']!=NaN && data[i]['WARN Received Date']!='' && data[i]['WARN Received Date']!='nan'){
                    year = data[i]['WARN Received Date'].split('/')[2]
                    if(year.length==4){
                    year_list.push(year);
                    }
                }
            }

        }
        console.log(year_list)
        let uniqueYears = [...new Set(year_list)]
                var options = '<option value="#">Select a Year</option>';

            for (var i = 0; i < uniqueYears.length; i++) {
            options += '<option value="' + uniqueYears[i]+ '">' + uniqueYears[i] + '</option>';
                }
            $("#year_list_city").html(options);
      });

}

function showtop5cities(){
    // document.getElementById("5states").style="visibility:hidden;"
    // document.getElementById("5cities").style="visibility:visible;"

    document.getElementById("5states").hidden= true
    document.getElementById("5cities").hidden= false

    d3.csv("/Warn Database 1-22-2023 - Sheet1.csv", function(data) {
        year_value = document.getElementById('year_list_city').value
        cities ={}
        for(var i=0;i<data.length;i++){
            cities[data[i]['City']] = 0
        }
        statename = document.getElementById("state_list").value
        for(var i=0;i<data.length;i++){
            if(data[i]['WARN Received Date'].includes(year_value) && data[i]['State']==statename){
                cities[data[i]['City']] += Number(data[i]['Number of Workers'])
            }

        }
        var items = Object.keys(cities).map(function(key) {
            return [key, cities[key]];
          });
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          console.log(items)
          var xValues = [];
          var yValues = [];
          for(var i =0;i<5;i++){
              xValues.push(items[i][0])
              yValues.push(items[i][1])
          }
          var barColors = ["red", "green","blue","orange","brown"];
          new Chart("5citieschart", {
            type: "bar",
            data: {
              labels: xValues,
              datasets: [{
                backgroundColor: barColors,
                data: yValues
              }]
            },
            options: {legend: {display: false},
            title: {
              display: true,
              text: "Top 5 Cities affected by layoff"
            }}
          });
    });
}

function top5stateschart(){
    // document.getElementById("5states").style="visibility:visible;"

    document.getElementById("5states").hidden= false
    d3.csv("/Warn Database 1-22-2023 - Sheet1.csv", function(data) {
        year_value = document.getElementById('year_list').value
        states ={}
        for(var i=0;i<data.length;i++){
            states[data[i]['State']] = 0
        }

        for(var i=0;i<data.length;i++){
            if(data[i]['WARN Received Date'].includes(year_value)){
                states[data[i]['State']] += Number(data[i]['Number of Workers'])
            }

        }
        var items = Object.keys(states).map(function(key) {
            return [key, states[key]];
          });
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          
          var xValues = [];
          var yValues = [];
          for(var i =0;i<5;i++){
              xValues.push(items[i][0])
              yValues.push(items[i][1])
          }
          var barColors = ["red", "green","blue","orange","brown"];
          new Chart("5statechart", {
            type: "bar",
            data: {
              labels: xValues,
              datasets: [{
                backgroundColor: barColors,
                data: yValues
              }]
            },
            options: {legend: {display: false},
            title: {
              display: true,
              text: "Top 5 states affected by layoff"
            }}
          });
    });
    



}




