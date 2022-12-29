import { useState, useEffect } from 'react'
import { addTennisCourt, getTennisCourt, changeTennisCourt } from '../api/TennisCourtApi'
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TennisCourtAddChange = () => {
    const [address, setAddress] = useState({ country: "", city: "", street: "", number: "" })
    const [workingTime, setWorkingTime] = useState({ startWorkingTimeWeekDay: "", endWorkingTimeWeekDay: "", startWorkingTimeWeekend: "", endWorkingTimeWeekend: "" })
    const [surface, setSurface] = useState("")
    const [image, setImage] = useState("")
    const [tennisCourt, setTennisCourt] = useState({ name: "", surfaceType: "", description: "", image: "", address: address, workingTime:workingTime })
    const [check, setCheck] = useState(false);
    const [changedType, setChangedType] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [emptyForm, setEmptyForm] = useState(true);
    const id = useParams().id
    const navigate = useNavigate();

    const handleChangeOfTennisCourt = e => {
        const { name, value } = e.target;
        setTennisCourt((tennisCourt) => ({ ...tennisCourt, [name]: value }));
    };

    const handleChangeAddress = e => {
        const { name, value } = e.target;
        setAddress((address) => ({ ...address, [name]: value }));
    };
    const handleChangeWorkingTime = e => {
        const { name, value } = e.target;
        setWorkingTime((workingTime) => ({ ...workingTime, [name]: value+":00" }));
    };

    const onImageChange = e => {
        const tennisCourtImage = e.target.value.split("fakepath")[1].substring(1);
        setImage(tennisCourtImage)
        setTennisCourt(tennisCourt => ({
            ...tennisCourt,
            image: tennisCourtImage
        }))
        setCheck(true)
    }

    const onSubmit = e => {
        e.preventDefault()
        
        setTennisCourt(tennisCourt => ({
            ...tennisCourt,
            address: address
        }))
        setTennisCourt(tennisCourt => ({
            ...tennisCourt,
            workingTime: workingTime
        }))
        setTennisCourt(tennisCourt => ({
            ...tennisCourt,
            surfaceType: surface
        }))
        console.log("AAAAAAAAAAAAAAAA"+workingTime)
        setFormErrors(validation(tennisCourt))
        if (Object.keys(formErrors).length === 0 && !emptyForm) {
            if (id)
                tennisCourtChange();
            else
                tennisCourtAdd();
        }
    }

    const tennisCourtChange = () => {
        changeTennisCourt(tennisCourt).then(() => {
            navigate('/');
            window.location.reload()
        }).catch(() =>
            toast.error("Something went wrong, try again!", { position: toast.POSITION.BOTTOM_CENTER }))
    }

    const tennisCourtAdd = () => {
        addTennisCourt(tennisCourt).then(() => {
            console.log(tennisCourt)
            navigate('/');
            window.location.reload()
        }).catch(() => toast.error("Something went wrong, try again!", { position: toast.POSITION.BOTTOM_CENTER }))
    }

    const validation = (court) => {
        const errors = {};
        const lettersRegex = new RegExp(/^$|^[A-Za-z ]+$/);
        const streetNumberRegex = new RegExp("^\\d+$");
        if (!court.name) errors.name = "Name is required!";
        if (!court.description) errors.description = "Description is required";
        if (!court.surfaceType) errors.surfaceType = "You have to select surface type!";
        if (!lettersRegex.test(court.address.country)) errors.country = "Only letters are allowed!"
        if (!lettersRegex.test(court.address.city)) errors.city = "Only letters are allowed!"
        if (!lettersRegex.test(court.address.street)) errors.street = "Only letters are allowed!"//?????????
        setEmptyForm(false);
        return errors;
    };

    const handleChangeSurfaceType = e => {
        setSurface(e.target.value)
        setChangedType(e.target.value)
    }

    const onCancel = e => navigate('/')

    useEffect(() => {
        if (id)
            getTennisCourt(id).then(
                response => {
                    setTennisCourt(response.data)
                    console.log(response.data.address)
                    setAddress(response.data.address)
                    console.log(response.data.workingTimeDto)
                    setWorkingTime(response.data.workingTimeDto)
                    setCheck(true)
                    setImage(response.data.image)
                    setChangedType(response.data.surfaceType)
                    setSurface(response.data.surfaceType)
                }
            ).catch(() => toast.error("Something went wrong, try again!", { position: toast.POSITION.BOTTOM_CENTER }))
    }, [])

    return (
        <form onSubmit={onSubmit} className="addTennisCourt-form">
            <div>
                <label>Name</label>
                <input type='text' className="addTennisCourt-input" id="name" name='name' placeholder="Add name of tennis court" value={tennisCourt.name} onChange={handleChangeOfTennisCourt}></input>
                <p className='errors'>{formErrors.name} </p>
            </div>
            <div>
                <label>Description</label>
                <textarea type='text' className="addTennisCourt-input" id="description" name='description' placeholder="Add description of tennis court" value={tennisCourt.description} onChange={handleChangeOfTennisCourt}></textarea>
                <p className='errors'>{formErrors.description} </p>
            </div>
            <div>
                <label>Image</label>
                <input type="file" id="image" className="form-control" onChange={onImageChange} />
            </div>
            {
                check && <img className='picture-preview' src={require('../images/' + image)} alt = "Isn't loaded" />
            }
            <select className="form-select select-option" value={changedType} onChange={handleChangeSurfaceType}>
                <option value="GRASS" onSelect={handleChangeSurfaceType}>GRASS</option>
                <option value="CLAY" onSelect={handleChangeSurfaceType}>CLAY</option>
                <option value="HARD" onSelect={handleChangeSurfaceType}>HARD</option>
            </select>
            <p className='errors'>{formErrors.surfaceType} </p>

{/* ===================================== */}
            <div className='working_time'>
                <div>
                    <h5>Working hours on weekdays</h5>
                        <div className='working-section'>
                            <div className="working-class">
                                <label htmlFor="">Start:</label>
                                <input type='time' className="start-week-day" id="startWorkingTimeWeekDay" name='startWorkingTimeWeekDay' value={workingTime.startWorkingTimeWeekDay} onChange={handleChangeWorkingTime}></input>
                                <p className='errors'>{formErrors.startWorkingTimeWeekDay} </p>
                            </div>
                            <div className="working-class">
                                <label htmlFor="">End:</label>
                                <input type='time' className="end-week-day" id="endWorkingTimeWeekDay" name='endWorkingTimeWeekDay' value={workingTime.endWorkingTimeWeekDay} onChange={handleChangeWorkingTime}></input>
                                <p className='errors'>{formErrors.endWorkingTimeWeekDay} </p>
                            </div>
                    </div>
                </div>
                <div>
                    <h5>Working hours on weekend</h5>
                    <div className='working-section'>
                        <div className="working-class">
                            <label htmlFor="">Start:</label>
                            <input type='time' className="start-weekend" id="startWorkingTimeWeekend" name='startWorkingTimeWeekend' value={workingTime.startWorkingTimeWeekend} onChange={handleChangeWorkingTime}></input>
                            <p className='errors'>{formErrors.startWorkingTimeWeekend} </p>
                        </div>
                        <div className="working-class">
                            <label htmlFor="">End:</label>
                            <input type='time' className="end-weekend" id="endWorkingTimeWeekend" name='endWorkingTimeWeekend' value={workingTime.endWorkingTimeWeekend} onChange={handleChangeWorkingTime}></input>
                            <p className='errors'>{formErrors.endWorkingTimeWeekend} </p>
                        </div>
                    </div>
                </div>
            </div>
{/* ===================================== */}

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
                    <button className='addTennisCourt-cancelBtn' onClick={onCancel}>Cancel</button>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
}