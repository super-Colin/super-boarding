import {useState} from 'react';

const AddStayForm = ({passNewGroupStayUpScope}) => {
    const [groupName, setGroupName]= useState('Group from form');
    const [petName, setPetName]= useState('Mr. Kitty');
    const [arrivalDate, setArrivalDate] = useState('2021/03/16');
    const [arrivalTime, setArrivalTime] = useState('09:15');
    const [releaseDate, setReleaseDate] = useState('2021/03/19');
    const [releaseTime, setReleaseTime] = useState('17:00');
    const [petNotes,setPetNotes] = useState('heres some notes');
    const [kennelSize,setKennelSize] = useState('medium');
        const boilerplatePetDetails = {
            // "formKey": 1,2,3..
            "petName": "Mr. Kitty",
            "kennelSize": 'medium',
            "notes":'notes note notes etNote',
            "arrivalDate": '2021/03/16',
            "arrivalTime": '17:00',
            "releaseDate": '2021/03/19',
            "releaseTime": '17:00',
            "singleDayStay": false
        }
        
    const increasePetStayInputs = ()=>{
        let newState = { ...addStayFormStayState};
        let newPetStayLabel = Object.keys(newState.pets).length * Math.ceil(Math.random() * 35);
        newState.pets[newPetStayLabel] = {"formKey":newPetStayLabel , ...boilerplatePetDetails}
        setAddStayFormStayState(newState);
    }

    const [addStayFormStayState, setAddStayFormStayState] = useState({
        "groupName": "Smith",
        "groupNotes": "Here's some notes",
        "pets":{
            "1":{"formKey":1,
                ...boilerplatePetDetails
            },
        }

    })


    const updateGroupState = (e)=>{
        setAddStayFormStayState({ ...addStayFormStayState, [e.target.name]: e.target.value})
    }
    const updatePetState = (e)=>{
        // console.log('previous state is : ', addStayFormStayState)
        let newState = { ...addStayFormStayState};
        // console.log('newState is : ', newState)
        newState.pets[e.target.getAttribute('data-formkey')] = {...newState.pets[e.target.getAttribute('data-formKey')], [e.target.name]:e.target.value }
        setAddStayFormStayState(newState);
    }

    const addStaySubmitHandler = (e)=>{
        e.preventDefault();
        const petsInStay = [];

        let outputJSON = {}
        // console.log('addForm is passing up:', outputJSON);
        passNewGroupStayUpScope(outputJSON);
    }

    return (
        <form className="addStayForm_container" onSubmit={addStaySubmitHandler}>
            <h1>Add Stay</h1>
            
            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-groupName">Group Name</label>
                <input required id="addStay-groupName" type="text" minLength="4" name="groupName" value={addStayFormStayState.groupName} onChange={(e)=> updateGroupState(e) } />
            </div>

            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-groupNotes">Group Notes</label>
                <br />
                <textarea required id="addStay-groupNotes" type="text" minLength="4" name="groupNotes" value={addStayFormStayState.groupNotes} onChange={(e)=> updateGroupState(e) } />
            </div>
            <br />



            {Object.keys(addStayFormStayState.pets).map((petStayLabel)=>{

                {console.log('petStay is : ', addStayFormStayState.pets[petStayLabel])}
                return <div key={petStayLabel} className="addStayForm_petStay-container">
                    <div className="addStayForm_inputWrapper">
                        <label htmlFor="addStay-petName">Pet Name</label>
                        <input required name="petName" data-formkey={petStayLabel} type="text" minLength="2" value={addStayFormStayState.pets[petStayLabel].petName} onChange={(e)=> updatePetState(e)} />
                    </div>
                    
                </div>
                {/* /petStay form wrapper */}
            })}
            <br />
            <button onClick={increasePetStayInputs}>Add Another Pet</button>

            <br />
            <button formAction="submit">Submit</button>
            <pre>{JSON.stringify(addStayFormStayState, null, 2)}</pre>
        </form>
    )
}

export default AddStayForm
