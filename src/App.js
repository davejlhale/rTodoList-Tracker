import './css/App.css';
import React, { useState } from 'react';
import TaskCard from './components/TaskCard';
import ListViewSelector from './components/ListViewSelector';
import NewCardInput from './components/NewCardInput';

/*  datepicker 
     https://github.com/wojtekmaj/react-calendar 
 */
// 


//app controls moving to archived list
// "" deleting card
function App() {

  const [taskCardsArray, setTaskCardsArray] = useState(() => {

    try {
      let s = JSON.parse(localStorage?.getItem("taskCards")) || [];
      console.log(s)
      return s
    }
    catch (err) {
      console.error(err);
    }
  });

  const [archivedCardsArray, setArchievedCardsArray] = useState(() => {
    try {
      let s = JSON.parse(localStorage?.getItem("archivedCards")) || []
      console.log(s)
      return s
    }
    catch (err) {
      console.error(err);
    }
  });
  const [todoListToggle, setTodoListToggle] = useState(true)
  const [archivedListToggle, setArchivedListToggle] = useState(false)
  const [dragItem, setDragItem] = useState();

  React.useEffect(() => {
    const temp = JSON.stringify(taskCardsArray)
    console.log("saving")
    localStorage.setItem("taskCards", temp)
  }, [taskCardsArray])

  React.useEffect(() => {
    const tempArch = JSON.stringify(archivedCardsArray)
    console.log("saving archived")
    localStorage.setItem("archivedCards", tempArch)
  }, [archivedCardsArray])

  //obj to hold tackcard functionality
  const cardFuncs = {
    deleteCard: function (evt, task) {
      let tmpArray = []
      task.archived
        ? tmpArray = [...archivedCardsArray]
        : tmpArray = [...taskCardsArray]

      const arrayIndex = tmpArray.indexOf(task)
      if (arrayIndex > -1) {
        let answer = window.confirm("Delete?");
        if (answer)
          tmpArray.splice(arrayIndex, 1)
      }
      task.archived
        ? setArchievedCardsArray(tmpArray)
        : setTaskCardsArray(tmpArray)
      console.log("delete task");
    },

    archiveCard: function (evt, task) {
      let tcArray = [...taskCardsArray]
      let acArray = [...archivedCardsArray]

      if (!task.archived) {
        const arrayIndex = tcArray.indexOf(task)
        if (arrayIndex > -1) {
          acArray.push(tcArray.splice(arrayIndex, 1)[0])
        }
      } else if (task.archived) {
        const arrayIndex = acArray.indexOf(task)
        if (arrayIndex > -1) {
          tcArray.push(acArray.splice(arrayIndex, 1)[0])
        }
      }
      task.archived = !task.archived;
      setArchievedCardsArray(acArray);
      setTaskCardsArray(tcArray);
    },

    editComments: function (task) {
      if (task.archived) {
        let acArray = [...archivedCardsArray]
        setArchievedCardsArray(acArray);
      } else {
        let tcArray = [...taskCardsArray]
        setTaskCardsArray(tcArray);
      }
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
      default:
        break;

    }
  }

  const handleDragStart = (e,index) => {
    console.log("handleDragStart",index)
    e.target.style.border="none"
    setDragItem(index);
  };
  
  const handleDragEnter = (e, index) => {
    console.log("index over",index,dragItem)
    e.target.style.opacity=".5"
    const newList = [...taskCardsArray];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setTaskCardsArray(newList);
  };
  
  const handleDragLeave = (e) => {
    console.log("s")
    e.target.style.opacity="1"
  };
  
  const handleDrop = (e,index) => {
    console.log("handle drop",index)
    e.target.style.opacity="1"
  };

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
      <div className="view-wrapper">
        <NewCardInput taskCardsArray={taskCardsArray} updateArray={setTaskCardsArray} />

        <ListViewSelector todoListToggle={todoListToggle} archivedListToggle={archivedListToggle} onClickHandler={onToggleList} />
        {todoListToggle ?


          <div id="taskCards-wrapper">
            {taskCardsArray.map((task, index) => {
              return  (<div  draggable 
                key={index} 
                onDragStart={(e) => handleDragStart(e,index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e,index)}
              onDragOver={(e) => { e.preventDefault()}} 
              >
                <TaskCard  
              key={index} 
              functions={cardFuncs} 
              taskNum={index} 
              task={task} 
              onClick={(e) => handleDragStart(index)}
              
              />
              
              </div>)
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
