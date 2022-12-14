import { useState } from 'react';
import Comments from './Comments';
import Options from './Options';
import "../css/TaskCard.css"
import tick from "../assets/images/tick.png"
import archive from "../assets/images/archive.png"

const TaskCard = ({ task, functions, taskNum }) => {

    const [comments, showComments] = useState(false)

    return (
        <div className={comments ? "taskCard selected" : "taskCard"} onClick={(evt) => { showComments(!comments) }}>
            <div className="taskcard-banner">
                <p className="taskcard-icon taskcard-number">{taskNum}. </p>
                <p className="taskcard-name">{task.title}</p>
                <p className="taskcard-date">{task.date}</p>
                <div className="taskcard-icon">
                    {task.done
                        ? <img id="icon" src={tick} alt="(d)" />
                        : null}
                </div>
                <div className="taskcard-icon">
                    {task.archived
                        ? <img id ="icon" src={archive} alt="(a)" />
                        : null}
                </div>
            </div>

            {comments
                ? <Comments className="comments" task={task} functions={functions} />
                : null
            }
            {comments
                ? <Options task={task} functions={functions} />
                : null
            }

        </div>

    )
}

export default TaskCard;