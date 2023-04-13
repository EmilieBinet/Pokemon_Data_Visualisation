function poke_type(type_data,data_pokemon,div_name){
    d3.select("#piechart"+div_name).remove();
   
    // set the dimensions and margins of the graph
    const width = 450,
    height = 450,
    margin = 40;


    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;
    
    console.log(div_name)
    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#"+div_name)
    .append("svg")
    .attr("id", "piechart"+div_name)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);


    // set the color scale
    const color = d3.scaleOrdinal()
    .domain(["grass","poison","bug","electric","ground","ice","fire","water","normal","flying","ghost","psychic","dark","fighting","fairy","dragon","rock","steel"])
    .range(["#78C850","#A040A0","#A8B820", "#F8D030", "#E0C068", "#98D8D8","#F08030","#6890F0","#A8A878","A890F0","#705898","#F85888","#705848","#C03028","#EE99AC","#7038F8","#B8A038","#B8B8D0"]);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
    .value(function(d) {return d[1]})
    const data_ready = pie(Object.entries(type_data))

    // create a tooltip
    const tooltip = d3.select("#"+div_name)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(d) {
    tooltip
    .style("opacity", 1)
    d3.select(this)
    .style("stroke", "black")
    .style("opacity", 1)
    .filter(d=>data_pokemon.includes(d.data[0]))
    .style("stroke","#ff0000")
    .style("stroke-width",10)
    .style("opacity",1)
    }
    const mousemove = function(event,d) {
    tooltip
    .html("Type " + d.data[0])
    .style("left", (event.x)/2 + "px")
    .style("top", (event.y)/2 + "px")
    }
    const mouseleave = function(d) {
    tooltip
    .style("opacity", 0)
    d3.select(this)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .filter(d=>data_pokemon.includes(d.data[0]))
    .style("stroke","#ff0000")
    .style("stroke-width",5)
    .style("opacity",1)
    }

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('whatever')
    .data(data_ready)
    .join('path')
    .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
    )
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .attr('fill', function(d){ return(color(d.data[0])) })
    .style("opacity", 0.7)
    .filter(d=>data_pokemon.includes(d.data[0]))
    .attr("stroke","#ff0000")
    .style("stroke-width",5)
    .style("opacity",1)
}

function poke_type_tab(poke_type_WS,team,div_name){
  d3.select("#tab"+div_name).remove();
  
    // set the dimensions and margins of the graph
const margin = {top: 150, right: 25, bottom: 30, left: 100},
width = 1100 - margin.left - margin.right,
height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#"+div_name)
.append("svg")
.attr("id","tab"+div_name)
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv(poke_type_WS).then(function(data) {

  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  const attackType = Array.from(new Set(data.map(d => d.Attacking)))
  const defenseType = Array.from(new Set(data.map(d => d.Defense)))


// Build X scales and axis:
const x = d3.scaleBand()
  .range([ 0, width])
  .domain(attackType)
  .padding(0.05);
svg.append("g")
  .style("font-size", 15)
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x).tickSize(0))
  .select(".domain").remove()

// Build Y scales and axis:
const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(defenseType)
  .padding(0.05);
svg.append("g")
  .style("font-size", 15)
  .call(d3.axisLeft(y).tickSize(0))
  .select(".domain").remove()

// Build color scale
const myColor = d3.scaleLinear()
.domain([0,0.5,1,2])
.range(["#666666","#cccccc","#dddd00","#ff0000"]);

// create a tooltip
const tooltip = d3.select("#"+div_name)
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function(d) {
  tooltip
  .style("opacity", 1)
  d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
  .filter(d=>team_type.includes(d.Attacking))
  .style("stroke","#9933ff")
  .style("stroke-width",8)
  .style("opacity",1)
  }
const mousemove = function(event,d) {
  tooltip
    .html(d.Attacking+" VS "+d.Defense +" : "+ d.Value)
    .style("left", (event.x)/2 + "px")
    .style("top", (event.y)/2 + "px")
}
const mouseleave = function(d) {
  tooltip
  .style("opacity", 0)
  d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.8)
  .filter(d=>team_type.includes(d.Attacking))
  .style("stroke","#9933ff")
  .style("stroke-width",4)
  .style("opacity",1)
  }

let team_type= [];
team_type[0] = team[2][0].type[0].charAt(0).toUpperCase() + team[2][0].type[0].slice(1)
team_type[1] = team[2][0].type[1].charAt(0).toUpperCase() + team[2][0].type[1].slice(1)

// add the squares
svg.selectAll()
  .data(data, function(d) {return d.Attacking+':'+d.Defense;})
  .join("rect")
    .attr("x", function(d) { return x(d.Attacking) })
    .attr("y", function(d) { return y(d.Defense) })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .style("fill", function(d) { return myColor(d.Value)} )
    .style("stroke-width", "none")
    .style("opacity", 0.7)
    .filter(d=>team_type.includes(d.Attacking))
    .attr("stroke","#9933ff")
    .style("stroke-width",4)
    .style("opacity",1)
    

// Add title to graph
svg.append("text")
      .attr("x", 0)
      .attr("y", -100)
      .attr("text-anchor", "center")
      .style("font-size", "22px")
      .text("Weakness and Strenght Against Each Type");

// Add subtitle to graph
svg.append("text")
      .attr("x", 0)
      .attr("y", -75)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "red")
      .style("max-width", 400)
      .text("2 : Really effective");
      // Add subtitle to graph
svg.append("text")
.attr("x", 0)
.attr("y", -50)
.attr("text-anchor", "left")
.style("font-size", "14px")
.style("fill", "yellow")
.style("max-width", 400)
.text("1 : Effective");

svg.append("text")
      .attr("x", 0)
      .attr("y", -25)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("0.5 : Not really effective");
      // Add subtitle to graph
svg.append("text")
.attr("x", 0)
.attr("y", 0)
.attr("text-anchor", "left")
.style("font-size", "14px")
.style("fill", "black")
.style("max-width", 400)
.text("0 : Not effective at all");

})
}

function show_team_WS(poke_type_WS,pokemon,div_name,subdiv_name){
  (async ()=>{

    let team_type= [];
    team_type[0] = pokemon[0].charAt(0).toUpperCase() + pokemon[0].slice(1)
    team_type[1] = pokemon[1].charAt(0).toUpperCase() + pokemon[1].slice(1)
  let weakness=[]
  let strengh=[]
  await d3.csv(poke_type_WS,function(data){
    for(let i=0;i<2;i++){
      if(team_type[i]==data.Attacking){
        if(data.Value == 0.5){
          weakness.push(data.Defense);
        }
        else if (data.Value == 2){
          strengh.push(data.Defense);
        }
      }
    }})
    console.log(weakness)
    console.log(strengh)
    d3.selectAll("#WS"+subdiv_name).remove();

    d3.selectAll("#"+div_name).append("div").attr("id","WS"+subdiv_name);

    d3.selectAll("#WS"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("max-width", 400)
    .text("This Pokemon is really useful against "+ strengh.toString()+" Pokemon.")
    .style("display","flex");

    d3.selectAll("#WS"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("max-width", 400)
    .text("However, it's weak against "+ weakness.toString()+" Pokemon.")
    .style("display","flex");
  })()
}