function plot_type(poke_global_data,data_pokemon,div_name){
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
        poke_type(type_data,data_pokemon,div_name);//Call pie chart
    })();
}


function legendary_plot(poke_global_data,region){
    (async ()=>{
        let data_leg_region ={"Kanto":0,"Johto":0,"Hoenn":0,"Sinnoh":0,"Unova":0,"Kalos":0,"Alola":0};

        await d3.csv(poke_global_data,function(d){
            if(d.is_legendary == 1){
                var reg = region[d.generation-1];
                return data_leg_region[reg] = data_leg_region[reg] + 1;
                } 
            
            })
            leg_per_region(data_leg_region,region);

        })();
}
function reset_journey(){
    d3.selectAll(".capture_btn").style("display","block");
    d3.select("#starter_appear").remove();
    d3.select("#first_appear").remove();
    d3.select("#second_appear").remove();
    d3.select("#legend_appear").remove();
    d3.select("#leg_barplot").remove();
    d3.select(".team_img").remove();
    d3.selectAll(".story").style("display","none");
    
}
