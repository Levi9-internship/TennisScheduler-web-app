import { useState } from 'react'
import { useEffect } from 'react';
import { addTennisCourt, getTennisCourt , changeTennisCourt} from '../api/TennisCourtApi'
import { useNavigate, useParams } from "react-router-dom";

export const TennisCourtAddChange = () => {
    const [address, setAddress] = useState({ country: "", city: "", street: "", number: "" })
    const [surface, setSurface] = useState('')
    const [image, setImage] = useState("")
    const [tennisCourt, setTennisCourt] = useState({ name: "", surfaceType: "", description: "", image: "", address: address })
    const [check, setCheck] = useState(false);
    const [changedType, setChangedType] = useState('');
    const id = useParams().id
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setTennisCourt((tennisCourt) => ({ ...tennisCourt, [name]: value }));
    };

    const handleChangeAddress = e => {
        const { name, value } = e.target;
        setAddress((address) => ({ ...address, [name]: value }));
    };

    const setImages = e => {
        var im = e.target.value.split("fakepath")[1].substring(1);
        setImage(im)
        tennisCourt.image = im
        setCheck(true)
    }

    const onSubmit = e => {
        e.preventDefault()
        tennisCourt.address = address
        tennisCourt.surfaceType = surface
        if (id)
            changeTennisCourt(tennisCourt).then(() => {
                navigate('/');
                window.location.reload()
            })
        else
            addTennisCourt(tennisCourt).then(() => {
                navigate('/');
                window.location.reload()
            })
    }

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
                    setAddress(response.data.address)
                    setCheck(true)
                    setImage(response.data.image)
                    setChangedType(response.data.surfaceType)
                    setSurface(response.data.surfaceType)
                }
            )
    }, [])

    return (
        <form onSubmit={onSubmit} className="addTennisCourt-form">
            <div>
                <label>Name</label>
                <input type='text' className="addTennisCourt-input" id="name" name='name' placeholder="Add name of tennis court" value={tennisCourt.name} onChange={handleChange}></input>
            </div>
            <div>
                <label>Description</label>
                <textarea type='text' className="addTennisCourt-input" id="description" name='description' placeholder="Add description of tennis court" value={tennisCourt.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label>Image</label>
                <input type="file" className="form-control" onChange={setImages} />
            </div>
            {
                check ? <img className='picture-preview' src={require('../images/' + image)} /> : ""
            }
            <select className="form-select select-option" value={changedType} onChange={handleChangeSurfaceType}>
                <option value="GRASS" onSelect={handleChangeSurfaceType}>GRASS</option>
                <option value="CLAY" onSelect={handleChangeSurfaceType}>CLAY</option>
                <option value="HARD" onSelect={handleChangeSurfaceType}>HARD</option>
            </select>
            <div>
                <label>Country</label>
                <input type='text' placeholder="Add country" className="addTennisCourt-input" id="country" name='country' value={address.country} onChange={handleChangeAddress}></input>
            </div>
            <div>
                <label>City</label>
                <input type='text' placeholder="Add city" id="city" name='city' className="addTennisCourt-input" value={address.city} onChange={handleChangeAddress} ></input>
            </div>
            <div>
                <label>Street</label>
                <input type='text' placeholder="Add street" id="street" name='street' className="addTennisCourt-input" value={address.street} onChange={handleChangeAddress}></input>
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
        </form>
    );
}