import { useState } from "react";
import "../css/Comments.css"

const Comments = ({ task, functions }) => {
  const [message, setMessage] = useState(task.comments);

  const handleMessageChange = event => {
    setMessage(event.target.value);
    task.comments = event.target.value;
    functions.editComments(task);
  };
  const handleClicks = (event) => {     
    event.stopPropagation()
  }
    return (
      <div className="taskcard-comments" onClick={(e)=>handleClicks(e)}>
        <textarea className="comment-box" placeholder="...add comments" value={message} onChange={handleMessageChange}/>
      </div>
    )
  }

  export default Comments;