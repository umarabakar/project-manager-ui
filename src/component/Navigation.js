import React, { useState } from 'react';
import pic from '../images/placeholder.avif'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';



const Navigation = () => {

    const [list, setList]  = useState([{
        id: 1,
        title: 'My Account',
        selected: false,
        key: 'profile'
    },
    {
        id: 2,
        title: 'Settings',
        selected: false,
        key: 'settings'
    },
    {
        id: 3,
        title: <div className='flex items-center'><FontAwesomeIcon icon=" fa-solid fa-arrow-right-from-bracket"/> <p className='ml-4'>Sign out</p> </div>,
        selected: false,
        key: 'Signout'
    }]);

    const [isOpen, setIsOpen] = useState(false);
    const[menu, setMenu] = useState(true);

    window.onresize = window.onload = function() {
       let width = this.innerWidth;
        let height = this.nnerHeight;
        

        if(width < 900){
            setMenu(!menu);
        }
    } 
    return(
        <>
        {
            isOpen &&
            <div className='h-screeen fixed z-10 w-1/6 bg-[#260636] text-white'>
                <nav className='h-screen'>
                    <div className='flex justify-end w-full'>
                        <button className='flex justify-end' onClick={() => setIsOpen(!isOpen)}>
                            <FontAwesomeIcon icon="fa-solid fa-xmark" className='text-4xl mr-1 hover:text-[#632085]' />
                        </button>
                    </div>
                    <div className='flex items-center mt-20 border-b-1 border-white pb-5 hover:text-[#632085]'>
                        <FontAwesomeIcon icon="fa-solid fa-border-all" className="ml-6 text-xl" /> 
                        <p className='ml-3 text-xl text-bold'>Dashbord</p>
                    </div>
                    <Link to="/projects" className='flex items-center mt-5 pb-5 hover:text-[#632085]'>
                       <FontAwesomeIcon icon="fa-solid fa-folder" className="ml-6 text-xl" /> 
                        <p className='ml-3 text-xl text-bold'>Projects</p>
                    </Link>
                    <div className='flex items-center mt-5 pb-5 hover:text-[#632085]'>
                       <FontAwesomeIcon icon="fa-solid fa-file-lines" className="ml-6 text-xl" /> 
                        <p className='ml-3 text-xl text-bold'>Certifications</p>
                    </div>
                    <div className='flex items-center mt-5 pb-5 hover:text-[#632085]'>
                       <FontAwesomeIcon icon="fa-solid fa-user-group" className="ml-6 text-xl" /> 
                        <p className='ml-3 text-xl text-bold'>Vendors</p>
                    </div>
                    <div className='flex items-center mt-5 pb-5 hover:text-[#632085]'>
                        <FontAwesomeIcon icon=" fa-solid fa-arrow-right-from-bracket"  className="ml-6 text-xl" /> 
                        <p className='ml-3 text-xl text-bold'>Log out</p>
                    </div>
                </nav>
            </div>
        }
            <header>
                <div className="container">
                    <nav className="navbar-start-wrspper">
                        <div className="flex">
                            <button onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon="fa-solid fa-bars" className={ menu ? 'ml-6 hide' : 'ml-6'} /></button> 
                            <Link to="/"><FontAwesomeIcon icon= "fa-solid fa-bars-progress" className=" navbar-icon ml-6 mr-8" /></Link>
                            <input type="search" name="search" className="navbar-input pl-7" placeholder="Search for projects, contractor .... " />
                            <button className="navbar-btn">
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='' />
                            </button>
                        </div>
                    </nav>
                    <nav className="navbar-end-wrapper">
                        <div className="navbar-container">
                            <FontAwesomeIcon icon="fa-solid fa-bell" className="fa-lg navbar-icon-notify mt-2 " />
                        </div>
                        <div className="flex items-center">
                            <Dropdown title = { <img src={pic} className="navbar-profile-pic" /> } list={list} />
                        </div>
                    </nav>
                </div>
            </header>
        </>  
    );
}

export default Navigation;
