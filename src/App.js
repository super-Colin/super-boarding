import AddPetStay from "./components/AddPetStay";
import DaysOverview from './components/DaysOverview/DaysOverview';
// const days = [
//     { id: 1, animal: "Dog" },
//     { id: 2, animal: "Bird" },
//     { id: 3, animal: "Cat" },
//     { id: 4, animal: "Mouse" },
//     { id: 5, animal: "Horse" }
// ]

const totalSmallKennels = 6;
const totalMediumKennels = 6;
const totalLargeKennels = 6;




function App() {


  const dates = [
    {"id": 1, 
    "date":"3/16/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "stays":[
      {
        "id":1,
        "groupName": "Smith",
        "dogName": "Chewbaka",
        "kennelSize": "large",
        "notes":"blah blah"
      },
      {
        "id":2,
        "groupName": "Smith",
        "dogName": "Courage",
        "kennelSize": "small",
        "notes":"blah b"
      },
      {
        "id":3,
        "groupName": "Smith",
        "dogName": "Pudge",
        "kennelSize": "medium",
        "notes":"blah blah"
      }
    ]
  },
    {"id": 2, 
    "date":"3/17/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "stays":[
      {
        "id":1,
        "groupName": "Smith",
        "dogName": "Chewbaka",
        "kennelSize": "large",
        "notes":"blah blah"
      },
      {
        "id":2,
        "groupName": "Smith",
        "dogName": "Courage",
        "kennelSize": "small",
        "notes":"blah blah"
      },
      {
        "id":3,
        "groupName": "Smith",
        "dogName": "Pudge",
        "kennelSize": "medium",
        "notes":"blah blah"
      }
    ]
  },
    {"id": 3, 
    "date":"3/18/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "stays":[
      {
        "id":1,
        "groupName": "Smith",
        "dogName": "Chewbaka",
        "kennelSize": "large",
        "notes":"blah blah"
      },
      {
        "id":2,
        "groupName": "Smith",
        "dogName": "Courage",
        "kennelSize": "small",
        "notes":"blah blah"
      },
      {
        "id":3,
        "groupName": "Smith",
        "dogName": "Pudge",
        "kennelSize": "medium",
        "notes":"blah blah"
      }
    ]
  },

]


  return (
    <div className="App">
      <AddPetStay />
      {console.log('top level dates:', dates)}
      <DaysOverview dates={dates} />
    </div>
  );


}

export default App;
