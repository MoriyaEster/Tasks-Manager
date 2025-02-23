import React, { useState } from 'react';
import './Popup.css';

export default function Popup(props) {
    const [tittle, setTittle] = useState('');
    const [status, setStatus] = useState(1);
    const [body, setBody] = useState('');
    const [date, setDate] = useState('');

    function handleStatus(statusValue) {
        if (statusValue === 'TODO') {
            setStatus(1);
        }
        if (statusValue === 'in progress') {
            setStatus(2);
        }
        if (statusValue === 'Review') {
            setStatus(3);
        }
        if (statusValue === 'done') {
            setStatus(4);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleAddTask(tittle, status, body, date);
        props.handleClosePopup();
    }

    return (
        <div className="popup">

            <h2>Add Task</h2>

            <form className="add-task-form" onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    required
                    value={tittle}
                    onChange={(e) => setTittle(e.target.value)}
                />

                <label>Status</label>
                <select
                    name='status'
                    value={status}
                    onChange={(e) => handleStatus(e.target.value)}
                >
                    <option value="TODO">TODO</option>
                    <option value="in progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="done">Done</option>
                </select>

                <label>Body</label>
                <textarea
                    className="input-body"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label>Date</label>
                <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button className="button-add-task" type="submit">Add</button>
                <button className="close-popup" type="button" onClick={props.handleClosePopup}>Close</button>
            </form>
        </div>
    );
}

