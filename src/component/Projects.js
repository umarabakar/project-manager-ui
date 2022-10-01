import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "./Filter";
import SortFilter from "./SortFilter";
import { axiosSecure } from "../api/axios";
import DateFilter from "./DateFilter";

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [isChecked, setIsChecked] = useState(new Array(20));
    const [isListOpen = false, setIsListOpen] = useState();
    const [isDateListOpen = false, setIsDateListOpen] = useState();
    const [order, setSortOrder] = useState({
        direction: 'asc',
        column: 'name'
    });
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [headers, setHeaders] = useState([ 'Name', 'Description', 
    'Progress', 'Status', 'Client Contact', 'Client Contact No', 'Location', 
     'Intiation Date', 'Issue Date', 'Completed Date', 'Certification Status']);
 
     
    const [date, setDate]  = useState([{
        id: 1,
        title: 'Last Day',
        selected: false,
        key: 'day'
    },
    {
        id: 2,
        title:  'Last Week',
        selected: false,
        key: 'week'
    },
    {
        id: 3,
        title: 'Last Month',
        selected: false,
        key: 'month'
    },   
     {
        id: 4,
        title:  'Last Quarter',
        selected: false,
        key: 'week'
    },    
    {
        id: 5,
        title:  'Last Year',
        selected: false,
        key: 'week'
    }]);

    const [sort, setSort]  = useState([{
        id: 1,
        title:<SortFilter items={headers} title='Sort by Ascending' direction='asc' setSortOrder={setSortOrder} setIsListOpen={setIsListOpen}/>,
        selected: false,
        key: 'day'
    },
    {
        id: 2,
        title: <SortFilter items={headers} title='Sort by Descending'  direction='desc' setSortOrder={setSortOrder} setIsListOpen={setIsListOpen}/>,
        selected: false,
        key: 'week'
    }
    ]);

    const pagination = () => {

        var array = [];
        for(let i=1; i <= totalPages; i++){
           array.push(i);
        }
        return array;
    }

    const selectPage = (page) => {
        setCurrentPage(page)
    }

    const incrementPage = () => {
        setCurrentPage(currentPage <= totalPages ? currentPage+1 : currentPage)
    }

    const decrementPage = () => {
        setCurrentPage(currentPage >=1 ? currentPage-1 : currentPage)
    }

    const checkItem = (pos) =>{
        const update = isChecked.map((item, index) => {
            return pos === index ? !item : item;
        })
        setIsChecked(update);
    }

    useEffect(  () => {

        async function fetchData (){
        try{
            const response = await axiosSecure.post('/',
            JSON.stringify({currentPage: currentPage, order: order.direction, column: order.column}));
            const data = response.data;        
            if(data?.success){
                if(Array.isArray(data.data?.data)){
                setProjects(data.data?.data) 
                setTotalPages(data.data.pagination.lastPage)
                }
            }else{
                console.log(data)
            }
    } catch(err){
         console.log(err);
      }
      if(isChecked.length === 20){
        setIsChecked(new Array(projects.length).fill(false));
      }
    }
    
    fetchData();
    },[currentPage, order])

    return(
            <div>
                <Navigation/>
                <div className='main bg-grey'>
                    <Sidebar />
                    <div className="projects-wrapper"> 
                        <h1 className="text-xl font-bold project-header">Projects</h1>
                        <div className="flex items-center justify-between mr-4 project-filter"> 
                            <div className="flex items-center">
                                <DateFilter title= { <div className="flex items-center justify-center text-white">
                                <p className="ml-1 mr-2">Select Dates</p>
                                <div className="vl mr-2"></div>
                                    <FontAwesomeIcon icon="fa-solid fa-clock" />
                               </div>
                            }  setIsDateListOpen={setIsDateListOpen} isDateListOpen={isDateListOpen} list={date} />
                                <Filter title= { <div className="flex items-center justify-center text-white">
                                    <p className="ml-1 mr-2">Sort By</p>
                                    <div className="vl mr-2"></div>
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" />
                                    </div>
                                    } setIsListOpen={setIsListOpen} isListOpen={isListOpen} list={sort} />
                            </div>
                            <div className="flex items-center">
                                <div className="filter-btn cursor-pointer">
                                    <FontAwesomeIcon icon="fa-solid fa-trash-can"className="ml-1 mr-2" />
                                    <div className="mr-1">Delete Project</div>
                                </div>
                                <div className="filter-btn cursor-pointer">
                                    <FontAwesomeIcon icon="fa-solid fa-plus"className="ml-1 mr-2" />
                                    <div className="mr-1">Add New Project</div>
                                </div>
                            </div>
                        </div>
                        <div className="project-table mr-8 bg-white">
                            <table className="table table-fixed">
                                <thead className="project-thead">
                                    <tr key={'table-data'}>
                                    <th><input type='checkbox' className="table-checkbox mt-1" /></th>
                                    {
                                        headers.map( (data, index) => {
                                            return (
                                                <th key={`header${index}`} scope="col"><button className={`tab-header`} >
                                                    <div className="flex justify-center items-center">
                                                    <p className="mr-2">{data}</p>
                                                    <FontAwesomeIcon icon="fa-solid fa-sort" size="xs"/>
                                                    </div>
                                                   </button></th>
                                            )
                                        })
                                    }
                                    </tr>
                                </thead>
                                <tbody className="project-tbody">
                                    {
                                        projects !== undefined && Array.isArray(projects)? projects.map( (data,index) => {
                                            return(
                                                <tr className="project-row" key={`table-data-${index}`}>
                                                <td><input type='checkbox' checked={isChecked[index]} className="table-checkbox" onClick={checkItem} /></td>
                                                <td>{data.name}</td>
                                                <td>{data.description}</td>
                                                <td>{data.progress}</td>
                                                <td>{data.timeline+" "+"Days"}</td>
                                                <td>{data.contact_name}</td>
                                                <td>{data.contact_no}</td>
                                                <td>{data.progress}</td>
                                                <td>{data.created_at.substring(0,10) + " " + data.created_at.substring(11,19)}</td>
                                                <td>{data.issuance_date ? data.issuance_date : 'N/A'}</td>
                                                <td>{data.created_at.substring(0,10) + " " + data.created_at.substring(11,19)}</td>
                                                <td>{data.certification_status}</td>
                                                </tr>
                                            );       
                                        }):null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className=" flex items-center justify-center text-center">
                            <button onClick={() => decrementPage()}> <FontAwesomeIcon icon="fa-solid fa-angles-left" /></button>
                             {
                                pagination().map( (data, index) => {
                                    return(
                                        <button key= {`pages-0-${index}`} onClick={() => selectPage(data)} className="pagination-btn">{data}</button>
                                    )
                                })
                            }
                             <button onClick={() => incrementPage()}> <FontAwesomeIcon icon="fa-solid fa-angles-right" /></button>
                        </div>   
                    </div>     
                </div>
            </div>
    )
}

export default Projects;