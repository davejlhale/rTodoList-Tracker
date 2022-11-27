import DatePicker from 'react-date-picker';
import { useState } from 'react';
import "../css/NewCardInput.css"

const NewCardInput = ({ taskCardsArray, updateArray }) => {
 
    const [val, setVal] = useState("");
    const [value, onChange] = useState(new Date());
    const handleTrack = () => {
 const id= taskCardsArray.length || 0;
        if (val.length !== 0) {
            console.log("date",value)
            let newCard = {
                id: id,
                title: val,
                date: value.toDateString()|| new Date().toDateString(),
                done: false,
                archived: false,
                comments: ""
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
           
            <button className="add-task opt-button"
                onClick={() => { handleTrack(); }}  >
                Add Task
            </button>

        </div>
    )

}

export default NewCardInput;

