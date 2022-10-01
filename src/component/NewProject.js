import { useFormik, yupToFormErrors } from "formik";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import * as Yup from 'yup';

const NewProject = () => {

    const {values, handleBlur, handleChange, handleSubmit, isSubmitting, touched, errors} = useFormik({
        initialValues: {
            name: "",
            service: "",
            status: "",
            progress: "",
            timeline:"",
            vendor: "",
            contact_name: "",
            contact_no: "",
            intitaion: "",
            activation: "",
            address: "",
            district: "",
            city: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            service: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
            progress: Yup.string().required("Required"),
            timeline: Yup.string().required("Required"),
            vendor: Yup.string().required("Required"),
            contact_name: Yup.string().required("Required"),
            contact_no: Yup.string().max(11, 'Invalid phone number').min(11).required("Required"),
            initiation: Yup.string().required("Required"),
            activation: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            district: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            
        })
    });

    console.log(values.name);

    return(
        <div>
            <Navigation/>
            <div className='main bg-grey'>
                <Sidebar />
                <section className="ml-10 mt-10 mr-10 overflow-auto">
                    <h1 className="mb-5 project-header ">Project - add</h1>
                    <form>
                        <div className="flex item-center justify-between">
                            <div className="br-1">
                                <div>
                                    <label className="form-label">Name</label>
                                    <input className="form-input"
                                    id="name"
                                    name="name"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                     />
                                </div>
                                <div>
                                    <label className="form-label">Service</label>
                                    <input className="form-input"
                                    name="service"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="form-label">Status</label>
                                    <select className="form-input">
                                        <option value="Active">Active</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Progress</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" 
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className="form-label">Timeline</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" 
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="form-label">Vendor</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" 
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className="form-label">Initiation Date</label>
                                    <input className="form-input"
                                    name="status"
                                    type="date"
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className="form-label">Issuance Date</label>
                                    <input className="form-input"
                                    name="status"
                                    type="date" 
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                </div>
                                <div>
                                    <label className="form-label">Activation Date</label>
                                    <input className="form-input"
                                    name="activation"
                                    type="date"
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="form-label">Certification Status</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="form-label">Client Contatct Name</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" />
                                </div>
                                <div>
                                    <label className="form-label">Client Contact Number</label>
                                    <input className="form-input"
                                    name="contact_no"
                                    type="text"
                                    value={values.contact_no}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                </div>
                                <div>
                                    <label className="form-label">Street Address1</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" />
                                </div>
                                <div>
                                    <label className="form-label">Street District</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" />
                                </div>
                                <div>
                                    <label className="form-label">City</label>
                                    <input className="form-input"
                                    name="status"
                                    type="text" />
                                </div>
                                <div className="text-right">
                                    <button className="form-submit mr-2"
                                    type="submit">
                                    Save or Update
                                    </button>
                                </div>
                            </div>
                        </div>  
                    </form>
                </section>
            </div>
        </div>  
    )
}


export default NewProject;