import {useState} from 'react';

const AddStayForm = () => {
    const [groupName, setGroupName]= useState('');
    const [petName, setPetName]= useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [releaseTime, setReleaseTime] = useState('');
    const [petNotes,setPetNotes] = useState('');

    const validateInput = (validationCallback) =>{
        const validationOutput = validationCallback();
        const errorOutputElem = document.getElementById('addStay-errorReport');
        if( validationOutput !== 'valid' ){
            errorOutputElem.style.display = 'block';
            errorOutputElem.innerHTML=validationOutput + '!';            
        } else{
            errorOutputElem.style.display = 'none';
        }
    };

    const groupNameValidation = ()=>{
        let groupNameElem = document.getElementById('addStay-groupName');
        if(groupName.length === 0 || groupName.length < 4){
            groupNameElem.classList.add('invalidInput');
            groupNameElem.setAttribute("isvalid", "false");
            return 'Please use a group name with at least 4 letters';
        }else{
            groupNameElem.classList.remove('invalidInput');
            groupNameElem.setAttribute("isvalid", "true")
            return 'valid'
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        validateInput(groupNameValidation);
        
        console.log('form input is:', e)
        console.log('pet name is', petName);
        console.log('pet name length is', petName.length);
        console.log('arrival date is', arrivalDate);
    }
    return (
        <form className="addStayForm_container" onSubmit={submitHandler}>
            <h1>Add Stay</h1>
            <label htmlFor="addStay-groupName">Group Name</label>
            <input id="addStay-groupName" type="text" value={groupName} onChange={(e)=> setGroupName(e.target.value)} />
            <br />
            <br />

            <label htmlFor="addStay-petName">Pet Name</label>
            <input id="addStay-petName" type="text" value={petName} onChange={(e)=> setPetName(e.target.value)} />
            <br />
            <br />

            <label htmlFor="addStay-arrivalDate">Arrival Date</label>
            <input id="addStay-arrivalDate" type="date" value={arrivalDate} onChange={(e)=> setArrivalDate(e.target.value)} />

            <label htmlFor="addStay-arrivalTime">Arrival Time</label>
            {/* <input id="addStay-arrivalTime" type="number" step="0.5" min="0" max="24" /> */}
            <input id="addStay-arrivalTime" type="time" value={arrivalTime} onChange={(e)=> setArrivalTime(e.target.value)} />
            <br />
            <br />

            <label htmlFor="addStay-releaseDate">Release Date</label>
            <input id="addStay-releaseDate" type="date"  value={releaseDate} onChange={(e)=> setReleaseDate(e.target.value)}  />

            <label htmlFor="addStay-releaseTime">Release Time</label>
            <input id="addStay-releaseTime" type="time" value={releaseTime} onChange={(e)=> setReleaseTime(e.target.value)} />
            <br />
            <br />

            <label htmlFor="addStay-petNotes">Pet Notes</label>
            <br />
            <textarea id="addStay-petNotes" placeholder="Notes, medical or otherwise" value={petNotes} onChange={(e)=> setPetNotes(e.target.value)} />
            {/* <input id="addStay-petNotes" type="textarea" /> */}
            <br />
            <span style={{"display":"none"}} id="addStay-errorReport"></span>
            <button formAction="submit">Submit</button>
        </form>
    )
}

export default AddStayForm
