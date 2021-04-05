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

  const newDateString = (dateString)=>{
    let newDate = new Date(dateString.replace(/-/g, '/'));
    return newDate.getFullYear() + '/' + ( newDate.getMonth() + 1 ) + '/' + newDate.getDate();
  }

  const processNewPet = (newPet)=>{
    console.log('processNewPet is receiving', newPet);

  }

  const newGroupStayHandler = (newGroup) =>{
    let exampleInput =  {
      "groupName": "Smith",
      "groupNotes": "Here's some notes",
      "pets":  {
        "1": { formKey: 1, groupName: "Smith", petName: "Mr. Kitty"},
        "2053": { formKey: 2053, groupName: "Smith", petName: "Mr. Kitty"},
        "3220": { formKey: 3220, groupName: "Smith", petName: "Mr. Kitty"}
      }
    }
    console.log('newGroupHandler is receiving : ', newGroup);

    let newReservationsState = dateReservations;
    let successStatus = true;
    Object.keys(newGroup.pets).map((petKey)=>{
      console.log('pet in group is: ', newGroup.pets[petKey].petName);
      processNewPet(newGroup.pets[petKey]);
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




