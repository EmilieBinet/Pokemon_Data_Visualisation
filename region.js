function forEachRegion(poke_global_data,region,selectedOption) {
    
    (async ()=>{
    let min_max=[0,0];

    await d3.csv(poke_global_data,function(d){
        if(region[d.generation-1] == selectedOption){
            if(min_max[0] == 0){
                min_max[0] = d.pokedex_number;
            }
            min_max[1] = d.pokedex_number;
            return min_max;
        }
    })
    return min_max;
    })()

}