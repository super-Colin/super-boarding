import {useState} from 'react';
import AddStayForm from './components/AddStayForm';
import DaysOverview from './components/DaysOverview/DaysOverview';
import CurrentStayInfo from './components/CurrentStayInfo';

// // Mock Database
import settings from './mockDbSettings.json';
// import stays from './mockDbStays.json';
// // import reservations from './mockDbReservations.json'
// import reservations from './mockDbReservations_empty.json'

function App() {
  const emptyDateKennelSizesBoilerplate= ()=>{
    let sizesBoilerplate = {}
    settings.kennelSizes.map((size)=>{
      sizesBoilerplate[size.size + 'Total'] = size.total;
      sizesBoilerplate[size.size + 'Available'] = true;
    })
    return sizesBoilerplate;
  }

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

  const [groupStays, setGroupStays] = useState({})
  const addGroupToGroupStays = (groupStay)=>{
    let newState = groupStays;
    if(groupStays[groupStay.groupName]){
      newState[groupStay.groupName] = groupStay;
    }else{
      newState[groupStay.groupName] = groupStay;
    }
      setGroupStays(newState);
  }

  const newDateString = (dateString)=>{
    let newDate = new Date(dateString.replace(/-/g, '/'));
    return newDate.getFullYear() + '/' + ( newDate.getMonth() + 1 ) + '/' + newDate.getDate();
  }

  const petStayToReservations = (petStay)=>{
    console.log('petStayToReservations is recieving:', petStay)
    let [arrivalTime, releaseTime] = [petStay.arrivalTime, petStay.releaseTime];
    let reservationsForStay = {};

    let workingDay = new Date(newDateString(petStay.arrivalDate) ); workingDay.setHours(0,0,0,0);
    let arrivalDay = new Date(newDateString(petStay.arrivalDate) ); arrivalDay.setHours(0,0,0,0);
    let releaseDay = new Date(newDateString(petStay.releaseDate) ); releaseDay.setHours(0,0,0,0);

    let [onEndDay, i] = [false, 0];
    while(onEndDay === false){
      let [allDayStay, arrivingToday, releasingToday] = [false, false, false];
      let formattedWorkingDay = workingDay.getFullYear() + '/' + (workingDay.getMonth() + 1) + '/' +  workingDay.getDate();
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

      reservationsForStay[formattedWorkingDay] = {
          "date": formattedWorkingDay,
          "kennelReservations":[{
            "kennelId": 1,
            "kennelSize": petStay.kennelSize,
            "groupName": petStay.groupName,
            "petName": petStay.petName,
            "allDayStay": allDayStay,
            "arrivingToday":arrivingToday,
            "releasingToday":releasingToday,
            "arrivalTime": petStay.arrivalTime,
            "releaseTime": petStay.releaseTime,
            "notes": petStay.notes
      }]};
      workingDay.setDate(workingDay.getDate() + 1); //increment counter
      i++; //increment backup dev counter
      if(i > 12){ onEndDay = true; console.log('i condition met :/, while loop leak');}
    }
    console.log('created reservations : ', reservationsForStay);
    return reservationsForStay;
  }
  const checkDateAvailability = (potentialReservation)=>{
    console.log('Potential Reservation : ', potentialReservation);
    console.log('checking dateReservations', dateReservations);
    // let kennelSizeNeeded = potentialReservation.kennelReservations[0].kennelSize;
    let newState = dateReservations;
    if(dateReservations[potentialReservation.date]){
      console.log('ADDING a reserve to day', dateReservations[potentialReservation.date]);
      newState[potentialReservation.date].kennelReservations.push(potentialReservation.kennelReservations[0]);
      console.log('ADDED a reserve to day', dateReservations[potentialReservation.date]);
    }else{
      
      newState[potentialReservation.date] = {
        ...emptyDateKennelSizesBoilerplate(),
        "kennelReservations":[potentialReservation.kennelReservations[0] ]
      };
    }
    setDateReservations(newState);
  }
  const mergeNewReservationsToState = (newReservations)=>{
    Object.keys(newReservations).map((dateKey)=>{
      checkDateAvailability(newReservations[dateKey]);
    })
  }

  const addGroupStayToReservations = (groupStay)=>{
    console.log('addGroupStay is receiving', groupStay);
    addGroupToGroupStays(groupStay);
    Object.keys(groupStay.pets).map((key)=>{
      console.log('groupStay pet is : ', groupStay.pets[key]);
      let newReservations = petStayToReservations(groupStay.pets[key]);
      mergeNewReservationsToState(newReservations);
    })
  }


  const logGroup =()=>{console.log('GroupStays is : ',groupStays)}
  const logRes =()=>{console.log('Reservations State is : ', dateReservations)}

  return (
    <div className="App">

      <button onClick={logGroup}>log groupStays</button>
      <button onClick={logRes}>log Reservations</button>

                                            {/* Maybe pass this into some kind of vaildation before setState() */}
      <AddStayForm passNewGroupStayUpScope={addGroupStayToReservations} />
      <CurrentStayInfo currentStayDetails={currentStayDetails} />
      <DaysOverview reservations={dateReservations} />
      
    </div>
  );


}

export default App;




