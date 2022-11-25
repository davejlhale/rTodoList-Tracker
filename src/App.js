import './css/App.css';
import { useState } from 'react';
import TaskCard from './components/TaskCard';
import taskCardArray from './data/tasks.js'
import ListViewSelector from './components/ListViewSelector';
import NewCardInput from './components/NewCardInput';
/*  datepicker 
     https://github.com/wojtekmaj/react-calendar 
 */
// 


//app controls moving to archived list
// "" deleting card
function App() {

  const [taskCardsArray, setTaskCardsArray] = useState(taskCardArray)
  const [archivedCardsArray, setArchievedCardsArray] = useState([]);
  const [todoListToggle, setTodoListToggle] = useState(true)
  const [archivedListToggle, setArchivedListToggle] = useState(false)

  //obj to hold tackcard functionality
  const cardFuncs = {
    deleteCard: function (evt, task) {
      console.log(task)
      let tmpArray = []
      task.archived
        ? tmpArray = [...archivedCardsArray]
        : tmpArray = [...taskCardsArray]

      console.log(tmpArray)
      const arrayIndex = tmpArray.indexOf(task)
      if (arrayIndex > -1) {
        let answer = window.confirm("Delete?");
        if (answer)
          tmpArray.splice(arrayIndex, 1)
      }
      task.archived
        ? setArchievedCardsArray(tmpArray)
        : setTaskCardsArray(tmpArray)

      console.log("delete");
    },

    archiveCard: function (evt, task) {
      if (!task.archived) {
        let tcArray = [...taskCardsArray]
        let acArray = [...archivedCardsArray]

        task.archived = !task.archived;

        const arrayIndex = tcArray.indexOf(task)
        if (arrayIndex > -1) {
          acArray.push(tcArray.splice(arrayIndex, 1)[0])
          setArchievedCardsArray(acArray);
          setTaskCardsArray(tcArray);
        }
      } else if (task.archived) {
        let tcArray = [...taskCardsArray]
        let acArray = [...archivedCardsArray]

        task.archived = !task.archived;

        const arrayIndex = acArray.indexOf(task)
        if (arrayIndex > -1) {
          tcArray.push(acArray.splice(arrayIndex, 1)[0])
          setArchievedCardsArray(acArray);
          setTaskCardsArray(tcArray);
        }
      }
    },

    editCard: function (index) {
      console.log("edit");
    }
  }

  const onToggleList = (toggleList) => {
    console.log("change view", toggleList)
    switch (toggleList) {
      case "todo":
        setTodoListToggle(!todoListToggle)
        break;
      case "archived":
        setArchivedListToggle(!archivedListToggle)
        break;
        default :
        break;

    }
  }



  return (
    <div className="App">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"/>
      <div className="view-wrapper">
        <NewCardInput taskCardsArray={taskCardsArray} updateArray={setTaskCardsArray} />

        <ListViewSelector todoListToggle={todoListToggle} archivedListToggle={archivedListToggle} onClickHandler={onToggleList} />
        {todoListToggle ?
          <div id="taskCards-wrapper">
            {taskCardsArray.map((task, index) => {
              return <TaskCard key={index} functions={cardFuncs} taskNum={index} task={task} />
            })}
          </div>
          : null}

        {archivedListToggle ?
          <div id="taskCards-wrapper">
            {archivedCardsArray.map((task, index) => {
              return <TaskCard key={index} functions={cardFuncs} taskNum={index} task={task} />
            })}
          </div>
          : null}

      </div>
    </div>
  );
}

export default App;
