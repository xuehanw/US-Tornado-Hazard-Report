

var us_states = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming',
    'DC': 'District of Columbia',
    'MP': 'Northern Mariana Islands',
    'PW': 'Palau',
    'PR': 'Puerto Rico',
    'VI': 'Virgin Islands',
    'AA': 'Armed Forces Americas (Except Canada)',
    'AE': 'Armed Forces Africa/Canada/Europe/Middle East',
    'AP': 'Armed Forces Pacific'
}

var selectedYear = "2010";
var selectedMonth = "1";
var selectedState = "AL";
var colormap = d3.scaleLinear().domain([0, 20]).range(["silver", "red"]);


Promise.all([
    d3.json("us-states.json"),
    d3.csv("cleaned_tornadoes.csv")
])
    //.then(render);
    .then(function (data) {
        features = data[0]
        allTornado = data[1]
        render(features, allTornado);
        render1(allTornado, selectedYear, selectedState);
        render2(allTornado, selectedYear, selectedState);
        //render();
        //updateMap(data);
    });
// data=[d3.json("us-states.json"),d3.csv("cleaned_tornadoes.csv")],year="2010",month="1"

function render(us_map_data, data, year = selectedYear, month = selectedMonth) {
    console.log(data)
    //let us_map_data = data[0];
    // Index the state data by state name for easy lookup.


    let filtered_num_data = data.filter(d => (d.yr == year && d.mo == month))
    console.log(filtered_num_data)


    let mapped_num_data = new Map(filtered_num_data.map(d => [us_states[d.st], +d.num_tornado]));
    //console.log(mapped_num_data)
    for (var key in us_states) {
        let state = us_states[key]
        if ((mapped_num_data.has(state))) {

        } else {
            mapped_num_data.set(state, 0)
        };
    }
    console.log(mapped_num_data)
    // Mapped data for sum_inj
    let mapped_inj_data = new Map(filtered_num_data.map(d => [us_states[d.st], +d.sum_inj]));
    console.log(mapped_inj_data)
    for (var key in us_states) {
        let state = us_states[key]
        if ((mapped_inj_data.has(state))) {

        } else {
            mapped_inj_data.set(state, 0)
        };
    }
    let mapped_loss_data = new Map(filtered_num_data.map(d => [us_states[d.st], +d.sum_loss]));
    console.log(mapped_loss_data)
    for (var key in us_states) {
        let state = us_states[key]
        if ((mapped_loss_data.has(state))) {

        } else {
            mapped_loss_data.set(state, 0)
        };
    }

    let mapped_fat_data = new Map(filtered_num_data.map(d => [us_states[d.st], +d.sum_fat]));
    console.log(mapped_fat_data)
    for (var key in us_states) {
        let state = us_states[key]
        if ((mapped_fat_data.has(state))) {

        } else {
            mapped_fat_data.set(state, 0)
        };
    }

    let mapped_closs_data = new Map(filtered_num_data.map(d => [us_states[d.st], +d.sum_closs]));
    console.log(mapped_fat_data)
    for (var key in us_states) {
        let state = us_states[key]
        if ((mapped_closs_data.has(state))) {

        } else {
            mapped_closs_data.set(state, 0)
        };
    }

    // Create a projection.
    let projection = d3.geoAlbersUsa()
        .translate([800 / 2, 800 / 2]) // translate to center of the SVG element.
        .scale([1000]); // scale the projection so see the entire US

    // Define the path generator using the projection.
    let path = d3.geoPath().projection(projection);

    // Select the SVG element for the map.
    let svg = d3.select("#tornado_map");

    // Define a color scale for the map.
    //let colormap = d3.scaleLinear().domain([0,20]).range(["silver", "red"]);

    svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(us_map_data.features)
        .enter().append("path")
        .attr("fill", d => colormap(mapped_num_data.get(d.properties.name)))
        .attr("d", path)
        .attr("data-tippy-content", d => {
            let html = "<table>"
                + "<tr><th colspan = '5'>" + d.properties.name + "</th></tr>"
                + "<tr><td> Number of Tornadoes:</td><td>" + mapped_num_data.get(d.properties.name) + "</td></tr>"
                + "<tr><td> Number of Injuries:</td><td>" + mapped_inj_data.get(d.properties.name) + "</td></tr>"
                + "<tr><td> Number of Fatilities:</td><td>" + mapped_fat_data.get(d.properties.name) + "</td></tr>"
                + "<tr><td> Total Loss (Million) :</td><td>" + "$ " + mapped_loss_data.get(d.properties.name) + "</td></tr>"
                + "<tr><td> Total Crop Loss (Million) :</td><td>" + "$ " + mapped_closs_data.get(d.properties.name) + "</td></tr>"

                + "</table>"
            return html;
        })

        .call(s => tippy(s.nodes(), { allowHTML: true }))
        ;
}


function updateMap(tornado_data, year = selectedYear, month = selectedMonth) {
    if (!Array.isArray(tornado_data)) {
        console.error('Tornado data is not an array', tornado_data);
        return;
    }
    console.log(tornado_data)

    // Change the map color
    render(us_map_data = features, data = allTornado, year = selectedYear, month = selectedMonth);
}

function render1(data, selectedYear, selectedState) {
    //let selected_state = document.getElementById("state-select").value;
    //let selected_year = document.getElementById("year-select").value;

    let height = 400;
    let width = 400;
    let margin = 50;
    let uniqueMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13];
    console.log(data)
    let data_subset = data.filter(d => (d.yr == selectedYear && d.st == selectedState))
    console.log(data_subset)
    let month_tornado = new Map(data_subset.map(d => [d.mo, +d.num_tornado]));
    for (var i in month) {
        if ((month_tornado.has(i))) {

        } else {
            month_tornado.set(i, 0)
        };
    }
    console.log(month_tornado)
    const sorted = [...month_tornado].sort(function(a,b) {
        const keyA = parseInt(a[0], 10);
        const keyB = parseInt(b[0], 10);

        return keyA - keyB;});
    
    const map2 = new Map(sorted);
    console.log(map2)

    let mo_array = Array.from(map2.values())
    mo_array.splice(0, 1)
    console.log(mo_array)

    let svg = d3.select("#tornado_chart_vis")
        .attr("width", width)
        .attr("height", height);

    let y = d3.scaleLinear()
        //.domain([d3.max(data, d => d.num_tornado), 0])
        .domain([0, 50])
        .range([height - margin, margin]);

    let x = d3.scaleBand()
        .domain(uniqueMonths)
        .range([margin, width - margin])
        .padding(0.05);

    // Add axes.  First the X axis and label.
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (width - margin) + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("y", 385)
        .attr("x", 0 + ((margin + width) / 2))
        .style("text-anchor", "middle")
        .text("Month");

    // Now the Y axis and label.
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin + ",0)")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("class", "axis-label")
        .attr("y", -5)
        .attr("x", 0 + ((height + margin) / 2))
        .style("text-anchor", "middle")
        .text("Tornado Number");


    let bar_spacing = 2;
    // let bar_width = x(2) - x(1) - bar_spacing;

    // Perform the data join and add the new rectangles

    svg.selectAll("rect")
        .attr("class", "bar")
        .data(mo_array).join("rect")
        .style("fill", "steelblue")
        .attr("x", (d, i) => x(i + 1))
        // .attr("x", (d,i) => x(i))
        .attr("y", d => y(d))
        .attr("height", d => height - margin - y(d))
        .attr("width", x.bandwidth())
        .attr("data-tippy-content", d =>{
            let html = "<table>"
            + "<tr><th colspan = '5'>" + d +"</th></tr>"
            +"</table>"
            return html;
        })
        .call(s => tippy(s.nodes(), {allowHTML: true}));


    svg.selectAll(".label").data(mo_array)
        .join(
            enter => enter.append("text")
                .attr("class", "label")
                // Position the text at the top of each bar
                .attr("x", (d, i) => x(i + 1) + x.bandwidth() / 2) // center the text in the bar
                .attr("y", d => y(d) - 5) // adjust the value to position the label above the bar
                .attr("text-anchor", "middle") // center the text
                .text(d => d) // set the text to the data value
                .transition().duration(800).delay(500)
                .style("fill-opacity", 1),



            update => update.transition().duration(500)
                .attr("x", (d, i) => x(i + 1) + x.bandwidth() / 2) // center the text in the bar
                .attr("y", d => y(d) - 5) // adjust the value to position the label above the bar
                .attr("text-anchor", "middle") // center the text
                .text(d => d),

            exit => exit.transition().duration(300)
                .remove()

        )


}

function render2(data, selectedYear, selectedState) {
    //let selected_state = document.getElementById("state-select").value;
    //let selected_year = document.getElementById("year-select").value;

    let height = 400;
    let width = 400;
    let margin = 50;
    let uniqueMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13];
    console.log(data)
    let data_subset = data.filter(d => (d.yr == selectedYear && d.st == selectedState))
    console.log(data_subset)
    let month_loss = new Map(data_subset.map(d => [d.mo, +d.sum_loss]));
    for (var i in month) {
        if ((month_loss.has(i))) {

        } else {
            month_loss.set(i, 0)
        };
    }
    console.log(month_loss)

    const sorted = [...month_loss].sort(function(a,b) {
        const keyA = parseInt(a[0], 10);
    const keyB = parseInt(b[0], 10);

    return keyA - keyB;});
    
    const map2 = new Map(sorted);
    console.log([...map2]);
    // console.log(sorted)
    


    let mo_array = Array.from(map2.values())
    mo_array.splice(0, 1)
    console.log(mo_array)

    let svg = d3.select("#damage_chart_vis")
        .attr("width", width)
        .attr("height", height);

    let y = d3.scaleLinear()
        //.domain([d3.max(data, d => d.num_tornado), 0])
        .domain([0, 30])
        .range([height - margin, margin]);

    let x = d3.scaleBand()
        .domain(uniqueMonths)
        .range([margin, width - margin])
        .padding(0.05);

    // Add axes.  First the X axis and label.
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (width - margin) + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("class", "axis-label")
        .attr("y", 385)
        .attr("x", 0 + ((margin + width) / 2))
        .style("text-anchor", "middle")
        .text("Month");

    // Now the Y axis and label.
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + margin + ",0)")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("class", "axis-label")
        .attr("y", -5)
        .attr("x", 0 + ((height + margin) / 2))
        .style("text-anchor", "middle")
        .text("Total Loss (Million)");


    let bar_spacing = 2;
    // let bar_width = x(2) - x(1) - bar_spacing;

    // Perform the data join and add the new rectangles
    svg.selectAll("rect")
        .attr("class", "bar")
        .data(mo_array).join("rect")
        .style("fill", "steelblue")
        .attr("x", (d, i) => x(i+1))
        // .attr("x", (d,i) => x(i))
        .attr("y", d => y(d))
        .attr("height", d => height - margin - y(d))
        .attr("width", x.bandwidth())
        .attr("data-tippy-content", d =>{
            let html = "<table>"
            + "<tr><th colspan = '5'>" + d +"</th></tr>"
            +"</table>"
            return html;
        })
        .call(s => tippy(s.nodes(), {allowHTML: true}));


    svg.selectAll(".label").data(mo_array)
        .join(
            enter => enter.append("text")
                .attr("class", "label")
                // Position the text at the top of each bar
                .attr("x", (d, i) => x(i+1 ) + x.bandwidth() / 2) // center the text in the bar
                .attr("y", d => y(d) - 5) // adjust the value to position the label above the bar
                .attr("text-anchor", "middle") // center the text
                .text(d => d.toFixed(1)) // set the text to the data value
                .transition().duration(800).delay(500)
                .style("fill-opacity", 1),



            update => update.transition().duration(500)
                .attr("x", (d, i) => x(i+1 ) + x.bandwidth() / 2) // center the text in the bar
                .attr("y", d => y(d) - 5) // adjust the value to position the label above the bar
                .attr("text-anchor", "middle") // center the text
                .text(d => d.toFixed(1)),

            exit => exit.transition().duration(300)
                .remove()

        )
}


d3.select("#year-select").on("change", function () {
    selectedYear = d3.select(this).property("value");
    selectedMonth = d3.select("#month-select").property("value");

    updateMap(allTornado, selectedYear, selectedMonth);
    render1(data = allTornado, selectedYear, selectedState);
    render2(data = allTornado, selectedYear, selectedState);

    //render(data=[d3.json("us-states.json"),d3.csv("cleaned_tornadoes.csv")], selectedYear, selectedMonth)
});

d3.select("#month-select").on("change", function () {
    selectedMonth = d3.select(this).property("value");
    selectedYear = d3.select('#year-select').property("value")
    updateMap(allTornado, selectedYear, selectedMonth);
});

d3.select("#state-select").on("change", function () {
    selectedYear = d3.select('#year-select').property("value");
    selectedState = d3.select(this).property("value");
    render1(data = allTornado, selectedYear, selectedState);
    render2(data = allTornado, selectedYear, selectedState);
});










