import {useState} from 'react';
import AddStayForm from './components/AddStayForm';
import DaysOverview from './components/DaysOverview/DaysOverview';
import CurrentStayInfo from './components/CurrentStayInfo';

// // Mock Database
// import settings from './mockDbSettings.json';
// import stays from './mockDbStays.json';
// // import reservations from './mockDbReservations.json'
// import reservations from './mockDbReservations_empty.json'

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

  const [dateReservations, setDateReservations] = useState({});


  const createReservationsFromStay = (groupName, petStay)=>{
    // console.log('new created receiving:', petStay);
    let newReservations = [];
    newReservations.push({"petName":petStay.petName});
    // console.log('new created are:', newReservations);
  }

  
  const addNewStayToReservations = (newStay) =>{
    // console.log('addNewStay is receiving:', newStay);
    let newReservations = [];
    // newStay.pets.map((petStay)=>{
    //   createReservationsFromStay(newStay.groupName, petStay)
    // });
    console.log('addNewStay is passing on:',newReservations);
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




