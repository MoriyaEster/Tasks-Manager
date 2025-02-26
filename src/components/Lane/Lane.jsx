import "./Lane.css"
import Task from "../Task/Task";
import { nanoid } from 'nanoid'
import { useDroppable } from "@dnd-kit/core";



export default function Lane(props) {

    const { setNodeRef } = useDroppable({
        id: props.id
    })

    return (
        <div className="lane" ref={setNodeRef}>
            <header>
                <h1>{props.tittle}</h1>
            </header>

            {props.tasks.map(task => {
                return (
                    <Task
                        key={task.id}
                        id={task.id}
                        tittle={task.tittle}
                        body={task.body}
                        time={task.time}
                        laneId={task.laneId}
                        handleApproveTask={props.handleApproveTask}
                        handleDeleteTask={props.handleDeleteTask}
                    />
                )
            })}
        </div>
    )
}