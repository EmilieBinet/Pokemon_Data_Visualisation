//Sources:
//Images sources : https://www.kaggle.com/datasets/kvpratama/pokemon-images-dataset?select=pokemon

let poke_image_src = "https://raw.githubusercontent.com/EmilieBinet/Pokemon_Data_Visualisation/main/pokemon/";
let poke_global_data = "https://raw.githubusercontent.com/EmilieBinet/Pokemon_Data_Visualisation/main/pokemon_global.csv";
let poke_type_WS = "https://raw.githubusercontent.com/zonination/pokemon-chart/master/chart.csv";

let region = ["Kanto","Johto","Hoenn","Sinnoh","Unova","Kalos","Alola"]

d3.select("#region").on("change", (event, d)=>{
    (async ()=>{
    let selectedOption = d3.select("#region").property("value");


    d3.select("body").select("#intro")
    .data(selectedOption)
    .html("You'll begin your journey in "+ selectedOption)
    .style("left", (event.x)/2 + "px")
    .style("top", (event.y)/2 + "px");

    let nb_poke=[0,0];

    await d3.csv(poke_global_data,function(d){
        if(region[d.generation-1] == selectedOption){
            if(nb_poke[0] == 0){
                nb_poke[0] = d.pokedex_number;
            }
            nb_poke[1] = d.pokedex_number;
            return nb_poke;
        }
    })

    d3.select("body").select("#starter_intro")
    .data(selectedOption)
    .html("It's time fo you to choose your first pokemon also called you : STARTER")
    .style("left", (event.x)/2 + "px")
    .style("top", (event.y)/2 + "px");
    
    
    let starter_rand = Math.floor(Math.random() * 2);
    let starter_ID = parseInt(nb_poke[0])+3*parseInt(starter_rand)
    console.log(starter_ID)

    let starter_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == starter_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })
    console.log(nb_poke[0]+3)

    
    console.log(starter_poke[0].name)
    

    let first_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
    let second_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);


    let first_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == first_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })
    while(first_poke[0].legend != 0){
        first_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
        first_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == second_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })}
    let second_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == second_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })
    while(second_poke[0].legend != 0){
        second_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
        second_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == second_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })}

    d3.select("body").selectAll("#first_img")
    .append("img")
    .attr("src",poke_image_src + first_poke[0].nb + ".png")
    .text(first_poke[0].name);

    d3.select("body").selectAll("#second_img")
    .append("img")
    .attr("src",poke_image_src + second_poke[0].nb + ".png")
    .text(second_poke[0].name);
    
    
    //console.log(d.name[second_pokemon]);

    let legend_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
    let legend_poke = await d3.csv(poke_global_data,function(d){

        if(d.pokedex_number == legend_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })
    while(legend_poke[0].legend != 1){
        legend_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
        legend_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == legend_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })}
    d3.select("body").selectAll("#legendary_img")
    .append("img")
    .attr("src",poke_image_src + legend_poke[0].nb + ".png")
    .text(legend_poke[0].name);
    


    type(poke_global_data,first_poke[0].type);//Call function that count type and call piechart
    poke_type_tab();
    legendary_plot(poke_global_data,region);
})()
});


d3.select("body")
    .select("#pokeball_btn")
    .on("click",function(d){
        popup_appear();});



d3.select("body")
    .select("#capture_first")
    .on("click",function(d){
        d3.select(this)
        .transition().duration(100).remove()
        d3.select("#second_teammate")
        .append();
    })

function typeWriter(){
    //Source : https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter
    var i = 0;
    var txt = 'Lorem ipsum dummy text blabla.';
    var speed = 50;

    if (i < txt.length) {
        document.getElementById("text").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}






