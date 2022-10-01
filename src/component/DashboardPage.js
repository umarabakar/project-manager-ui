import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardPage = ({projects}) => {

    return(

        <div className="main-container">
    		 <h2 className="main-header text-xl"><b>Dashboard</b></h2>
    		 <section className="metrics-container mt-4">
    		 	<div className="bg-white">
    		 		<div className="mt-4 ml-4 mr-4">
	    		 		<div className="metrics-wrapper bg-blue-50">
						 <FontAwesomeIcon icon="fa-solid fa-gauge" className="text-black" />
	    		 		</div>
	    		 		<p className="text-gray-400 mt-4 ">Active Projects</p>
	    		 		<p className="mt-2 mb-1 text-4xl">11</p>
	    		 		<hr/>
	    		 		<p className="mt-1 mb-1 text-xs text-gray-300 ">Start on the 11th june</p>
                    </div>
    		 	</div>
    		 	<div className="bg-white">
    		 		<div className="mt-4 ml-4 mr-4">
	    		 		<div className="metrics-wrapper bg-red-50">
	    		 		<FontAwesomeIcon icon="fa-solid fa-list-check" className="text-black" />
	    		 		</div>
	    		 		<h2 className="text-gray-400 mt-4 ">Completed Projects</h2>
	    		 		<p className="mt-2 mb-1 text-4xl">14</p>
	    		 		<hr/>
	    		 		<p className="mt-1 mb-1 text-xs text-gray-300 ">Start on the 11th june</p>
                    </div>
    		 	</div>
    		 	<div className="bg-white">
    		 		<div className="mt-4 ml-4">
	    		 		<div className="metrics-wrapper bg-green-50">
	    		 			<FontAwesomeIcon icon="fa-solid fa-spinner" className="text-black fa-spin" />
	    		 		</div>
	    		 		<h2 className="text-gray-400 mt-4">Pending Certificates</h2>
	    		 		<p className="mt-2 mb-1 text-4xl">5</p>
	    		 		<hr/>
	    		 		<p className="mt-1 mb-1 text-xs text-gray-300 ">Start on the 11th june</p>
                    </div>
    		 	</div>
    	    </section>
            <section className="dashboard-table mr-8 bg-white">
            	<table className="table-fixed table">
				  <thead className="table-header">
				    <tr className="tr">
				      <th scope="col"><button className="sorting dash-header"> No</button></th>
				      <th scope="col"><button className="sorting dash-header"> Project Name</button></th>
				      <th scope="col"><button className="sorting dash-header"> Progress</button></th>
				      <th scope="col"><button className="sorting dash-header"> Location</button></th>
				      <th scope="col"><button className="sorting dash-header"> Timeline</button></th>
				      <th scope="col"><button className="sorting dash-header"> Issue Date</button></th>
				    </tr>
				  </thead>
				  <tbody className="dashboard-tbody">
				     {
						projects !== undefined && Array.isArray(projects)? projects.map( (data,index) => {
							{ let diff = Math.round( parseInt(data.timeline.substring(0,2)) - (( Date.now() - Date.parse( data.created_at)) / (1000 * 3600 * 24)) )
							diff <= -1 ? (
								data.timeline =  Math.abs(diff).toString() + " " + "Days Pass Deadline"
							) : (
								data.timeline = Math.abs(diff).toString() + " " + " Days Remaining"
								
							)
						  }
							return(
								 <tr key={`table-data-${index}`}>
								 <td>{data.id}</td>
								 <td>{data.name}</td>
								 <td>{data.progress}</td>
								 <td>{data.street + ", " + data.district + ", " + data.city}</td>
								
								 <td>{ data.timeline }</td>
								 <td>{data.created_at.substring(0,10) + " " + data.created_at.substring(11,19)}</td>
								 </tr>
							);
						}):null
					 }
				  </tbody>
			  </table>
            </section>
        </div>
    );
}

export default DashboardPage;