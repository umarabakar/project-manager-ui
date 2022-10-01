import React, { useEffect, useState } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Filter = ({list, title, setIsListOpen, isListOpen}) => {

 
    const [headerTitle, setHeaderTitle] = useState(title);

    const selectItem = (item) => {
        const { title, id, key } = item;
      }

      const toggleList = () => {
    
       setIsListOpen(prevState => {
        console.log(prevState)
        return !prevState;
        });
      }

      // window.addEventListener('mouseup', (e) => {
      //   const dropdown = document.getElementById('filter-list');
      //   const dropbtn = document.getElementById('dd-button');
      //   if (e.target != dropdown && e.target.parentNode != dropdown && e.target != dropbtn && e.target.parentNode != dropbtn){
      //     setIsListOpen(false); 
      //   }
      // })

      return (
        <div className="dd-wrapper">
          <button
           id="dd-button"
            type="button"
            className="filter-btn"
            onClick={toggleList}
          >
            <div className="dd-header-title mt-1 mr-2">{headerTitle}</div>
          </button>
          {isListOpen && (
            <div
              id='filter-list'
              role="list"
              className="filter-list"
            >
              {list.map((item, index) => (
                <button
                  type="button"
                  className="filter-list-item"
                  key={`filter-data${index}${item.id}`}
                  onClick={() => selectItem(item)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )
}

export default Filter;