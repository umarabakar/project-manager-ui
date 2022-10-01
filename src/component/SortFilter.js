import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { axiosSecure } from "../api/axios";

const SortFilter = ({title, items, direction, setSortOrder, setIsListOpen}) => {

    const [isSortListOpen, setIsSortListOpen] = useState(false);

    const toggleSortList = () => {
        setIsSortListOpen(prevState => {
            console.log(prevState)
         return !prevState;
        });
    }

    const sortColumn = (column) => {

     setIsListOpen(false);
      setSortOrder({direction: direction, column: column })
    }

    return(

    <div className="sort-dd">
        <div
        className="flex items-center justify-between"
        onClick={toggleSortList}>
            <p className="sort-tag">{title}</p>
            <FontAwesomeIcon className="" icon="fa-solid fa-angle-right" size="xs" />
        </div>
       {
        isSortListOpen && (
       <div className="sort-wrapper">
            {
                items.map((header, index) => { 
                    return <div onClick={() => sortColumn(header)} key={`sort-data${index}`} className="sort-btn">{header}</div>
                })
            }
        </div>)}
    </div>
    );
}

export default SortFilter;