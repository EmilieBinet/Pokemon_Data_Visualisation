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

    //let starter_pokemon = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + nb_poke[0];

    let first_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);
    let second_ID = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + parseInt(nb_poke[0]);


    let first_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == first_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })
    let second_poke = await d3.csv(poke_global_data,function(d){
        if(d.pokedex_number == second_ID){
            return {name:d.name,legend:d.is_legendary,type:[d.type1,d.type2],nb:d.pokedex_number};
        }
    })

    d3.select("body").selectAll("#first_img")
    .append("img")
    .attr("src",poke_image_src + first_poke[0].nb + ".png")
    .text(first_poke[0].name);

    d3.select("body").selectAll("#second_img")
    .append("img")
    .attr("src",poke_image_src + second_poke[0].nb + ".png")
    .text(second_poke[0].name);
    
    
    //console.log(d.name[second_pokemon]);
    //let legendary_pokemon = Math.floor(Math.random() * (nb_poke[1]-nb_poke[0])) + nb_poke[0];


    type(poke_global_data,first_poke[0].type);//Call function that count type and call piechart
    poke_type_tab();
    legendary_plot(poke_global_data,region);
})()
});



    


function type(poke_global_data,data_pokemon){
    //FIlter the 
    (async ()=>{
    let type_data = {"grass": 0,"poison":0,"bug":0,"electric":0,"ground":0,"ice":0,"fire":0,"water":0,"normal":0,"flying":0,"ghost": 0,"psychic":0,"dark":0,"fighting":0,"fairy":0,"dragon":0,"rock":0,"steel":0};

    await d3.csv(poke_global_data,function(d){
        for (type in type_data){
            if(type == d.type1||type == d.type2){
                type_data[type] = type_data[type] + 1;
            }}
        return type_data;    
        })
        poke_type(type_data,data_pokemon);//Call pie chart
    })();
}


function legendary_plot(poke_global_data,region){
    (async ()=>{
        let data_leg_region ={"Kanto":0,"Johto":0,"Hoenn":0,"Sinnoh":0,"Unova":0,"Kalos":0,"Alola":0};
        let data_leg={"Legendary":0,"Non-Legendary":0};

        await d3.csv(poke_global_data,function(d){
            if(d.is_legendary == 1){
                var reg = region[d.generation-1];
                return ((data_leg_region[reg] = data_leg_region[reg] + 1),(data_leg[0]=data_leg[0]+1));
                } 
            else{
                return data_leg[1]=data_leg[1]+1;
            }
            })
            leg_per_region(data_leg_region);
            //legendary_piechart(data_leg);
        })();
}
d3.select("body")
    .select("#pokeball_btn")
    .on("click",function(d){
        popup_appear();});

function show_image(src, width, height, alt) {
        var img = document.createElement("img");
        img.src = src;
        img.width = width;
        img.height = height;
        img.alt = alt;
    
        // This next line will just add it to the <body> tag
        document.body.appendChild(img);
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






