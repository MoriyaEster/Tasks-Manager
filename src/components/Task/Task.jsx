import "./Task.css"

export default function Task(props) {

    return (
        <div
            className="task"
            draggable
            onDragStart={(event) => props.handleOnDragStart(event, props.id)}
        >
            <h2>{props.tittle}</h2>
            <h3>{props.body}</h3>
            <button
                className="delete-button"
                onClick={() => props.handleDeleteTask(props.id)}
            >
                Delete
            </button>
            <button
                className="approve-button"
                onClick={() => props.handleApproveTask(props.id)}
            >
                Approve
            </button>
        </div>
    )
}