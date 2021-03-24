import {useState} from 'react';

const AddPetStay = () => {

    const [petName, setPetName] = useState('');
    const [kennelSize, setKennelSize] = useState('');
    const [petNotes, setPetNotes] = useState('');


    const onSubmit = (event)=> {
        event.preventDefault();
        let newStay = {};
        newStay.some = "some";
        console.log('HELLO FROM SUBMIT FUNC!', newStay)
    };


    return (
        <form id="addStay-form" className="addStay_container" onSubmit={onSubmit}>

            <div>
                <label>Pet Name</label>
                <input type="text" placeholder="Pet Name" value={petName} onChange={(e)=> setPetName(e.target.value)} />
            </div>

            <div>
                <label>Kennel Size</label>
                <input type="text" placeholder="Pet Name" value={kennelSize} onChange={(e)=> setKennelSize(e.target.value)} />
            </div>

            <div>
                <label>Pet Notes</label>
                <input type="textarea" placeholder="Pet Notes, Medical or otherwise" value={petNotes} onChange={(e)=> setPetNotes(e.target.value)} />
            </div>

            <button formAction="submit">Add Stay</button>

        </form>
    )
}

export default AddPetStay
