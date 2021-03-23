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


const dates = [
  {
    "date":"3/16/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "stays":[
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
    "date":"3/17/21",
    "smallAvailable":true,
    "mediumAvailable":true,
    "largeAvailable":true,
    "stays":[
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
    "stays":[
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

]


  return (
    <div className="App">
      <AddPetStay />
      {console.log('top level dates:', dates)}
      <DaysOverview dates={dates} kennelSettings={kennelSettings} />
    </div>
  );


}

export default App;
