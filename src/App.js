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
  const [errorLog, setErrorLog] = useState({})
  let proccessPetErrorState = {} // Tried using a useState for this, but it's async and didn't keep with the unblocked functions

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
        // console.log('working day is release day');
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
    console.log('createPetReservationForDate is returning : ' , newPetReservationForDate);
    return newPetReservationForDate;
  }

  const getFirstAvailableIdOfKennelSize = (workingDateReservationsObject, kennelSizeNeeded)=>{
    // console.log('getFirstAvailable is working with state :', workingDateReservationsObject);
    const maxReservationsOfSize = workingDateReservationsObject[kennelSizeNeeded + 'Total'];
    const kennelReservationsOfSize = workingDateReservationsObject.kennelReservations.filter( reservation => reservation.kennelSize == kennelSizeNeeded );
    console.log( kennelSizeNeeded, 'Available : ', maxReservationsOfSize,'Taken : ', kennelReservationsOfSize.length);
    if(maxReservationsOfSize <= kennelReservationsOfSize.length){
      
      if(proccessPetErrorState.getFirstAvailableIdOfKennelSize){
        proccessPetErrorState = {...proccessPetErrorState, "getFirstAvailableIdOfKennelSize": [ ...proccessPetErrorState.getFirstAvailableIdOfKennelSize,`Kennel size ${kennelSizeNeeded} is full on ${workingDateReservationsObject.date}`]}
      }else{
        proccessPetErrorState = {...proccessPetErrorState, "getFirstAvailableIdOfKennelSize": [ `Kennel size ${kennelSizeNeeded} is full on ${workingDateReservationsObject.date}`]}
      }
      console.log('getFirstAvailableIdOfKennelSize is returning FALSE');
      return false;
    }else{
      let kennelIdsReserved = [];
      kennelReservationsOfSize.map((reservationsOfSize)=>{ // loop through taken kennels and store ID to find lowest
        kennelIdsReserved.push(reservationsOfSize.kennelId);
      });
      if(kennelIdsReserved.length == 0){kennelIdsReserved.push(0)}
      // console.log('reserved Ids : ', kennelIdsReserved);
      let idToReserve = findFirstMissingNumber(kennelIdsReserved, 0, 1, maxReservationsOfSize);
      // console.log('next Id to reserve is: ', idToReserve);
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
      if(kennelIdToReserve === false){
        proccessPetErrorState = {...proccessPetErrorState, "addPetReservationToDate":`kennelIdToReserve = createPetReservationForDate() didn't resolve: ${kennelIdToReserve}`}
        successStatus = false;
        return false;
      }

      const successCheck = createPetReservationForDate(dateString, petStay, kennelIdToReserve);
      if(successCheck === true){
        proccessPetErrorState = {...proccessPetErrorState, "addPetReservationToDate":`successCheck = getFirstAvailableIdOfKennelSize() didn't resolve: ${successCheck}`};
        // successStatus = false;
        return false;
      }
      
      // console.log('about to push:', successCheck,' to : ', newDateState);
      newDateState.kennelReservations.push(successCheck);
      
    }else{ // :::CREATE DATE IN RESERVATIONS
      
      const successCheck = createReservationsForDate(dateString, petStay, workingReservationsState);
      if(successCheck === false){
        console.log('SUCCESS CHECK NOT MET IN addPetReservationToDate, successCheck: ', successCheck);
        successStatus = false;
        proccessPetErrorState = {...proccessPetErrorState, "addPetReservationToDate":`successCheck = createReservationsForDate() didn't resolve: ${successCheck}`}
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
      console.log('addPetReservationToDate is returning FALSE');
      return false;
    }
  }


  const processNewPet = (newPet, workingReservationsState)=>{
    // console.log('processNewPet is receiving', newPet);
    let newDates = generateDatesFromPet(newPet); // :::GENERATE RANGE OF DATES
    let newReservations= {};
    let successStatus = true;
    // console.log('processNewPet is about to loop over : ', newDates);
    Object.keys(newDates).map((dateKey)=>{ // :::FOR EACH DATE IN RANGE
      // console.log('looping through date : ', dateKey,newDates[dateKey]);
      let successCheck = addPetReservationToDate(dateKey, newPet, workingReservationsState);
      if(successCheck === false){
        console.log('SUCCESS CHECK NOT MET IN processNewPet, successCheck: ', successCheck);
        successStatus = false;
        proccessPetErrorState = {...proccessPetErrorState, "processNewPet":`successCheck = addPetReservationToDate() didn't resolve: ${successCheck}`}
          return false;
        // return workingReservationsState;
      } else{
        newReservations[dateKey] = successCheck;
      }
    })
    if(successStatus === true){
      console.log('processNewPet is returning', newReservations);
      return newReservations;
      // return orderKennelReservationsArrayBySize(newReservations);
    }else{
      console.log('processNewPet is returning FALSE');
      return false;
    }

  }


  const newGroupStayHandler = (newGroup) =>{
    // console.log('newGroupHandler is receiving : ', newGroup);
    let reservationsState = dateReservations;
    let newReservationsState = reservationsState;
    let successStatus = true;
    let sortedReservationsState = '';
    // let proccessPetErrorState = {};

    Object.keys(newGroup.pets).map((petKey)=>{ // :::FOR EACH PET
      // console.log('pet in group is: ', newGroup.pets[petKey].petName);
      const successCheck = processNewPet(newGroup.pets[petKey], newReservationsState);
      if(successCheck === false || successStatus === false){
        console.log('SUCCESS CHECK NOT MET IN newGroupStayHandler , successCheck: ', successCheck);
        proccessPetErrorState = {...proccessPetErrorState, "newGroupStayHandler":`successCheck = processNewPet() didn't resolve: ${successCheck}`};
        successStatus = false;
        return false;
      } else{
        newReservationsState = successCheck;
      }
    });

    if(successStatus === true){
      console.log('Updating STATE with: ', newReservationsState, successStatus);
      const newNewState = {...dateReservations, ...newReservationsState};
      sortedReservationsState = sortDateObject(newNewState);
    }else{
      // alert('something went wrong');
      console.log('proccessPetErrorState at FAIL :', successStatus);
      console.log('proccessPetErrorState at FAIL :', proccessPetErrorState);
      successStatus = false;
      setErrorLog(proccessPetErrorState);
      return false
    }

    if(successStatus === true){ // needed to check again.. for async reasons I think
      console.log('-------');
      console.log('proccessPetErrorState at SUCCESS :', successStatus);
      addGroupToGroupStays(newGroup);
      setDateReservations(sortedReservationsState);
      proccessPetErrorState = {'reset':'successful update'}
      console.log('proccessPetErrorState at SUCCESS :', successStatus);
      console.log('-------');
      // setErrorLog(proccessPetErrorState);
    }else{
      // setErrorLog(proccessPetErrorState);
    }
      setErrorLog(proccessPetErrorState);
    console.log('-------------------------');
    console.log('-------------------------');

  }

  // function sortObject(obj){ return Object.keys(obj).sort().reduce( (accumulator, key)=> accumulator[key] = obj[key] ,{})};
  function sortObject(obj) {
    return Object.keys(obj).sort().reduce( 
      (result, key)=> {
        result[key] = obj[key];
        return result;
      },
    {});
  }
  //V Will sort according to how they sizes are ordered in the settings
  function orderKennelReservationsArrayBySize(reservationsArr) {
    console.log('Sorted KennelSizes receiving', reservationsArr);
    let sortedSizesObject = {};
    settings.kennelSizes.forEach(
      (kennelSizeSetting)=>{sortedSizesObject[kennelSizeSetting.size] = []} 
    );
    // reservationsArr.forEach((reservationForDay)=>{sortedSizesObject[reservationForDay.kennelSize].push(reservationForDay)});
    for( let reservationForDay in reservationsArr){
      console.log( 'RESERVATIONS SIZE',sortedSizesObject[ reservationsArr[reservationForDay].kennelSize ], reservationForDay)
      sortedSizesObject[reservationForDay].kennelSize.push(reservationForDay)
    }
    //Should have and object in the form of {"small":[{},{}], "medium":[{},{}]...} for all sizes
    let sortedArr = [];
    for(let reservationsArrayOfSize in sortedSizesObject){
      sortedArr.push(...reservationsArrayOfSize)
    }
    console.log('Sorted KennelSizes returning', sortedArr);
    return sortedArr;
  }
  function sortDateObject(obj) {
    return  Object.keys(obj).sort(
      (a,b)=>{return new Date(a) - new Date(b);}
    ).reduce( 
      (result, key)=> {
        result[key] = obj[key];
        return result;
      },
    {});
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
          <p>Set to total: {size.total} of size {size.size} in settings</p>
        )
      })}
      <hr />
      <pre stlye="background-color:lightred">{JSON.stringify(errorLog, null, 2)}</pre>
      <hr />
      {/* <pre>{JSON.stringify(sizesAvailable, null, 2)}</pre> */}
    
      {/* <button onClick={()=>console.log('GroupStays is : ', groupStays)}>log groupStays</button>
      <button onClick={()=>console.log('Reservations State is : ', dateReservations)}>log Reservations</button> */
      //console.log('settings dump', [...settings.kennelSizes])}
      console.log('settings dump', settings )}

                                            {/* Maybe pass this into some kind of vaildation before setState() */}
      <AddStayForm passNewGroupStayUpScope={newGroupStayHandler} />
      <hr />

      {/* <CurrentStayInfo currentStayDetails={currentStayDetails} /> */}
      <DaysOverview reservations={dateReservations} />

      
    </div>
  );


}

export default App;




