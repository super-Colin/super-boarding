import {useState} from 'react';
import AddStayForm from './components/AddStayForm';
import DaysOverview from './components/DaysOverview/DaysOverview';

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
    "groupName":"",
    "groupNotes":"",
    "pets":[
      {
        "groupName":"",
        "petName":"",
        "kennelSize":"",
        "arrivalDate":"",
        "arrivalTime":"",
        "releaseDate":"",
        "releaseTime":"",
        "note":""
      }
    ]
  });






  return (
    <div className="App">
      <AddStayForm passNewGroupStayUpScope={setCurrentStayDetails} />
      <DaysOverview reservations={reservations} />
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