import { library } from "@fortawesome/fontawesome-svg-core";
import {  faBarsProgress, faSpinner, faListCheck, faBars, faBell,
   faClone, faAngleDown, faArrowRightFromBracket, faBorderAll, faFolder, faFileLines, faUserGroup, faGauge, faAngleUp, faCheck, 
   faInfoCircle, faCircleCheck, faTriangleExclamation, faArrowDown, faArrowUp, faCalendar, faMagnifyingGlass, faSort,
    faArrowDownShortWide, faAngleRight, faEyeSlash,faPlus, faTrashCan, faAnglesLeft, faAnglesRight, faClock, faMinus, faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import {React, useEffect, createContext} from 'react';
import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Mainpage from "./component/Mainpage";
import Login from "./component/Login";
import Register from "./component/Register";
import Projects from './component/Projects';
import NewProject from "./component/NewProject";

library.add( faBarsProgress, faSpinner, faListCheck, faBars, faBell, faClone, faAngleDown,
  faArrowRightFromBracket, faBorderAll, faFolder, faFileLines, faUserGroup, faGauge, faCheck, faAngleUp,
   faInfoCircle, faCircleCheck, faTriangleExclamation, faArrowDown, faArrowUp, faCalendar, faMagnifyingGlass,
    faSort, faArrowDownShortWide, faAngleRight, faEyeSlash, faPlus, faTrashCan , faAnglesLeft, faAnglesRight, faClock, faMinus, faXmark);

function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route index element={<Mainpage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="projects" element={<Projects />}  />
          <Route path="projects/new" element={<NewProject/>} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
