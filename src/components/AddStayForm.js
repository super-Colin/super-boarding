

const AddStayForm = () => {
    const handler = (e)=>{
        e.preventDefault();
        console.log('form input is:', e)
    }
    return (
        <form className="addStayForm_container" onSubmit={handler}>
            <h1>Add Stay</h1>
            <label htmlFor="addStay-petName">Pet Name</label>
            <input id="addStay-petName" type="text" />
            <br />
            <br />

            <label htmlFor="addStay-arrivalDate">Arrival Date</label>
            <input id="addStay-arrivalDate" type="date" />

            <label htmlFor="addStay-arrivalTime">Arrival Time</label>
            {/* <input id="addStay-arrivalTime" type="number" step="0.5" min="0" max="24" /> */}
            <input id="addStay-arrivalTime" type="time" />
            <br />
            <br />

            <label htmlFor="addStay-releaseDate">Release Date</label>
            <input id="addStay-releaseDate" type="date" />

            <label htmlFor="addStay-releaseTime">Release Time</label>
            <input id="addStay-releaseTime" type="time" />
            <br />
            <br />

            <label htmlFor="addStay-petNotes">Pet Notes</label>
            <br />
            <textarea id="addStay-petNotes" placeholder="Notes, medical or otherwise" />
            {/* <input id="addStay-petNotes" type="textarea" /> */}
            <button formAction="submit">Submit</button>
        </form>
    )
}

export default AddStayForm
