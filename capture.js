function capture_action(poke_team,index,subdiv_name,div_name){
    console.log("#teammate_"+index)
    d3.select("body").selectAll("#teammate_"+index)
        .append("img")
        .attr("width","50px")
        .attr("height","50px")
        .attr("class","team_img")
        .attr("src",poke_image_src + poke_team[index][0].all_info.pokedex_number + ".png")
        .html(poke_team[index][0].all_info.name);

    informations(poke_team,index,subdiv_name,div_name);
}

function informations(poke_team,index,subdiv_name,div_name){

    d3.selectAll("#"+subdiv_name).remove();

    d3.selectAll("#"+div_name).append("div").attr("id",subdiv_name);

    d3.selectAll("#"+subdiv_name)
    .append("text")
    .attr("x", 0)
    .attr("y", -100)
    .style("font-size", "22px")
    .text(poke_team[index][0].all_info.name);

    d3.selectAll("#"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("fill", "red")
    .style("max-width", 400)
    .text(poke_team[index][0].all_info.classfication);

    d3.selectAll("#"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("fill", "red")
    .style("max-width", 400)
    .text(poke_team[index][0].all_info.weight_kg+" kg ");

    d3.selectAll("#"+subdiv_name).append("text")
    .style("font-size", "14px")
    .style("fill", "red")
    .style("max-width", 400)
    .text(poke_team[index][0].all_info.height_m +" m ");
    /*.style("display","inline-block")
    .html(poke_team[index][0].all_info.name +"<br><br>"+poke_team[index][0].all_info.classfication + "<br><br>" +poke_team[index][0].all_info.weight_kg+" kg " + poke_team[index][0].all_info.height_m +" m <br><br>");*/
    
    d3.selectAll("#"+subdiv_name)
    .join()
    .append("div")
    //.attr("padding","right")
    .text(poke_team[index][0].all_info.hp + " HP")
    .style("width", function(d) { return (poke_team[index][0].all_info.hp*10) + "px"; } )
    .style("background-color","#317b41");//afficher barre hp proportionnelle!!!
    //Afficher plot avec pourcentage male 
}