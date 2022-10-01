import React, { useEffect, useState } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DateFilter = ({list, title, setIsDateListOpen, isDateListOpen}) => {

 
    const [headerTitle, setHeaderTitle] = useState(title);
    const [isDateChecked, setIsDateChecked] = useState(new Array(5).fill(false));
    const [customDate, setCustomDate] = useState(false);

      const toggleList = () => {
       setIsDateListOpen(prevState => {
        console.log(prevState)
        return !prevState;
       });
      }

      const toggleCustomDate = () => {
        setCustomDate(prevState => {
         console.log(prevState)
         return !prevState;
        });   
       }
 
      const selectItem = (item) => {   
        const { title, id, key } = item;
      }

      const timeFilter = async (pos) => {
        const update = isDateChecked.map((item, index) => {
            return index === pos ? ( !item
             ) : (item ? !item : item)
         });
         console.log(update) 
      setIsDateChecked(update);
     }
 
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
          {isDateListOpen && (
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
                  onClick={() => timeFilter(index)}
                >
                  <div className='flex items-center'>
                    <input
                    id={item.key}
                    type='checkbox'
                    onChange={ () => timeFilter(index)} 
                    className="filter-box" 
                    checked ={isDateChecked[index]} />
                    <p className='ml-4'>  {item.title}</p> 
                    </div>
                </button>
              ))}
              <button className="filter-item flex items-center " onClick={toggleCustomDate}>
                <FontAwesomeIcon icon="fa-solid fa-plus" className="text-gray-400 mr-2"/>
                <p>Custom Date</p>
                </button>
                {
                  customDate && (
                    <div className="date-wrapper">
                      <div className="flex items-center custom-date">
                        <div className="">  
                          <label className="ml-2">Start Date</label>
                          <input type='date' className="pl-2" />
                        </div>
                        <FontAwesomeIcon icon="fa-solid fa-minus" className="text-black"></FontAwesomeIcon>
                        <div className="">
                          <label className="ml-2">End Date</label>
                          <input type='date' className="pl-2" />
                        </div>
                      </div>
                    <button className="date-btn">Submit</button>
                    </div>
                  )
                }
            </div>
          )}
        </div>
      )

}

export default DateFilter;