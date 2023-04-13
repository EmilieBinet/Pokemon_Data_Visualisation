
function leg_per_region(data_leg_region,region){

    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#legendary_region")
    .append("svg")
    .attr("id", "leg_barplot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    let data = []
    for(elem in data_leg_region){
      data.push({region : elem, value : data_leg_region[elem]})
    }

    // X axis
    const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(d => d.region))
    .padding(0.2);
    svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");


    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 20])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));
    
    console.log(region)
    const color = d3.scaleOrdinal()
    .domain(region)
    .range(d3.schemePaired );

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(d) {

      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);

    }
    const mouseleave = function(d) {
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    const mouseclick = function(d) {
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
      legendary_piechart(d3.select(this).datum().value);
    }
    // Bars
    svg.selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", d => x(d.region))
    .attr("width", x.bandwidth())
    .attr("fill", d=> color(d.region))
    // no bar at the beginning thus:
    .attr("height", d => height - y(0)) // always equal to 0
    .attr("y", d => y(0))
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave)
    .on("click", mouseclick)

    // Animation
    svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", d => y(d.value))
    .attr("height", d => height - y(d.value))
    .delay((d,i) => { return i*100})  
}

function legendary_piechart(data_leg){
    d3.select("#piechart_leg").remove();

    // set the dimensions and margins of the graph
    const width = 450,
    height = 450,
    margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#legendary_prop")
    .append("svg")
    .attr("id", "piechart_leg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

    d3.selectAll("#pb_legend")
        .style("display","inline-block");

    // Create dummy data
    const data = {a: data_leg, b: 20}

    // set the color scale
    const color = d3.scaleOrdinal()
    .range(["#ee1515","#f0f0f0"])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
    .value(function(d) {return d[1]})
    const data_ready = pie(Object.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('whatever')
    .data(data_ready)
    .join('path')
    .attr('d', d3.arc()
    .innerRadius(50)
    .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data[1])) })
    .attr("stroke", "#222224")
    .style("stroke-width", "10px")
    .style("opacity", 1)
}