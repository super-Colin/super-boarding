let MOCKinput=[{
        "groupName": "basic",
        "pets": [{
                "petName": "basic",
                "kennelSize": "medium",
                "note": "Just a test pupper",
                "arrivalDate": "2021-03-27T00:25:36.489Z",
                "releaseDate": "2021-03-27T01:25:36.489Z",
                "singleDayStay": true
            },{
                "petName": "basic",
                "kennelSize": "medium",
                "note": "Just a test pupper",
                "arrivalDate": "2021-03-27T00:25:36.489Z",
                "releaseDate": "2021-03-27T01:25:36.489Z",
                "singleDayStay": true
            }]},{
        "groupName": "Smith",
        "pets": [{
            "petName": "Chewbaka",
            "kennelSize": "large",
            "note": "He's a big boi",
            "arrivalDate": "3/16/21",
            "arrivalTime": "5:30PM",
            "releaseDate": "3/18/21",
            "releaseTime": "4:00PM",
            "overrides": [{
                "date": "3/17/21",
                "allDayStay": "true",
                "arrivalTime": "",
                "releaseTime": "",
                "kennelSize": "medium",
                "overrideNote": "Needs to move to a medium kennel for a bit"
            }]}]}]


function createZeroHourDate(dateString){
    let theDate = new Date(dateString);
    theDate.setHours(0,0,0,0);
    return theDate;
}

// WILL spread args input if it is an array, could bypass by using [[args]]
function callbackLoopThroughDays(startDateString, endDateString, callback, args){
    let firstDayOfStay = true;
    let workingDay = createZeroHourDate(startDateString);
    const endDay = createZeroHourDate(endDateString);
    while(workingDay != endDay){
        // spread args if it's an array
        if(Array.isArray(args)){
            callback(...args);
        }else{
            callback(args);
        }
        firstDayOfStay = false;
        workingDay.setDate(workingDay.getDate() + 1); //increment counter
    }
};
function checkForKennelSizeAvailability(dateString, kennelSize){console.log("didn't check if kennel was available...")};
// ^^^  THIS WILL NEED TO RETURN A KENNEL ID FOR THE RESERVATION





function createPetReservationForDay(petStayDetails, dateString){
    let [allDayStay, arrivingToday, releasingToday] = [false, false, false];
    let [arrivalTime, releaseTime] = [petStayDetails["arrivalTime"], petStayDetails["releaseTime"]];
    let reservationForDay = {};

    // checkForKennelSizeAvailability(workingDateString, petStayDetails["kennelSize"]);
    // ^^^  THIS WILL NEED TO RETURN A KENNEL ID FOR THE RESERVATION
    const workingDate = createZeroHourDate(dateString);
    const arrivalDate = createZeroHourDate(petStayDetails["arivalDate"]);
    const releaseDate = createZeroHourDate(petStayDetails["releaseDate"]);

        // we CANNOT use the == operator an object! it will always return false
    if( arrivalDate >= workingDate && arrivalDate <= workingDate ) {        // if arrival is the working day 
        arrivingToday = true;
        releaseTime = '';
    } else if(releaseDate >= workingDate && releaseDate <= workingDate) {   // if release is the working day 
        releasingToday = true;
        arrivalTime = '';
    } else{                                                                 // not arriving or leaving, so must be here all day
        allDayStay = true;
    }

    reservationForDay  = {
        "kennelId": 1,
        "kennelSize": petStayDetails["kennelSize"],
        "groupName": petStayDetails["groupName"],
        "petName": petStayDetails["petName"],
        "allDayStay": allDayStay,
        "arrivingToday":arrivingToday,
        "releasingToday":releasingToday,
        "arrivalTime": arrivalTime,
        "releaseTime": releaseTime,
        "notes": petStayDetails["notes"]
    }
    return reservationForDay;
}




// function convertGroupStayToReservations(groupStay){
//     let datesReservations = [];
//     allStays.map((group)=>{
//         let groupReservations = [];
//         group["pets"].map((petStay)=>{
//             // add middleware functions for processing pet stays here
//             // checkForFullAvailability();
//             callbackLoopThroughDays(createPetReservationForDay, );
//         });
//     });
//     return datesReservations;
// }
function createGroupReservation(groupStay){
    let datesReservations = [];


    allStays.map((group)=>{
        let groupReservations = [];
        group["pets"].map((petStay)=>{
            // add middleware functions for processing pet stays here
            // checkForFullAvailability();
            callbackLoopThroughDays(petStay.arrivalDate, petStay.releaseDate, createPetReservationForDay, petStay);
        });

    });


    return datesReservations;
}







let MOCKoutput = {
        "date": "3/16/21",
        "smallAvailable": true,
        "mediumAvailable": true,
        "largeAvailable": true,
        "kennelReservations": [{
                "kennelId": 1,
                "allDayStay": true,
                "arrivalTime": "",
                "releaseTime": "",
                "groupName": "Smith",
                "petName": "Chewbaka",
                "kennelSize": "large",
                "notes": "blah blah"
            },
            {
                "kennelId": 2,
                "allDayStay": true,
                "arrivalTime": "",
                "releaseTime": "",
                "groupName": "Smith 2",
                "petName": "Courage",
                "kennelSize": "small",
                "notes": "blah b"
            }
        ]
    }


export default convertStaysToReservations;
