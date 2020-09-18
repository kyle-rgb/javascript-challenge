// from data.js
var tableData = data; // Array of objects

var body = d3.select("tbody");

var resetButton = d3.select("#reset-btn");
var inputButton = d3.select("#filter-btn");
var formDate = d3.select("#datetime");
var formCity = d3.select("#city");
var formState = d3.select("#state");
var formCountry = d3.select("#country");
var formShape = d3.select("#shapes");

var spherical = ["circle", "disk", "oval", "sphere", "teardrop"]; // val=1
var light_related = ["changing", "fireball", "flash", "formation", "light"]; // val=2
var pointy = ["chevron", "triangle", "rectangle"]; // val=3 
var other = ["cigar", "cross", "cylinder", "other", "unknown"]; // val=4

// append dates to table id=ufo-table
for (sighting of data){
    let row = body.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
        let entry = row.append("td");
        if (value.length == 2){
            value = value.toUpperCase();
        };
        if( key == "city"){
            value = value.trim();
            revisedCity = "";
            let city = value.split(" ");
            for (let i =0; i<city.length; i++){
                let first = city[i];
                first = first.replace(first.charAt(0), first.charAt(0).toUpperCase());
                revisedCity += first + " ";
            };
            value = revisedCity;
        }
        entry.text(value);
    })

};

// allow for user input on form field date; id=datetime
inputButton.on("click", (e) => {
    let wantedDate = formDate.property("value"); // user cutoff date
    let wantedDay = wantedDate.split("/")[1];
    wantedDay = parseInt(wantedDay);
    let wantedCity = formCity.property("value"); // user wanted city
    wantedCity = wantedCity.trim().toLowerCase();
    let wantedState = formState.property("value");
    wantedState = wantedState.trim().toLowerCase();
    let wantedCountry = formCountry.property("value");
    wantedCountry = wantedCountry.trim().toLowerCase();
    let wantedShape = formShape._groups[0][0].children;

    var wholeTable = body.selectAll("tr")._groups;
    for (row of wholeTable){
        for(tr of row){
            if (wantedDay != undefined && wantedDay != ""){
            let spottingDay = tr.firstChild.textContent.split("/")[1]
            if (spottingDay < wantedDay){
                tr.style.display = "none";
                }    
            };
            if (wantedCity != undefined && wantedCity != ""){
                let spottingCity = tr.children[1].textContent.trim().toLowerCase();
                if(spottingCity != wantedCity){
                    tr.style.display = "none";
                };
            };
            if (wantedState != undefined && wantedState != ""){
                let spottingState = tr.children[2].textContent.trim().toLowerCase();
                if (wantedState.length > 2){
                    alert("Please Enter the Postal Code Abbreviation for the State");
                    break;
                }
                if(spottingState != wantedState){
                    tr.style.display = "none";
                };
            }
            if (wantedCountry != undefined && wantedCountry != ""){
                let spottingCountry = tr.children[3].textContent.trim().toLowerCase();
                if (wantedCountry == "us" || wantedCountry == "ca"){
                    if(spottingCountry != wantedCountry){
                        tr.style.display = "none";
                    };
                }
            };

            if (wantedShape[0].selected != true){
                var spottingShape = tr.children[4].textContent.trim();
                var shapeSelector;
                for (option of wantedShape){
                    if(option.selected){
                        shapeSelector = parseInt(option.value);
                    }
                }
                switch (shapeSelector){
                    case 1:
                        if(!spherical.includes(spottingShape)){
                            tr.style.display = "none";
                        }
                        break;
                    case 2:
                        if(!light_related.includes(spottingShape)){
                            tr.style.display = "none";
                        }
                        break;
                    case 3:
                        if(!pointy.includes(spottingShape)){
                            tr.style.display = "none";
                        }
                        break;
                    case 4:
                        if(!other.includes(spottingShape)){
                            tr.style.display = "none";
                        }
                        break;
                }
            }
        }    
    }
})

resetButton.on("click", (e) => {
    var wholeTable = body.selectAll("tr")._groups.forEach((data) => {data.forEach((d) => d.style.display = null)})
    formDate._groups[0][0].value="";
    formCity._groups[0][0].value="";
    formState._groups[0][0].value="";
    formCountry._groups[0][0].value="";
    formShape._groups[0][0].children[0].selected = true;
    
})
