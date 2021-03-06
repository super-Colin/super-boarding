import {useState} from 'react';
import AddStayForm from './components/AddStayForm';
import DaysOverview from './components/DaysOverview/DaysOverview';
import CurrentStayInfo from './components/CurrentStayInfo';

// // Mock Database
import settings from './mockDbSettings.json';
// import stays from './mockDbStays.json';
// // import reservations from './mockDbReservations.json'
// import reservations from './mockDbReservations_empty.json'


import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './actions/index'

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
  const [proccessPetErrorState, setproccessPetErrorState] = useState({})

  const addGroupToGroupStays = (groupStay)=>{
    let newGroupState = groupStays;
    let [groupIsDuplicate, i] = [true, 1];
    let newGroupLabel = groupStay.groupName + '-' + i;
    while(groupIsDuplicate === true && i < 99){
      if(! groupStays[newGroupLabel]){ // if group is NOT already in db
        groupIsDuplicate = false
      }else {newGroupLabel = groupStay.groupName + '-' + i;}
      i++;
    }
    if(i > 50){console.log('addGroupToGroupStays while loop overflow!!!!', i);}
    newGroupState[newGroupLabel] = groupStay;
    console.log('label for group is : ', newGroupLabel)
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

  const findFirstMissingNumber = (sortedList, index, x, maxAllowedValue)=>{
    if(sortedList[index] == x && x < maxAllowedValue){
      return findFirstMissingNumber(sortedList, (index+1), (x+1), maxAllowedValue);
    }else{ return x; }
  }

  const generateDatesFromPet = (petStay)=>{
    // console.log('generateDatesFromPet is receiving : ', petStay);
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
    // console.log('datesForStay : ', datesForStay);
    return datesForStay;
  }
  const createPetReservationForDate = (dateString, petStay, kennelIdToReserve)=>{
    // console.log('createPetReservationForDate is receiving : ', dateString, petStay);
    let [arrivalTime, releaseTime] = [petStay.arrivalTime, petStay.releaseTime];
    let [workingDay, arrivalDay, releaseDay] = [new Date(dateString), new Date(formatDateString(petStay.arrivalDate)), new Date(formatDateString(petStay.releaseDate))];
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
    const newPetReservationForDate = {
          "kennelId": kennelIdToReserve,
          "kennelSize": petStay.kennelSize,
          "groupName": petStay.groupName,
          "petName": petStay.petName,
          "allDayStay": allDayStay,
          "arrivingToday":arrivingToday,
          "releasingToday":releasingToday,
          "arrivalTime": petStay.arrivalTime,
          "releaseTime": petStay.releaseTime,
          "notes": petStay.notes
    };
    // console.log('createPetReservationForDate is returning : ' , newPetReservationForDate);
    return newPetReservationForDate;
  }

  const getFirstAvailableIdOfKennelSize = (workingDateReservationsObject, kennelSizeNeeded)=>{
    // console.log('getFirstAvailable is working with state :', workingDateReservationsObject);
    const maxReservationsOfSize = workingDateReservationsObject[kennelSizeNeeded + 'Total'];
    const kennelReservationsOfSize = workingDateReservationsObject.kennelReservations.filter( reservation => reservation.kennelSize == kennelSizeNeeded );
    console.log('Available : ', maxReservationsOfSize,'Taken : ', kennelReservationsOfSize.length);
    if(maxReservationsOfSize <= kennelReservationsOfSize.length){
      console.log('kennel size is full!');
      // alert('kennel size is full!');
      const errorStateObj = {proccessPetErrorState, "getFirstAvailableIdOfKennelSize":`Kennel size ${kennelSizeNeeded} is full`}
      setproccessPetErrorState(errorStateObj);
      return false;
    }else{
      let kennelIdsReserved = [];
      kennelReservationsOfSize.map((reservationsOfSize)=>{ // loop through taken kennels and store ID to find lowest
        kennelIdsReserved.push(reservationsOfSize.kennelId);
      });
      if(kennelIdsReserved.length == 0){kennelIdsReserved.push(0)}
      // console.log('reserved Ids : ', kennelIdsReserved);
      let idToReserve = findFirstMissingNumber(kennelIdsReserved, 0, 1, maxReservationsOfSize);
      console.log('next Id to reserve is: ', idToReserve);
      return idToReserve;
    }
  }

  const createReservationsForDate = (dateString, petStay)=>{
    const newPetReservationForDate = createPetReservationForDate(dateString, petStay, 1);
    const newReservationsDate = {
      "date": dateString,
      ...emptyDateKennelSizesBoilerplate(),
      "kennelReservations":[ newPetReservationForDate ]
    };
    // console.log('createReservationsForDate is returning : ', newReservationsDate);
    return newReservationsDate;
  }


  const addPetReservationToDate = (dateString, petStay, workingReservationsState)=>{// :::FOR EACH DATE IN RANGE
    // console.log('addPetReservationToDate is receiving : ' , dateString, petStay);
    let newDateState = {};
    let successStatus = true;

    if(workingReservationsState[dateString]){ // :::CHECK FOR DATE IN RESERVATIONS
      // console.log('addPetReservationToDate found day :', workingReservationsState[dateString]);
      newDateState = workingReservationsState[dateString];
      const kennelIdToReserve = getFirstAvailableIdOfKennelSize(workingReservationsState[dateString], petStay.kennelSize, workingReservationsState);
      const successCheck = createPetReservationForDate(dateString, petStay, kennelIdToReserve);

      if(successCheck === false){
        const errorStateObj = {proccessPetErrorState, "addPetReservationToDate":`successCheck = getFirstAvailableIdOfKennelSize() didn't resolve: ${successCheck}`};
        setproccessPetErrorState(errorStateObj);
        return false;
      }
      if(kennelIdToReserve === false){
        const errorStateObj = {proccessPetErrorState, "addPetReservationToDate":`kennelIdToReserve = createPetReservationForDate() didn't resolve: ${kennelIdToReserve}`}
        setproccessPetErrorState(errorStateObj);
        return false;
      }
      
      // console.log('about to push:', successCheck,' to : ', newDateState);
      newDateState.kennelReservations.push(successCheck);
      
    }else{ // :::CREATE DATE IN RESERVATIONS
      
      const successCheck = createReservationsForDate(dateString, petStay, workingReservationsState);
      if(successCheck === false){
        console.log('SUCCESS CHECK NOT MET IN addPetReservationToDate, successCheck: ', successCheck);
        successStatus = false;
          const errorStateObj = {proccessPetErrorState, "addPetReservationToDate":`successCheck = createReservationsForDate() didn't resolve: ${successCheck}`}
          setproccessPetErrorState(errorStateObj);
        return false;
      }else{
        newDateState = successCheck;
      }

    }

    if(successStatus !== false){
      console.log('addPetReservationToDate successStatus: ', successStatus, 'passing on: ', newDateState);
      return newDateState;
    } else{
      console.log('addPetReservationToDate falied. successStatus: ', successStatus);
      
      return false;
    }
  }


  const processNewPet = (newPet, workingReservationsState)=>{
    // console.log('processNewPet is receiving', newPet);
    let newDates = generateDatesFromPet(newPet); // :::GENERATE RANGE OF DATES
    let [newReservations, successStatus] = [{}, true];
    // console.log('processNewPet is about to loop over : ', newDates);
    Object.keys(newDates).map((dateKey)=>{ // :::FOR EACH DATE IN RANGE
      // console.log('looping through date : ', dateKey,newDates[dateKey]);
      let successCheck = addPetReservationToDate(dateKey, newPet, workingReservationsState);
      if(successCheck === false){
        console.log('SUCCESS CHECK NOT MET IN processNewPet, successCheck: ', successCheck);
        successStatus = false;
          const errorStateObj = {proccessPetErrorState, "processNewPet":`successCheck = addPetReservationToDate() didn't resolve: ${successCheck}`}
          setproccessPetErrorState(errorStateObj);
          return false;
        // return workingReservationsState;
      } else{
        newReservations[dateKey] = successCheck;
      }
    })
    if(successStatus !== false){
      // console.log('processNewPet is returning', newReservations);
      return newReservations;
    }else{

      return false;
    }

  }


  const newGroupStayHandler = (newGroup) =>{
    // console.log('newGroupHandler is receiving : ', newGroup);
    let newReservationsState = dateReservations;
    let successStatus = true;
    setproccessPetErrorState()

    Object.keys(newGroup.pets).map((petKey)=>{ // :::FOR EACH PET
      // console.log('pet in group is: ', newGroup.pets[petKey].petName);
      const successCheck = processNewPet(newGroup.pets[petKey], newReservationsState);
      if(successCheck == false){
        console.log('SUCCESS CHECK NOT MET IN newGroupStayHandler , successCheck: ', successCheck);
        setproccessPetErrorState({...proccessPetErrorState, "newGroupStayHandler":`successCheck = processNewPet() didn't resolve: ${successCheck}`});
        successStatus = false
      } else{
        newReservationsState = successCheck;
      }
    });

    if(successStatus === true){
      console.log('Updating STATE with: ', newReservationsState, successStatus);
      setproccessPetErrorState({'reset':'successful update'})
      addGroupToGroupStays(newGroup);
      setDateReservations(newReservationsState)
    }else{
      // setproccessPetErrorState({proccessPetErrorState,'touched':true})
      // alert('something went wrong');
      console.log('DIDNT WORK!!!');
      console.log('proccessPetErrorState at FAIL :', proccessPetErrorState);
      // alert( JSON.stringify(proccessPetErrorState, null, 2) );
      
    }
    
    console.log('-------------------------');
    console.log('-------------------------');
  }

  // const counter = useSelector(state => state.counter);
  // const loggedIn = useSelector(state => state.logged);
  // const dispatch = useDispatch();
  return (
    <div className="App">
    
      {/* <div>
        <h1>Counter = {counter}</h1>
        <button onClick={()=>dispatch(increment(4))}>Increment</button>
        <button onClick={()=>dispatch(decrement())}>Decrement</button>
      </div> */}
      {/* {loggedIn ? <h2>Logged in</h2> : <h2>Not logged in</h2>} */}
      {settings.kennelSizes.map((size)=>{
        return(
          <p>{size.total} kennels available of size {size.size}</p>
        )
      })}
      {/* <pre>{JSON.stringify(sizesAvailable, null, 2)}</pre> */}
    
      <button onClick={()=>console.log('GroupStays is : ', groupStays)}>log groupStays</button>
      <button onClick={()=>console.log('Reservations State is : ', dateReservations)}>log Reservations</button>

                                            {/* Maybe pass this into some kind of vaildation before setState() */}
      <AddStayForm passNewGroupStayUpScope={newGroupStayHandler} />
      {/* <pre>{JSON.stringify(dateReservations, null, 2)}</pre> */}
      <pre>{JSON.stringify(proccessPetErrorState, null, 2)}</pre>

      {/* <CurrentStayInfo currentStayDetails={currentStayDetails} /> */}
      <DaysOverview reservations={dateReservations} />
      
    </div>
  );


}

export default App;




