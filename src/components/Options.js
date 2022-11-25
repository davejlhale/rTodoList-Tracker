import "../css/Options.css"

const Options = ({ functions, task }) => {
    const toggleDone = (evt) => {
      console.log("done toggle")
      if (task.archived) {
         task.archived =!task.archived;
      }
      task.done = !task.done;
  
    }
    return (
      <div className="task-options">
        {!task.done
          ? <button className="opt-button" onClick={(evt) => toggleDone(evt)}> done</button>
          : !task.archived ? <button className="opt-button" onClick={(evt) => toggleDone(evt)}> redo</button> :null
        }
  
        {task.done ? null : <button> edit</button>}
        <button className="opt-button" onClick={(evt) => functions.deleteCard(evt, task)}> delete</button>
        {task.done
          ? <button className="opt-button" onClick={(evt) => functions.archiveCard(evt, task)}> {task.archived
            ? "restore"
            : "archive"}
          </button>
          : null}
      </div>
    )
  }
export default Options;  