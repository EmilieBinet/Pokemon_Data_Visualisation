function capture_action(poke_team,index,subdiv_name,div_name){
    console.log("#teammate_"+index)
    d3.select("body").selectAll("#teammate_"+index)
        .append("img")
        .attr("width","50px")
        .attr("height","50px")
        .attr("class","team_img")
        .attr("src",poke_image_src + poke_team[index][0].all_info.pokedex_number + ".png");

    informations(poke_team,index,subdiv_name,div_name);
}

function informations(poke_team,index,subdiv_name,div_name){

    d3.selectAll("#"+subdiv_name).remove();

    d3.selectAll("#"+div_name).append("div").attr("id",subdiv_name);

    d3.selectAll("#"+subdiv_name)
    .append("text")
    .style("font-size", "22px")
    .text(poke_team[index][0].all_info.name)
    .style("display","flex");

    d3.selectAll("#"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("fill", "red")
    .style("max-width", 400)
    .text(poke_team[index][0].all_info.classfication)
    .style("display","flex");

    d3.selectAll("#"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("fill", "red")
    .style("max-width", 400)
    .text(poke_team[index][0].all_info.weight_kg+" kg ")
    .style("display","flex");

    d3.selectAll("#"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("fill", "red")
    .style("max-width", 400)
    .text(poke_team[index][0].all_info.height_m +" m ")
    .style("display","flex");

    d3.selectAll("#"+subdiv_name)
    .join()
    .append("div")
    //.attr("padding","right")
    .text(poke_team[index][0].all_info.hp + " HP")
    .style("width", function(d) { return (poke_team[index][0].all_info.hp) + "%"; } )
    .style("background-color","#317b41")
    .style("display","flex");//afficher barre hp proportionnelle!!!
    //Afficher plot avec pourcentage male 

    show_tem_WS(poke_type_WS,poke_team[index][0].type,div_name,subdiv_name);
}