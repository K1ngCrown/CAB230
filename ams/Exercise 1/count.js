
function countUniqueItems(arr) {
    var count = 0;
    var uniqueCars = Array.from(new Set(arr))
    
    for(i=0; i < uniqueCars.length; i++){
        count++;
    }
    return count;
}


