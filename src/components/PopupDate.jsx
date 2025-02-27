import React, { useState } from 'react';


export default function PopupDate(props) {

    const [date, setDate] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.handleTimeChange(date);
        props.handleClosePopup();
    }

    return (
        <div>
            <form className="change-date-form" onSubmit={handleSubmit}>
                <label>Date</label>
                <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={props.handleClosePopup}>Close</button>
            </form>
        </div >
    )
}