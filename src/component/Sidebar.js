import  { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

	const location = useLocation();
    return(
        <nav className="bg-white sidebar-wrapper v mt-1">
            <div className="sidebar overflow-visible ">
            	<Link to="/" className={ location.pathname === '/' ? "sidebar-items a" : "sidebar-items"}><FontAwesomeIcon icon="fa-solid fa-border-all" className={ location.pathname === '/' ? "sidebar-active-icons" : 'sidebar-icons'} /></Link>
				<Link to="/projects" className={ location.pathname === '/projects' ? "sidebar-items a" : "sidebar-items"}><FontAwesomeIcon icon="fa-solid fa-folder" className={ location.pathname === '/projects' ? "sidebar-active-icons" : 'sidebar-icons'} /></Link>
				<button href="" className="sidebar-items"><FontAwesomeIcon icon=" fa-solid fa-file-lines" className="sidebar-icons" /></button>
				<button href="" className="sidebar-items"><FontAwesomeIcon icon=" fa-solid fa-user-group" className="sidebar-icons" /></button>
				<Link to="/login" className="sidebar-items"><FontAwesomeIcon icon=" fa-solid fa-arrow-right-from-bracket" className="sidebar-icons" /></Link>	
            </div>
    	</nav>
    );
}

export default Sidebar;