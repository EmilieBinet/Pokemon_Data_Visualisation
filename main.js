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
    
    let poke_team =[];
    
    let starter_rand = Math.floor(Math.random() * 2);
    let starter_ID = parseInt(nb_poke[0])+3*parseInt(starter_rand)
    console.log(starter_ID)

    let starter_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == starter_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })

    let first_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
    let second_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);


    let first_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == first_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })
    while(first_poke[0].all_info.is_legendary != 0){
        first_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
        first_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == first_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })}

    console.log(first_poke)

    let second_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == second_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })
    while(second_poke[0].all_info.is_legendary != 0){
        second_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
        second_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == second_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })}


    let legend_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
    let legend_poke = await d3.csv(poke_global_data,function(d){

        if(d.pokedex_number == legend_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })
    while(legend_poke[0].all_info.is_legendary != 1){
        legend_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
        legend_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == legend_ID){
            return {all_info : d,type:[d.type1,d.type2]};
        }
    })}
    
    poke_team.push(starter_poke,first_poke,second_poke,legend_poke);

    console.log(poke_team)
    d3.select("body")
    .selectAll(".starter_btn")
    .on("click",function(d){
        d3.selectAll(".starter_btn")
        .transition().duration(100).remove();
        d3.select("body").selectAll("#starter_option")
        .append("img")
        .attr("src",poke_image_src + starter_poke[0].all_info.pokedex_number + ".png")
        .html(starter_poke[0].all_info.name);});

    d3.select("body").selectAll("#first_img")
    .append("img")
    .attr("src",poke_image_src + first_poke[0].all_info.pokedex_number + ".png")
    .html(first_poke[0].all_info.name);

    d3.select("body").selectAll("#second_img")
    .append("img")
    .attr("src",poke_image_src + second_poke[0].all_info.pokedex_number + ".png")
    .html(second_poke[0].all_info.name);
    d3.select("body").selectAll("#legendary_img")
    .append("img")
    .attr("src",poke_image_src + legend_poke[0].all_info.pokedex_number + ".png")
    .html(legend_poke[0].all_info.name);
    
    type(poke_global_data,first_poke[0].type);//Call function that count type and call piechart
    poke_type_tab();
    legendary_plot(poke_global_data,region);
    capture_action(poke_team);
    
    teamstat_appear()
})()
});


d3.select("body")
    .select("#pokeball_btn")
    .on("click",function(d){
        popup_appear();});



function capture_action(poke_team){
    d3.select("body")
    .selectAll(".capture_btn")
    .on("click",function(d){
        d3.select(this)
        .transition().duration(100).remove();
        d3.selectAll(".info_pokemon")
        .style("display","inline-block")
        .html(poke_team[0][0].all_info.classfication + "<br>" +poke_team[0][0].all_info.weight_kg+" kg " + poke_team[0][0].all_info.height_m +" m<br>")
        .join()
        .append("div")
        .style("width", function(d) { return poke_team[0][0].all_info.hp + "px"; } )
        .style("background-color","#317b41");//afficher barre hp proportionnelle!!!
        //Afficher plot avec pourcentage male 
    })
}



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