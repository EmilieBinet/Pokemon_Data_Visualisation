//Sources:
//Images sources : https://www.kaggle.com/datasets/kvpratama/pokemon-images-dataset?select=pokemon

let poke_image_src = "https://raw.githubusercontent.com/EmilieBinet/Pokemon_Data_Visualisation/main/pokemon/";
let poke_global_data = "https://raw.githubusercontent.com/EmilieBinet/Pokemon_Data_Visualisation/main/pokemon_global.csv";
let poke_type_WS = "https://raw.githubusercontent.com/EmilieBinet/Pokemon_Data_Visualisation/main/pokemon_type.csv";

let region = ["Kanto","Johto","Hoenn","Sinnoh","Unova","Kalos","Alola"]

d3.select("#region").on("change", (event, d)=>{
    (async ()=>{
    let selectedOption = d3.select("#region").property("value");
    reset_journey();

   

    d3.select("body").select("#intro")
    .data(selectedOption)
    .html("You'll begin your journey in "+ selectedOption)
    .style("left", (event.x)/2 + "px")
    .style("top", (event.y)/2 + "px"); 
    
    d3.selectAll("#starter")
        .transition().duration(100).
        style("display","inline-block");

    d3.selectAll(".starter_btn")
        .transition().duration(100).
        style("display","inline-block");

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


    d3.select("body")
    .selectAll(".starter_btn")
    .on("click",function(d){
        d3.selectAll(".starter_btn")
        .transition().duration(10000).
        style("display","none");

        d3.select("body").selectAll("#starter_option")
        .append("img")
        .attr("id","starter_appear")
        .attr("src",poke_image_src + starter_poke[0].all_info.pokedex_number + ".png");
        capture_action(poke_team,0,"starter_info","starter");

        d3.select("body").selectAll("#beginning")
        .transition().duration(10000).style("display","block");

       d3.select("#capture_first")
       .on("click",d=>{
            d3.select("#capture_first").style("display","none");
            d3.select("body").selectAll("#first_img")
                .append("img")
                .attr("id","first_appear")
                .attr("src",poke_image_src + first_poke[0].all_info.pokedex_number + ".png");
            capture_action(poke_team,1,"first_info","first_one")
            d3.select("#type_explainations")
                .text("YOU DID IT!\n Did you know that each pokemon possessed one or two type.Here are all the proportions of type in all region. You can even see the types of your new pokemon!");     
            plot_type(poke_global_data,poke_team[1][0].type,"poke_type");
            
            d3.select("body").selectAll("#second_capture")
                .transition().duration(10000).style("display","block");

            d3.select("#capture_second")
                .on("click",d=>{
                    d3.select("#capture_second").style("display","none");
                    d3.select("body").selectAll("#second_img")
                    .append("img")
                    .attr("id","second_appear")
                    .style("float","right")
                    .attr("src",poke_image_src + second_poke[0].all_info.pokedex_number + ".png")
                    .html(second_poke[0].all_info.name);
                    capture_action(poke_team,2,"second_info","second_one");
                    poke_type_tab(poke_type_WS,poke_team,"poke_WS_tab");//Call function that count type and call piechart
   
                    
                d3.select("body").selectAll("#legend_capture")
                .transition().duration(10000).style("display","block");

                d3.select("#capture_legend")
                .on("click",d=>{
                    d3.select("#capture_legend").style("display","none");
                    d3.select("body").selectAll("#legendary_img")
                    .append("img")
                    .attr("id","legend_appear")
                    .attr("src",poke_image_src + legend_poke[0].all_info.pokedex_number + ".png")
                    .html(legend_poke[0].all_info.name);
                    capture_action(poke_team,3,"legend_info","legend_one");
                    legendary_plot(poke_global_data,region);

                    d3.select("body").selectAll("#the_end")
                    .transition().duration(10000).style("display","block");
                    d3.select("body").selectAll("#team_stat").style("display","none");
                    teamstat_appear(poke_team,poke_global_data,poke_type_WS,region); //XXXXXXXXXXXXXXXXX
                });   
            });
        });
    });
})()
});

d3.select("body")
.select("#reset_btn")
.on("click",function(d){
    reset_journey();});



/*

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
}*/