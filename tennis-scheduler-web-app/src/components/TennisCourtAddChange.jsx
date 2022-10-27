import { useState } from 'react'
import { useEffect } from 'react';
import { addTennisCourt, getTennisCourt } from '../api/TennisCourtApi'
import { useNavigate, useParams } from "react-router-dom";

export const TennisCourtAddChange = () => {
    const [address, setAddress] = useState({ country: "", city: "", street: "", number: "" })
    const [surface, setSurface] = useState('')
    const [image, setImage] = useState("")
    const [tennisCourt, setTennisCourt] = useState({ name: "", surfaceType: 0, description: "", image: "", address: address })
    const [ check, setCheck] = useState(false);

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
        addTennisCourt(tennisCourt).then(() =>
            console.log(tennisCourt),
            navigate('/'),
            window.location.reload()
        )
    }

    const persons = ["GRASS", "CLAY", "HARD"]

    const handleChangeSurfaceType = e => {
        setSurface(e.target.value)
    }

    const onCancel = e => navigate('/')

    const id = useParams().id

    useEffect(() => {
        if (id)
            getTennisCourt(id).then(
                response => {
                    setTennisCourt(response.data)
                    setAddress(response.data.address)
                    setCheck(true)
                    setImage(response.data.image)
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
                <input type="file" class="form-control" onChange={setImages} />
            </div>
            {
                check ? <img className='picture-preview' src={require('../images/' + image)} /> : ""   
            }
           
            {/* POSTAVI VREDNOST */}
            {/* <div>
                <select value={tennisCourt.surfaceType} onChange={handleChangeSurfaceType}>
                    <option value="GRASS">GRASS</option>
                    <option value="CLAY">CLAY</option>
                    <option value="HARD">HARD</option>
                </select></div> */}
            <div>
                {/* PROMENI */}
                {/* <DropdownButton
            title='Choose'
            value={surface}
            name="surfaceType"
            id="dropdown-menu-align-right" onSelect={handleChangeSurfaceType}>
                    <Dropdown.Item eventKey="GRASS">GRASS</Dropdown.Item>
                    <Dropdown.Item eventKey="CLAY">CLAY</Dropdown.Item>
                    <Dropdown.Item eventKey="HARD">HARD</Dropdown.Item>
            </DropdownButton>*/}
                {/* <Form.Group>
                    <Form.Label>Surface</Form.Label>
                    <Form.Select>
                        {persons.map(person => (
                            <option key={person}
                                value={person}
                                onSelect={handleChangeSurfaceType}>
                                {person}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group> */}
            </div>
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