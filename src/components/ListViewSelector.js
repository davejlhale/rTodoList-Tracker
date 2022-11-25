import '../css/ListViewSelector.css'

const ListViewSelector = ({ todoListToggle,archivedListToggle, onClickHandler }) => {

    return (
      <div id="view-selctor-wrapper">
        <button className={todoListToggle ? "list-on" : "list-off"} onClick={() => onClickHandler("todo")}>Current TODO's</button>
        <button className={archivedListToggle ? "list-on" : "list-off"}  onClick={() => onClickHandler("archived")} >Archived</button>
      </div>
    )
  
  }
  

  export default ListViewSelector;