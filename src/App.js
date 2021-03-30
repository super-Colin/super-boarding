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
console.log('reserves', reservations);

  const [dateReservations, setdateReservations] = useState(reservations);

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
  console.log('adding stay to reservations:', newStay)
  
  setCurrentStayDetails(newStay);
}

const updateCurrentStay = (newStay)=>{
  //Check vailidity?? Should be good though right?

}

// const updateReservations


  return (
    <div className="App">

                                            {/* Maybe pass this into some kind of vaildation before setState() */}
      <AddStayForm passNewGroupStayUpScope={setCurrentStayDetails} />
      <CurrentStayInfo currentStayDetails={currentStayDetails} />
      <DaysOverview reservations={dateReservations} />
      
    </div>
  );


}

export default App;




// const generateDatesFromStay= (stay)=>{};

// const filterRelevantStaysForDate = (stays, date)=>{
//   let relevantStays = {};
//   return relevantStays;
// };

// const CheckIfReservationCanBeMadeOnDate = (date, kennelSizeRequired)=>{
//   let kennelAvailable = true;
//   return kennelAvailable;

// };
// const generateDateFromRelevantStays = (relevantStays)=>{
//   let newDate = {};
//   return newDate;
// };