import {useState} from 'react';
import AddStayForm from './components/AddStayForm';
import DaysOverview from './components/DaysOverview/DaysOverview';
import CurrentStayInfo from './components/CurrentStayInfo';

// Mock Database
import settings from './mockDbSettings.json';
import stays from './mockDbStays.json';
// import reservations from './mockDbReservations.json'
import reservations from './mockDbReservations_empty.json'

function App() {

  const [dateReservations, setDateReservations] = useState(reservations);

  const [currentStayDetails, setCurrentStayDetails] = useState({
    "groupName":"useState groupName outer",
    "groupNotes":"Some group notes",
    "pets":[
      {
        "groupName":"useState groupName inner",
        "petName":"useState Mr. Kitty",
        "kennelSize":"medium",
        "arrivalDate":"",
        "arrivalTime":"09:15",
        "releaseDate":"",
        "releaseTime":"17:00",
        "notes":"Her name is Mr. Kitty"
      }
    ]
  });
// console.log('settings:', settings);
// console.log('stay', stays);
// console.log('reserves', reservations);

  const petStayToReservations = (groupName, petStay)=>{
    // console.log('petStayToReservations is recieving:', petStay)
      let [arrivalTime, releaseTime] = [petStay.arrivalTime, petStay.releaseTime];
      let reservationsForStay = [];
      // console.log('arrival:', petStay.arrivalDate);

      let workingDay = new Date(petStay.arrivalDate); workingDay.setHours(0,0,0,0);
      let arrivalDay = new Date(petStay.arrivalDate); arrivalDay.setHours(0,0,0,0);
      let releaseDay = new Date(petStay.releaseDate); releaseDay.setHours(0,0,0,0);
      
      let onEndDay = false;
      let i = 0;
      while(onEndDay === false){
        let [allDayStay, arrivingToday, releasingToday] = [false, false, false];
        // we CANNOT use the == operator an object! it will always return false
        if( arrivalDay >= workingDay && arrivalDay <= workingDay ) {        // if arrival is the working day 
          // console.log('arrivalDay:', arrivalDay);
          arrivingToday = true;
          releaseTime = '';
        } else if(releaseDay >= workingDay && releaseDay <= workingDay) {   // if release is the working day 
          releasingToday = true;
          arrivalTime = '';
          onEndDay = true;
        } else{                                                                 // not arriving or leaving, so must be here all day
          allDayStay = true;
        }
        // console.log('workingDay:',workingDay);
        // console.log('endDay:', releaseDay);

          reservationsForStay.push(
            {
              "date": workingDay.getFullYear() + '/' + (workingDay.getMonth() + 1) + '/' +  workingDay.getDate(),
              "kennelReservations":[{
                "kennelId": 1,
                "kennelSize": petStay.kennelSize,
                "groupName": groupName,
                "petName": petStay.petName,
                "allDayStay": allDayStay,
                "arrivingToday":arrivingToday,
                "releasingToday":releasingToday,
                "arrivalTime": arrivalTime,
                "releaseTime": releaseTime,
                "notes": petStay.notes
          }]});
          workingDay.setDate(workingDay.getDate() + 1); //increment counter
          i++;
          if(i > 12){
            onEndDay = true;
            console.log('i condition met :/');
          }
      }
      // console.log('workingDay:',workingDay);
      // console.log('reservations for stay is:', reservationsForStay);
      return reservationsForStay;
  }

  const getIndexOfDay = (dateString)=>{
    let indexOf = '';
    // reservations.filter(reservation => reservation.date == dateString);
    for(let i = 0; i < dateReservations.length; i++){
      if(dateReservations[i].date == dateString){
        return i;
      }
    }
    console.log('index not found');
    return false
  }
  
  const addNewReservationToDate = ( newReservation) =>{
      // console.log('adding reservation to date', newReservation);
    let indexOfDay = getIndexOfDay(newReservation.date);
    // console.log('index is', indexOfDay);
    if(indexOfDay){
      // console.log('FOUND!! date', reservations[indexOfDay])
      let newState = dateReservations;
      newState[indexOfDay].kennelReservations = [newState[indexOfDay].kennelReservations, newReservation.kennelReservations]
      setDateReservations(newState);
    }else{
      // console.log('didnt find date', newReservation.date, indexOfDay)
      let newDateReservation =
        {
          "date": newReservation.date,
          "smallAvailable": true,
          "mediumAvailable": true,
          "largeAvailable": true,
          "kennelReservations": [...newReservation.kennelReservations]
        };
        let newState = dateReservations;
        newState.push(newDateReservation);
        setDateReservations(newState);
        // setDateReservations([...dateReservations, newDateReservation])
    }
  }

  const groupStayToReservations = (groupStay)=>{
    // console.log('taking new groupStay', groupStay);
    groupStay.pets.map((petStay)=>{
      let newReservations = petStayToReservations(groupStay.groupName, petStay);
      // console.log('new reserves are:', newReservations);
      newReservations.map((reservation)=>{
        addNewReservationToDate( reservation);
      })
      // console.log(petStay.arrivalDate);
      // console.log(reservations[petStay.arrivalDate]);

    });
  }

let some = 
{
  "date": "3/16/21",
  "smallAvailable": true,
  "mediumAvailable": true,
  "largeAvailable": true,
  "kennelReservations": [
    {
    "kennelSize": "large",
    "kennelId": 1,
    "groupName": "Smith",
    "petName": "Chewbaka",
    "notes": "blah blah",
    "allDayStay": false,
    "arrivingToday":true,
    "releasingToday":false,
    "arrivalTime": "00:53",
    "releaseTime": "12:30",
    "arrivalDate": "2021-03-16",
    "releaseDate": "2021-04-19"
  }]
}



const addNewStayToReservations = ( newStay, currentReservations) =>{
  console.log('adding stay to reservations:', newStay)
  groupStayToReservations(newStay);
  setCurrentStayDetails(newStay);
}


  return (
    <div className="App">

                                            {/* Maybe pass this into some kind of vaildation before setState() */}
      <AddStayForm passNewGroupStayUpScope={addNewStayToReservations} />
      <CurrentStayInfo currentStayDetails={currentStayDetails} />
      <DaysOverview reservations={dateReservations} />
      
    </div>
  );


}

export default App;



