import "./Lane.css"
import Task from "../Task/Task";
import { nanoid } from 'nanoid'



export default function Lane(props) {

    return (
        <div
            className="lane"
            onDragOver={props.handleDragOver}
            onDrop={(event) => props.handleOnDragEnd(event, props.id)}
        >
            <header>
                <h1>{props.tittle}</h1>
            </header>

            {props.tasks.map(task => {
                return (
                    <Task
                        key={nanoid()}
                        id={task.id}
                        tittle={task.tittle}
                        body={task.body}
                        time={task.time}
                        laneId={task.laneId}
                        handleOnDragStart={props.handleOnDragStart}
                        handleApproveTask={props.handleApproveTask}
                        handleDeleteTask={props.handleDeleteTask}
                    />
                )
            })}
        </div>
    )
}