import {useState} from 'react';
import AddPetStay from "./components/AddPetStay";
import DaysOverview from './components/DaysOverview/DaysOverview';


function App() {


const kennelSettings = {
  "kennelSizes":[
    {"size":"small", "total": 6},
    {"size":"medium", "total": 6},
    {"size":"large", "total": 6}
  ]
}
const stays = [
  {
    "groupName": "Smith",
    "pets":[
      {
        "petName": "Chewbaka",
        "kennelSize": "large",
        "note":"He's a big boi",
        "arrivalDate":"3/16/21",
        "arrivalTime":"5:30PM",
        "releaseDate":"3/18/21",
        "releaseTime":"4:00PM",
        "overrides":[
          {
            // Probably should add another css class for a different color on any overridden cells
            "date":"3/17/21",
            "allDayStay":"true", // if this is an allDay we don't need an arrival and release time; try to loop around them
            "kennelSize":"medium",
            "overrideNote":"Needs to move to a medium kennel for a bit"
          }
        ]
      }
    ],
  }
];
const generateDatesFromStay= (stay)=>{};

const filterRelevantStaysForDate = (stays, date)=>{
  let relevantStays = {};
  return relevantStays;
};

const CheckIfReservationCanBeMadeOnDate = (date, kennelSizeRequired)=>{
  let kennelAvailable = true;
  return kennelAvailable;

};
const generateDateFromRelevantStays = (relevantStays)=>{
  let newDate = {};
  return newDate;
};

//I'm thinking these should be generated from the stays
const [dates,setDate] =useState( 
  [
  {
    "date":"3/16/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "kennelReservations":[
      {
        "kennelId":1,
        "allDayStay":true,
        "arrivalTime":"",
        "releaseTime":"",
        "groupName": "Smith",
        "petName": "Chewbaka",
        "kennelSize": "large",
        "notes":"blah blah"
      },
      {
        "kennelId":2,
        "allDayStay":true,
        "arrivalTime":"",
        "releaseTime":"",
        "groupName": "Smith",
        "petName": "Courage",
        "kennelSize": "small",
        "notes":"blah b"
      },
      {
        "kennelId":3,
        "allDayStay":true,
        "arrivalTime":"",
        "releaseTime":"",
        "groupName": "Smith",
        "petName": "Pudge",
        "kennelSize": "medium",
        "notes":"blah blah"
      }
    ]
  },
  {
    "date":"3/17/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "kennelReservations":[
      {
        "kennelId":1,
        "groupName": "Smith",
        "petName": "Chewbaka",
        "kennelSize": "large",
        "notes":"blah blah"
      },
      {
        "kennelId":3,
        "groupName": "Smith",
        "petName": "Pudge",
        "kennelSize": "medium",
        "notes":"blah blah"
      }
    ]
  },
  {
    "date":"3/18/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "kennelReservations":[
      {
        "kennelId":1,
        "groupName": "Smith",
        "petName": "Chewbaka",
        "kennelSize": "large",
        "notes":"blah blah"
      },
      {
        "kennelId":2,
        "groupName": "Smith",
        "petName": "Courage",
        "kennelSize": "small",
        "notes":"blah b"
      }
    ]
  },

  ]
)




  return (
    <div className="App">
      {/* <AddPetStay/> */}
      {/* {console.log('top level dates:', dates)} */}
      {/* <DaysOverview dates={dates} kennelSettings={kennelSettings} /> */}
      
    </div>
  );


}

export default App;
