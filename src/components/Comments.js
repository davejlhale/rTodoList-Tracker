import { useState } from "react";
import "../css/Comments.css"

const Comments = ({ task, functions }) => {
  const [message, setMessage] = useState(task.comments);

  const handleMessageChange = event => {
    setMessage(event.target.value);
    task.comments = event.target.value;
  };
  const handleClicks = (event) => {     
    event.stopPropagation()
  }
    return (
      <div className="taskcard-comments" onClick={(e)=>handleClicks(e)}>
        <textarea className="comment-box" value={message} onChange={handleMessageChange}/>
      </div>
    )
  }

  export default Comments;