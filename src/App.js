import {useState} from 'react';
import AddStayForm from './components/AddStayForm';
import DaysOverview from './components/DaysOverview/DaysOverview';
import CurrentStayInfo from './components/CurrentStayInfo';

// Mock Database
import settings from './mockDbSettings.json';
import stays from './mockDbStays.json';
import reservations from './mockDbReservations.json'

function App() {
// console.log('settings:', settings);
// console.log('stay', stays);
// console.log('reserves', reservations);

  const petStayToReservation = (groupName, petStay)=>{
    console.log('petStayToReservation is recieving:', petStay)
      let [arrivalTime, releaseTime] = [petStay.arrivalTime, petStay.releaseTime];
      let reservationsForStay = {};
      console.log('arrival:', petStay.arrivalDate);


      let firstDayOfStay = true;
      let workingDay = new Date(petStay.arrivalDate); workingDay.setHours(0,0,0,0);
      let arrivalDay = new Date(petStay.arrivalDate); arrivalDay.setHours(0,0,0,0);
      let releaseDay = new Date(petStay.releaseDate); releaseDay.setHours(0,0,0,0);
      
      let onEndDay = false;
      let i = 0;
      while(onEndDay === false){
        let [allDayStay, arrivingToday, releasingToday] = [false, false, false];
        // we CANNOT use the == operator an object! it will always return false
        if( arrivalDay >= workingDay && arrivalDay <= workingDay ) {        // if arrival is the working day 
          console.log('arrivalDay:', arrivalDay);
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

          reservationsForStay[workingDay]  = {
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
          }
          workingDay.setDate(workingDay.getDate() + 1); //increment counter
          i++;
          if(i > 4){
            onEndDay = true;
            console.log('i condition met :/');
          }
      }
      // console.log('workingDay:',workingDay);
      // console.log('reservations for stay is:', reservationsForStay);
      return reservationsForStay;
  }
  
  const groupStayToReservations = (groupStay)=>{
    groupStay.pets.map((petStay)=>{
      // console.log(petStay.arrivalDate);
      // console.log(reservations[petStay.arrivalDate]);
      if(reservations[petStay.arrivalDate]){
        let newReservation = petStayToReservation(groupStay.groupName, petStay) ;
        let updatedDateReservations = [...reservations[petStay.arrivalDate], ...newReservation ];
        console.log('updated reservations',updatedDateReservations);
        setDateReservations([...reservations, ...updatedDateReservations]);
      }else{
        console.log('trying', petStayToReservation(groupStay.groupName, petStay));
        let newReservation =[ petStayToReservation(groupStay.groupName, petStay) ];
        setDateReservations([...reservations, ...newReservation]);
        console.log('new reservation is:', newReservation);
        console.log('new reservations are:', reservations[petStay.arrivalDate]);
      }
    });
// largeAvailable: true
// ​
// mediumAvailable: true
// ​
// smallAvailable: true
  }

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




const addNewStayToReservations = ( newStay, currentReservations) =>{
  // console.log('adding stay to reservations:', newStay)
  setCurrentStayDetails(newStay);
  groupStayToReservations(newStay);
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



