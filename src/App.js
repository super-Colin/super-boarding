import {useState} from 'react';
import AddStayForm from './components/AddStayForm';

// Mock Database
import settings from './mockDbSettings.json';
import stays from './mockDbStays.json';

function App() {
console.log('settings:', settings);
console.log('stay', stays);

  const [currentDateReservation, setCurrentDateReservation] = useState({});

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