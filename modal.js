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

function teamstat_appear(){
    // Get the modal
    d3.select("body")
    .select("#team_stat_btn")
    .on("click",function(d){
        var modal = document.getElementById("team_stat");
    d3.select("#team").select(".modal-body").select("#all_team").selectAll("svg").remove();

    let team = d3.select("#team_stat")
    .append("svg")
    .style("padding","left")
    
    team.select("#all_team");})
    
}