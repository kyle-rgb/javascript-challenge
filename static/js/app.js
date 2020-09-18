// from data.js
var tableData = data; // Array of objects
console.log(data.length);
var body = d3.select("tbody");

var resetButton = d3.select("#reset-btn");
var inputButton = d3.select("#filter-btn");
var form = d3.select("#datetime");

let i = 0; //delete

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
        i++; //delete
    })

};
// allow for user input on form field date; id=datetime
console.log(i);
inputButton.on("click", (e) => {
    let wantedDate = form.property("value"); // user cutoff date
    let wantedDay = wantedDate.split("/")[1];
    wantedDay = parseInt(wantedDay);
    var wholeTable = body.selectAll("tr")._groups;
    for (row of wholeTable){
        for(tr of row){
            let spottingDay = tr.firstChild.textContent.split("/")[1]
            if (spottingDay < wantedDay){
                tr.style.display = "none";
            }
        }
    }
})

resetButton.on("click", (e) => {
    var wholeTable = body.selectAll("tr")._groups.forEach((data) => {data.forEach((d) => d.style.display = null)})
    console.log(wholeTable);
})

// listen for event, parse dt; hide appropiate rows.