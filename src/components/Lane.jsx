import { LaneStyled, LaneHeader, LaneTitle } from "./styles/Lane.styled";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

export default function Lane(props) {

    const { setNodeRef } = useDroppable({
        id: props.id
    })

    return (
        <LaneStyled ref={setNodeRef}>
            <LaneHeader>
                <LaneTitle>{props.title}</LaneTitle>
            </LaneHeader>

            {props.tasks.map(task => {

                return (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        body={task.body}
                        time={task.time}
                        laneId={task.laneId}
                    />
                )
            })}
        </LaneStyled>
    )
}