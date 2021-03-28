import {useState} from 'react';

const AddStayForm = () => {
    const [groupName, setGroupName]= useState('');
    const [petName, setPetName]= useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [releaseTime, setReleaseTime] = useState('');
    const [petNotes,setPetNotes] = useState('');
    const [kennelSize,setKennelSize] = useState('');


    const setInputInvalid = (elem)=>{
        elem.classList.add('invalidInput');
        elem.setAttribute("isvalid", "false");
    }
    const setInputValid = (elem)=>{
        elem.classList.remove('invalidInput');
        elem.setAttribute("isvalid", "true")
    }
    const nameValidation = (elem, elemNameState, nameMinLength)=>{
        if(elemNameState.length < nameMinLength){
            setInputInvalid(elem);
            return `Please use a name with at least ${nameMinLength} letters`;
        }else{
            setInputValid(elem);
            return 'valid';
        }
    }
    const groupNameValidation = ()=>{
        let groupNameElem = document.getElementById('addStay-groupName');
        nameValidation(groupNameElem, groupName, 4)
        
    }
    const petNameValidation = ()=>{
        let petNameElem = document.getElementById('addStay-petName');
        if(petName.length < 2){
            setInputInvalid(petNameElem);
            return 'Please use a name with at least 4 letters';
        }else{
            setInputValid(petNameElem);
            return 'valid';
        }
    }
    const validateAll = (e)=>{
        
        let errors = [];

        const groupNameElem = document.getElementById('addStay-groupName');
        const petNameElem = document.getElementById('addStay-petName');
        errors.push( nameValidation(groupNameElem, groupName, 4) );
        errors.push( nameValidation(petNameElem, petName, 2) );
        
        // console.log('form input is:', e)
        // console.log('group name is', groupName);
        // console.log('pet name is', petName);
        // console.log('pet name length is', petName.length);
        // console.log('arrival date is', arrivalDate);
    }

    const areDatesSameDay = (dateString1, dateString2) =>{
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);
        // We are assuming that there will never be a stay that ends on the same day and month of another year
        if(date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() ){
            return true;
        }
        return false
    }


    const submitHandler = (e)=>{
        e.preventDefault();
        const petsInStay = [];

        const petDetails = {
            "petName": petName,
            "kennelSize": kennelSize,
            "note": petNotes,
            "arrivalDate": arrivalDate,
            "arrivalTime": arrivalTime,
            "releaseDate": releaseDate,
            "releaseTime": releaseTime,
            "singleDayStay": areDatesSameDay(arrivalDate, releaseDate)
        }
        petsInStay.push(petDetails);

        const ouputJSON = {
        "groupName": "basic",
        "pets": petsInStay
        }

        console.log(ouputJSON);
    }



    return (
        <form className="addStayForm_container" onSubmit={submitHandler}>
            <h1>Add Stay</h1>
            
            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-groupName">Group Name</label>
                <input required id="addStay-groupName" type="text" minLength="4" value={groupName} onChange={(e)=> setGroupName(e.target.value)} />
                <span style={{"display":"none"}} id="addStayForm-groupNameReport"></span>
            </div>
            <br />

            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-petName">Pet Name</label>
                <input required id="addStay-petName" type="text" minLength="2" value={petName} onChange={(e)=> setPetName(e.target.value)} />
                <span style={{"display":"none"}} id="addStayForm-groupNameReport"></span>
            </div>
            <br />

            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-arrivalDate">Arrival Date</label>
                <input required id="addStay-arrivalDate" type="date" value={arrivalDate} onChange={(e)=> setArrivalDate(e.target.value)} />

                <label htmlFor="addStay-arrivalTime">Arrival Time</label>
                <input required id="addStay-arrivalTime" type="time" value={arrivalTime} onChange={(e)=> setArrivalTime(e.target.value)} />
                <span style={{"display":"none"}} id="addStayForm-groupNameReport"></span>
            </div>
            <br />


            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-releaseDate">Release Date</label>
                <input required id="addStay-releaseDate" type="date"  value={releaseDate} onChange={(e)=> setReleaseDate(e.target.value)}  />

                <label htmlFor="addStay-releaseTime">Release Time</label>
                <input required id="addStay-releaseTime" type="time" value={releaseTime} onChange={(e)=> setReleaseTime(e.target.value)} />
                <span style={{"display":"none"}} id="addStayForm-groupNameReport"></span>
            </div>
            <br />




            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-kennelSize">Kennel Size</label>
                <br />
                <select required id="addStay-kennelSize" value={kennelSize} onChange={(e)=> setKennelSize(e.target.value)}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>



            <div className="addStayForm_inputWrapper">
                <label htmlFor="addStay-petNotes">Pet Notes</label>
                <br />
                <textarea id="addStay-petNotes" placeholder="Notes, medical or otherwise" value={petNotes} onChange={(e)=> setPetNotes(e.target.value)} />
            </div>

            <br />
            <button formAction="submit">Submit</button>
        </form>
    )
}

export default AddStayForm
