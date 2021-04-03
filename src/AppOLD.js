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

  // const [dateReservations, setDateReservations] = useState(reservations);
  const [dateReservations, setDateReservations] = useState({});

  const petStayToReservations = (groupName, petStay)=>{
    console.log('petStayToReservations is recieving:', petStay)
      let [arrivalTime, releaseTime] = [petStay.arrivalTime, petStay.releaseTime];
      let reservationsForStay = [];

      let workingDay = new Date(petStay.arrivalDate); workingDay.setHours(0,0,0,0);
      let arrivalDay = new Date(petStay.arrivalDate); arrivalDay.setHours(0,0,0,0);
      let releaseDay = new Date(petStay.releaseDate); releaseDay.setHours(0,0,0,0);
      
      let onEndDay = false;
      let i = 0;
      while(onEndDay === false){
        let [allDayStay, arrivingToday, releasingToday] = [false, false, false];
        // we CANNOT use the == operator an object! it will always return false
        if( arrivalDay >= workingDay && arrivalDay <= workingDay ) { // if arrival is the working day 
          arrivingToday = true;
          releaseTime = '';
        } else if(releaseDay >= workingDay && releaseDay <= workingDay) { // if release is the working day 
          releasingToday = true;
          arrivalTime = '';
          onEndDay = true;
        } else{ // not arriving or leaving, so must be here all day
          allDayStay = true;
        }

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
        i++; //increment backup dev counter
        if(i > 12){
          onEndDay = true;
          console.log('i condition met :/, while loop leak');
        }
      }
      // console.log('workingDay:',workingDay);
      // console.log('reservations for stay is:', reservationsForStay);
      return reservationsForStay;
  }

  const getIndexOfDay = (dateString)=>{
    for(let i = 0; i < dateReservations.length; i++){
      if(dateReservations[i].date == dateString){
        return i;
      }
    }
    return false
  }
  
  const addNewReservationToDate = ( newReservation) =>{
      // console.log('adding reservation to date', newReservation);
    let indexOfDay = getIndexOfDay(newReservation.date);
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

    groupStay.pets.map((petStay)=>{
      let newReservations = petStayToReservations(groupStay.groupName, petStay);
      newReservations.map((reservation)=>{
        addNewReservationToDate(reservation);
        console.log('adding to date', reservation)
      })
    });
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



