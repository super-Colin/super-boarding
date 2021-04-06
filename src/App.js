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
    let newGroupState = groupStays;
    let [groupIsDuplicate, i] = [true, 1];
    let newGroupLabel = groupStay.groupName + '-' + i;
    while(groupIsDuplicate === true && i < 99){
      console.log(newGroupLabel,i,groupStays[newGroupLabel])
      if(! groupStays[newGroupLabel]){ // if group is NOT already in db
        groupIsDuplicate = false
      }else {newGroupLabel = groupStay.groupName + '-' + i;}
      i++;
    }
    if(i > 50){console.log('addGroupToGroupStays while loop overflow!!!!', i);}
    newGroupState[newGroupLabel] = groupStay;
    setGroupStays(newGroupState);
  }

  const formatDateString = (dateString)=>{
    // console.log('formate Date is receiving', typeof(dateString),dateString);
    let [newDate, formattedDateString] = ['', ''];
    if(typeof(dateString) == 'string'){
      newDate = new Date(dateString.replace(/-/g, '/'));
    } else if(typeof(dateString) == 'object'){
      newDate = dateString.date;
      if(newDate === undefined){ // if receiving an object without a date property it must already be a date object
        newDate = dateString;
      }
    }
    formattedDateString = newDate.getFullYear() + '/' + ( newDate.getMonth() + 1 ) + '/' + newDate.getDate();
    // console.log('formatDateString is returning : ', typeof(formattedDateString), formattedDateString);
    return formattedDateString;
  }


  const generateDatesFromPet = (petStay)=>{
    console.log('generateDatesFromPet is receiving : ', petStay);
    let datesForStay = {};
    let [workingDay, releaseDay] = [new Date(formatDateString(petStay.arrivalDate)), new Date(formatDateString(petStay.releaseDate))];
    let [onEndDay, i] = [false, 0];
    while(onEndDay === false){
      // console.log('looping through adding days', workingDay, releaseDay);
      // we CANNOT use the == operator an object! it will always return false
      if(releaseDay >= workingDay && releaseDay <= workingDay) { 
        console.log('working day is release day');
        onEndDay = true;
      }
      datesForStay[formatDateString(workingDay)] = {"date": formatDateString(workingDay)};
      workingDay.setDate(workingDay.getDate() + 1); //increment date counter
      i++; //increment backup dev counter
      if(i > 12){ onEndDay = true; console.log('generateDatesFromPet while loop overflow!!!');}
    }
    console.log('datesForStay : ', datesForStay);
    return datesForStay;
  }
  const createPetReservationForDate = (dateObject, petStay)=>{
    console.log('createPetReservationForDate is receiving : ', dateObject, petStay);
    let newReservationForDate = {};

    let [arrivalTime, releaseTime] = [petStay.arrivalTime, petStay.releaseTime];
    let [workingDay, arrivalDay, releaseDay] = [new Date(formatDateString(dateObject.date)), new Date(formatDateString(petStay.arrivalDate)), new Date(formatDateString(petStay.releaseDate))];
    let [allDayStay, arrivingToday, releasingToday] = [false, false, false];
    // we CANNOT use the == operator an object! it will always return false
    if( arrivalDay >= workingDay && arrivalDay <= workingDay ) { // if arrival is the working day 
      arrivingToday = true;
      releaseTime = '';
    } else if(releaseDay >= workingDay && releaseDay <= workingDay) { // if release is the working day 
      releasingToday = true;
      arrivalTime = '';
    } else{ // not arriving or leaving, so must be here all day
      allDayStay = true;
    }

    newReservationForDate = {
        "date": formatDateString(workingDay),
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
    console.log('createPetReservationForDate is returning : ' , newReservationForDate);
    return newReservationForDate;
  }

  const createReservationForDate = (dateObject, petStay)=>{
    const newPetReservationForDate = createPetReservationForDate(dateObject, petStay);
    const newReservationDate = {"date": formatDateString(dateObject.date), "kennelReservations":[newPetReservationForDate]};
    return newPetReservationForDate;
  }

  const addPetReservationToDate = (dateObject, petStay)=>{
    console.log('addPetReservationToDate is receiving : ' , dateObject, petStay);
    const newPetReservationForDate = createPetReservationForDate(dateObject, petStay);
    // if (! workingState.date){createReservationToDate()}
    // if (kennelSpaceAvailable)
    const newReservationDate = {"date": formatDateString(dateObject.date), "kennelReservations":[newPetReservationForDate]};
    console.log('addPetReservationToDate is returning : ', newPetReservationForDate);
    return newPetReservationForDate;
  }

  const processNewPet = (newPet, workingReservationsState)=>{
    console.log('processNewPet is receiving', newPet);
    let newDates = generateDatesFromPet(newPet);
    let [newReservations, successStatus] = [{}, true];
    console.log('processNewPet is about to loop over : ', newDates);
    Object.keys(newDates).map((dateKey)=>{
      // console.log('looping through date : ', dateKey,newDates[dateKey]);
      let successCheck = addPetReservationToDate(newDates[dateKey], newPet);
      if(successCheck != false){
        // newReservations[dateKey] = addPetReservationToDate(newDates[dateKey], newPet);
        newReservations[dateKey] = successCheck;
      } else{
        console.log('SUCCESS CHECK NOT MET IN processNewPet, successCheck: ', successCheck);
        return false
      }
    })
    
    console.log('processNewPet is returning', newReservations);
    if(successStatus === true){
      return newReservations;
    }

  }


  const newGroupStayHandler = (newGroup) =>{
    // console.log('newGroupHandler is receiving : ', newGroup);
    let newReservationsState = dateReservations;
    let successStatus = true;
    Object.keys(newGroup.pets).map((petKey)=>{
      console.log('pet in group is: ', newGroup.pets[petKey].petName);
      // newReservationsState = processNewPet(newGroup.pets[petKey], newReservationsState);
      let successCheck = processNewPet(newGroup.pets[petKey], newReservationsState);
      if(successCheck != false){
        newReservationsState = successCheck;
      } else{
        console.log('SUCCESS CHECK NOT MET IN newGroupStayHandler , successCheck: ', successCheck);
        return false
      }
    })


    if(successStatus === true){
      addGroupToGroupStays(newGroup);
    }

  }




  const logGroup =()=>{console.log('GroupStays is : ',groupStays)}
  const logRes =()=>{console.log('Reservations State is : ', dateReservations)}
  return (
    <div className="App">
      <button onClick={logGroup}>log groupStays</button>
      <button onClick={logRes}>log Reservations</button>

                                            {/* Maybe pass this into some kind of vaildation before setState() */}
      <AddStayForm passNewGroupStayUpScope={newGroupStayHandler} />
      <CurrentStayInfo currentStayDetails={currentStayDetails} />
      <DaysOverview reservations={dateReservations} />
      
    </div>
  );


}

export default App;




