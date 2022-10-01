import React, { useEffect, useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Dropdown = ({list, title}) => {

    const [isListOpen = false, setIsListOpen] = useState();
    const [headerTitle, setHeaderTitle] = useState(title);

    const dropref = useRef();
    const selectItem = (item) => {
        const { title, id, key } = item;
        setIsListOpen(false); 
      }

    const toggleList = () => {
      setIsListOpen(prevState => {
      return !prevState;
      });  
    }
  
      return (
        <div className="dd-wrapper">
          <button
           id="dd-button"
            type="button"
            className="dd-header"
            onClick={toggleList}
          
          >
            <div className="flex items-center dd-button">
            <div className="dd-header-title mt-1 mr-2">{headerTitle}</div>
            {isListOpen
              ? <FontAwesomeIcon icon="fa-angle-up" />
              : <FontAwesomeIcon icon="fa-angle-down" />}
            </div>   
          </button>
          {isListOpen && (
            <div
            ref={dropref}
              id='dd-list'
              role="list"
              className="dd-list"
            >
              {list.map((item) => (
                <button
                  type="button"
                  className="dd-list-item"
                  key={item.id}
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

export default Dropdown;