

const kennelNeeds = {
    "day": "3/16/21",
    "kennelSize":"large",

    "group...dog":"Notes..."
};
const currentDayInDb = {};

        // THIS WILL NEED TO BE LOOPED THROUGH FOR EACH DAY IN A NEW RESERVATION

// Check for kennel, create a new version of the day and update the DB with it
if( checkDayForAvailability(kennelNeeds) ){

    const updatedDay = createDayWithReservedKennel(currentDayInDb, kennelNeeds);
    updateDayinDb(currentDayInDb, updatedDay);

} else{
    console.log('No availability for that day :(')
}




function checkDayForAvailability(kennelNeeds:object):boolean {
    let dayToCheck = {};
    let neededSizeAvailble = kennelNeeds["kennelSize"] + "Available";
    if(dayToCheck[neededSizeAvailble] === true){
        return true;
    }else{
        return false
    }
}


function createDayWithReservedKennel( currentDayInDb:object, kennelNeeds: object):object{

    let newDayForDb = {"check if there are no more available large kennels and update " : "largeAvailable"}
    return newDayForDb;
}

// Take in an updated version of the day and update the DB
function updateDayinDb(currentDayInDb: object, newDayInDb: object){
    return "success or failure message";
}












