function region_selection(){
    d3.select("#region").on("change", (event, d)=> {
        // Recover the option that has been chosen
        var selection_name = d3.select("#region").property("value");
        console.log(selection_name);
       return selection_name;
    })
    //d3.select("body").selectAll("#intro").html("You will begin your journey in the region of " + selection_name[0]);
    return selection_name;
}

function forEachRegion(poke_global_data){

}