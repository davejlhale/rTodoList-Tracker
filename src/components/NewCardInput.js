import DatePicker from 'react-date-picker';
import { useState } from 'react';
import "../css/NewCardInput.css"

const NewCardInput = ({ taskCardsArray, updateArray }) => {
 
    const [val, setVal] = useState("");
    const [value, onChange] = useState(new Date());
    const handleTrack = () => {
 
        if (val.length !== 0) {
            // Do something with value
            let newCard = {
                title: val,
                date: value || new Date(),
                done: false,
                archived: false,
                comments: "...add comments"
            }
            console.log(taskCardsArray)
            let tmpArray = [...taskCardsArray]
            tmpArray.push(newCard)
            updateArray(tmpArray)
        }
    }
    const handleKeyPress = e => {
       
        if (e.key === "Enter") {
            handleTrack();
        }
    };
       
    return (
        <div id="newCard" >
            
                <input
                    val={val}
                    placeholder="...New Task"
                    type="text"
                    onChange={e => { setVal(e.target.value); }}
                    onKeyPress={handleKeyPress} >
                </input>

                <DatePicker
                className="date-picker"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date"
                    onChange={onChange}
                    value={value}
                    yearAriaLabel="Year" />
           
            <button className="add-task"
                onClick={() => { handleTrack(); }}  >
                Add Task
            </button>

        </div>
    )

}

export default NewCardInput;

