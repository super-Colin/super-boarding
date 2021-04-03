import {useState} from 'react';

const AddStayForm = ({passNewGroupStayUpScope}) => {
    const [groupName, setGroupName]= useState('Group from form');
    const [petName, setPetName]= useState('Mr. Kitty');
    const [arrivalDate, setArrivalDate] = useState('2021-03-16');
    const [arrivalTime, setArrivalTime] = useState('09:15');
    const [releaseDate, setReleaseDate] = useState('2021-03-19');
    const [releaseTime, setReleaseTime] = useState('17:00');
    const [petNotes,setPetNotes] = useState('heres some notes');
    const [kennelSize,setKennelSize] = useState('medium');




    const areDatesSameDay = (dateString1, dateString2) =>{
        const date1 = new Date(dateString1);
        const date2 = new Date(dateString2);
        // We are assuming that there will never be a stay that ends on the same day and month of another year
        if(date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() ){
            return true;
        }
        return false
    }


    const addStaySubmitHandler = (e)=>{
        e.preventDefault();
        const petsInStay = [];
        
        let unformattedArrivalDate =arrivalDate.replace(/-/g, '/');
        unformattedArrivalDate = new Date(unformattedArrivalDate);
        let formattedArrivalDate = unformattedArrivalDate.getFullYear() + '/' + (unformattedArrivalDate.getMonth() + 1) + '/' +  unformattedArrivalDate.getDate()
        let unformattedReleaseDate = releaseDate.replace(/-/g, '/');
        unformattedReleaseDate = new Date(unformattedReleaseDate);
        let formattedReleaseDate = unformattedReleaseDate.getFullYear() + '/' + (unformattedReleaseDate.getMonth() + 1) + '/' +  unformattedReleaseDate.getDate()
        
        const petDetails = {
            "petName": petName,
            "kennelSize": kennelSize,
            "notes": petNotes,
            "arrivalDate": formattedArrivalDate,
            "arrivalTime": arrivalTime,
            "releaseDate": formattedReleaseDate,
            "releaseTime": releaseTime,
            "singleDayStay": areDatesSameDay(arrivalDate, releaseDate)
        }
        petsInStay.push(petDetails);

        const ouputJSON = {
        "groupName": groupName,
        "pets": petsInStay
        }

        console.log('addForm is passing up:', ouputJSON);
        // return ouputJSON;
        passNewGroupStayUpScope(ouputJSON);
    }

    return (
        <form className="addStayForm_container" onSubmit={addStaySubmitHandler}>
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
