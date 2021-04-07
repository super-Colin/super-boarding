import {useState} from 'react';

const AddStayForm = ({passNewGroupStayUpScope}) => {
    const boilerplatePetDetails = {
        // "formKey": 1,2,3..
        "petName": "Mr. Kitty",
        "kennelSize": 'medium',
        "notes":'note note note',
        "arrivalDate": '2021-03-16',
        "arrivalTime": '17:00',
        "releaseDate": '2021-03-19',
        "releaseTime": '17:00',
        "singleDayStay": false
    }
    const [addStayFormStayState, setAddStayFormStayState] = useState({
        "groupName": "Smith",
        "groupNotes": "Here's some notes",
        "pets":{
            "1":{
                "formKey": 1,
                "groupName": "Smith",
                ...boilerplatePetDetails
            },
        }
    })
    const updateGroupState = (e)=>{
        setAddStayFormStayState({ ...addStayFormStayState, [e.target.name]: e.target.value})
    }
    const updatePetState = (e)=>{
        let newState = { ...addStayFormStayState};
        newState.pets[e.target.getAttribute('data-formkey')] = {...newState.pets[e.target.getAttribute('data-formKey')], [e.target.name]:e.target.value }
        setAddStayFormStayState(newState);
    }

    const increasePetStayInputs = ()=>{
        let newState = { ...addStayFormStayState};
        let newPetStayLabel = Math.ceil((Object.keys(newState.pets).length * 2) * Math.random() * 1000);
        newState.pets[newPetStayLabel] = {"formKey":newPetStayLabel , ...boilerplatePetDetails}
        setAddStayFormStayState(newState);
    }
    const removePetStayInput = (e)=>{
        let newState = { ...addStayFormStayState};
        delete newState.pets[e.target.getAttribute('data-formkey')];
        setAddStayFormStayState(newState);
    }
    const addStaySubmitHandler = (e)=>{
        e.preventDefault();
        console.log('addForm is passing up:', addStayFormStayState);
        passNewGroupStayUpScope(addStayFormStayState);
    }

    return (
        <form className="addStayForm_container" onSubmit={(e)=>e.preventDefault()}>
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

                {/* {console.log('petStay is : ', addStayFormStayState.pets[petStayLabel])} */}
                return <div key={petStayLabel} className="addStayForm_petStay-container">

                <button data-formkey={petStayLabel} onClick={(e)=>{removePetStayInput(e)}}>Remove</button>

                    <div className="addStayForm_inputWrapper">
                        <label htmlFor="addStay-petName">Pet Name</label>
                        <input required name="petName" data-formkey={petStayLabel} type="text" minLength="2" value={addStayFormStayState.pets[petStayLabel].petName} onChange={(e)=> updatePetState(e)} />
                    </div>

                    <div className="addStayForm_inputWrapper">
                        <label htmlFor="addStay-arrivalDate">Arrival Date</label>
                        <input required name="arrivalDate" data-formkey={petStayLabel} type="date" data-formkey={petStayLabel} value={addStayFormStayState.pets[petStayLabel].arrivalDate} onChange={(e)=> updatePetState(e)} />

                        <label htmlFor="addStay-arrivalTime">Arrival Time</label>
                        <input required name="arrivalTime" data-formkey={petStayLabel} type="time" data-formkey={petStayLabel} value={addStayFormStayState.pets[petStayLabel].arrivalTime} onChange={(e)=> updatePetState(e)} />
                    </div>
                    <br />

                    <div className="addStayForm_inputWrapper">
                        <label htmlFor="releaseDate">Release Date</label>
                        <input required name="releaseDate" data-formkey={petStayLabel} type="date" value={addStayFormStayState.pets[petStayLabel].releaseDate} onChange={(e)=> updatePetState(e)}  />

                        <label htmlFor="releaseTime">Release Time</label>
                        <input required name="releaseTime" data-formkey={petStayLabel} type="time" value={addStayFormStayState.pets[petStayLabel].releaseTime} onChange={(e)=> updatePetState(e)} />
                    </div>
                    <br />

                    <div className="addStayForm_inputWrapper">
                        <label htmlFor="addStay-kennelSize">Kennel Size</label>
                        <br />
                        <select required name="kennelSize"  data-formkey={petStayLabel} value={addStayFormStayState.pets[petStayLabel].kennelSize} onChange={(e)=> updatePetState(e)} >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>


                    <div className="addStayForm_inputWrapper">
                        <label htmlFor="addStay-petNotes">Pet Notes</label>
                        <br />
                        <textarea  name="notes" data-formkey={petStayLabel} value={addStayFormStayState.pets[petStayLabel].notes} onChange={(e)=> updatePetState(e)} placeholder="Notes, medical or otherwise" />
                    </div>
                    <br />

                </div>
                {/* /petStay form wrapper */}
            })}

            <br />
            <button onClick={increasePetStayInputs}>Add Another Pet</button>

            <br />
            {/* <button formAction="submit">Submit</button> */}
            <button onClick={addStaySubmitHandler}>Submit</button>
            {/* <pre>{JSON.stringify(addStayFormStayState, null, 2)}</pre> */}
            <br /><br /><hr /><br /><hr /><br />
        </form>
    )
}

export default AddStayForm
