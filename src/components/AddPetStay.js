import {useState} from 'react';

const AddPetStay = () => {

    const [petName, setPetName] = useState('');
    const [kennelSize, setKennelSize] = useState('');
    const [petNotes, setPetNotes] = useState('');

    
    return (
        <form id="addStay-form" className="addStay_container" onSubmit="some">

            <div>
                <label>Pet Name</label>
                <input id="addStay-petName" name="addStay-petName" type="text" placeholder="Pet Name" />
            </div>

            <div>
                <label>Pet Notes</label>
                <input id="addStay-petNotes" name="addStay-petNotes" type="textarea" placeholder="Pet Notes, Medical or otherwise" />
            </div>

            <div>
                <label>Kennel Size</label>
                <input id="addStay-kennelSize" name="addStay-kennelSize" type="text" placeholder="Pet Name" />
            </div>
            
        </form>
    )
}

export default AddPetStay
