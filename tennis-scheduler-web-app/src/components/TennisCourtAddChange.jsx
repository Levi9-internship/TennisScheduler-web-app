import { useState, useEffect } from 'react'
import { getTennisCourt, changeTennisCourt,addTennisCourt } from '../api/TennisCourtApi'
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TennisCourtAddChange = () => {
    const [address, setAddress] = useState({ country: "", city: "", street: "", number: "" })
    const [workingTime, setWorkingTime] = useState({ startWorkingTimeWeekDay: "", endWorkingTimeWeekDay: "", startWorkingTimeWeekend: "", endWorkingTimeWeekend: "" })
    const [surface, setSurface] = useState("GRASS")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const [check, setCheck] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const id = useParams().id
    const navigate = useNavigate();

    const handleChangeAddress = e => {
        const { name, value } = e.target;
        setAddress((address) => ({ ...address, [name]: value }));
    };
    const handleChangeWorkingTime = e => {
        const { name, value } = e.target;
        setWorkingTime((workingTime) => ({ ...workingTime, [name]: value+":00" }));
    };
    const handleChangeSurfaceType = e => {
        setSurface(e.target.value)
    }
    const onImageChange = e => {
        const tennisCourtImage = e.target.value.split("fakepath")[1].substring(1);
        setImage(tennisCourtImage)
        setCheck(true)
    }

    const onSubmit = e => {
        e.preventDefault()
         
        let errors = {};
        setFormErrors({...formErrors,name:"Name is required!"})

        const lettersRegex = new RegExp(/^$|^[A-Za-z ]+$/);
        if (Object.keys(name).length === 0)
            errors.name="Name is required!";
        if (!description)
            errors.description="Description is required!";
        if (!image)
            errors.image="Image is required!"
        if (!(workingTime.startWorkingTimeWeekDay && workingTime.endWorkingTimeWeekDay && workingTime.startWorkingTimeWeekend && workingTime.endWorkingTimeWeekend)
            || (workingTime.startWorkingTimeWeekDay >= workingTime.endWorkingTimeWeekDay || workingTime.startWorkingTimeWeekend >= workingTime.endWorkingTimeWeekend))
            errors.workingTime="Working time isn't valid";
        if (!lettersRegex.test(address.country)) errors.country = "Only letters are allowed!"
        if (!lettersRegex.test(address.city)) errors.city = "Only letters are allowed!"

        setFormErrors(errors)
        if(Object.keys(errors).length!==0)
            return


        let newTennisCourt = {
            "id":id,
            "name": name,
            "surfaceType": surface,
            "description": description,
            "image": image,
            "address": address,
            "workingTimeDto": workingTime 
        };
        
        if (id){
            changeTennisCourt(newTennisCourt).then(() => {
                navigate('/');
            }).catch(() =>
                toast.error("Something went wrong, try again!", { position: toast.POSITION.BOTTOM_CENTER }))
        }
        else{
            addTennisCourt(newTennisCourt).then(() => {
                navigate('/');
            }).catch(() =>
                toast.error("Something went wrong, try again!", { position: toast.POSITION.BOTTOM_CENTER }))
        }
    }


    useEffect(() => {
        if (id)
            getTennisCourt(id).then(
                response => {
                    setName(response.data.name)
                    setDescription(response.data.description)
                    setAddress(response.data.address)
                    setWorkingTime(response.data.workingTimeDto)
                    setCheck(true)
                    setImage(response.data.image)
                    setSurface(response.data.surfaceType)
                }
            ).catch(() => toast.error("Something went wrong, try again!", { position: toast.POSITION.BOTTOM_CENTER }))
    }, [id])

    return (
        <form onSubmit={onSubmit} className="addTennisCourt-form">
            <div>
                <label>Name</label>
                <input type='text' className="addTennisCourt-input" id="name" name='name' placeholder="Add name of tennis court" value={name} onChange={e=>setName(e.target.value)}></input>
                <p className='errors'>{formErrors.name} </p>
            </div>
            <div>
                <label>Description</label>
                <textarea type='text' className="addTennisCourt-input" id="description" name='description' placeholder="Add description of tennis court" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                <p className='errors'>{formErrors.description} </p>
            </div>
            <div>
                <label>Image</label>
                <input type="file" id="image" className="form-control" onChange={onImageChange} />
                <p className='errors'>{formErrors.image} </p>
            </div>
            {
                check && <img className='picture-preview' src={require('../images/' + image)} alt = "Isn't loaded" />
            }
            <select className="form-select select-option" value={surface} onChange={handleChangeSurfaceType}>
                <option value="GRASS" onSelect={handleChangeSurfaceType}>GRASS</option>
                <option value="CLAY" onSelect={handleChangeSurfaceType}>CLAY</option>
                <option value="HARD" onSelect={handleChangeSurfaceType}>HARD</option>
            </select>
            <div className='working_time'>
                <div>
                    <h5>Working hours on weekdays</h5>
                        <div className='working-section'>
                            <div className="working-class">
                                <label htmlFor="">Start:</label>
                                <input type='time' className="start-week-day" id="startWorkingTimeWeekDay" name='startWorkingTimeWeekDay' value={workingTime.startWorkingTimeWeekDay} onChange={handleChangeWorkingTime}></input>
                                
                            </div>
                            <div className="working-class">
                                <label htmlFor="">End:</label>
                                <input type='time' className="end-week-day" id="endWorkingTimeWeekDay" name='endWorkingTimeWeekDay' value={workingTime.endWorkingTimeWeekDay} onChange={handleChangeWorkingTime}></input>
                            </div>
                    </div>
                </div>
                <div>
                    <h5>Working hours on weekend</h5>
                    <div className='working-section'>
                        <div className="working-class">
                            <label htmlFor="">Start:</label>
                            <input type='time' className="start-weekend" id="startWorkingTimeWeekend" name='startWorkingTimeWeekend' value={workingTime.startWorkingTimeWeekend} onChange={handleChangeWorkingTime}></input>
                        </div>
                        <div className="working-class">
                            <label htmlFor="">End:</label>
                            <input type='time' className="end-weekend" id="endWorkingTimeWeekend" name='endWorkingTimeWeekend' value={workingTime.endWorkingTimeWeekend} onChange={handleChangeWorkingTime}></input>
                        </div>
                    </div>
                </div>
                <p className='errors'>{formErrors.workingTime} </p>
            </div>
            <div>
                <label>Country</label>
                <input type='text' placeholder="Add country" className="addTennisCourt-input" id="country" name='country' value={address.country} onChange={handleChangeAddress}></input>
                <p className='errors'>{formErrors.country} </p>
            </div>
            <div>
                <label>City</label>
                <input type='text' placeholder="Add city" id="city" name='city' className="addTennisCourt-input" value={address.city} onChange={handleChangeAddress} ></input>
                <p className='errors'>{formErrors.city} </p>
            </div>
            <div>
                <label>Street</label>
                <input type='text' placeholder="Add street" id="street" name='street' className="addTennisCourt-input" value={address.street} onChange={handleChangeAddress}></input>
                <p className='errors'>{formErrors.street} </p>
            </div>
            <div>
                <label>Number</label>
                <input type='number' placeholder="Add number" id="number" name='number' className="addTennisCourt-input" value={address.number} onChange={handleChangeAddress}></input>
            </div>
            <div className="row">
                <div className="col">
                    <button className='addTennisCourt-addButton' type='submit'>Yes</button>
                </div>
                <div className="col">
                    <button className='addTennisCourt-cancelBtn' onClick={()=>navigate('/')}>Cancel</button>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
}