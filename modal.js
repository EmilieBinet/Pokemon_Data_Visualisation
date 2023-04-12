function popup_appear(){
    // Get the modal
    var modal = document.getElementById("team");
    var img = document.getElementById("pokeball_btn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        d3.select("#team").select(".modal-body").select("#all_team")
        .selectAll("svg").remove();
    }

    // When the user clicks anywhere outside of the modal, close it
    img.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            d3.select("#team").select(".modal-body").select("#all_team")
            .selectAll("svg").remove();
    }}  
}

function teamstat_appear(poke_team,poke_global_data,poke_type_WS,region){
    // Get the modal
    d3.select("body")
    .select("#team_stat_btn")
    .on("click",function(d){
        d3.selectAll("#team_div")
        .style("display","block");
        })

    d3.select("body").selectAll(".dot").on("click",function(){ 
        let selected_pokemon = this.id;
        informations(poke_team,parseInt(selected_pokemon.substr(selected_pokemon.length-1, 1)),"team_info","team_stat");
        plot_type(poke_global_data,poke_team[parseInt(selected_pokemon.substr(selected_pokemon.length-1, 1))][0].type,"team_graph");
    })
    //poke_type_tab(poke_type_WS,poke_team,"team_graph");
    
}