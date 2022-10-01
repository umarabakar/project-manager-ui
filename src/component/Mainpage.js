import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import DashboardPage from "./DashboardPage";
import useAxiosSecure from "../hooks/useAxiosSeure";


function Mainpage() {

    const [projects, setProjects] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(  () => {
        
        async function fetchData (){

            try{  
                const response = await axiosSecure.post('/retrieveActiveProjects', JSON.stringify({
                    status: "Active"
                }));
                const data = response.data;
                if(data?.success){
                    if(Array.isArray(data.data)){
                    setProjects(data.data) 
                    }
                }else{
                    console.log(data)
                }
            } catch(err){
                 console.log(err);
              }
        }

        fetchData();
    }, []);

    return(
        <div>
            <Navigation/>
            <div className='main bg-grey'>
                <Sidebar />
                <DashboardPage projects = {projects} />
            </div>
        </div>  
     );
}

export default Mainpage;