import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddBookmark = () => {

    const [formData, setFormData] = useState({
        title: '',
        url: ''
    });

    const navigate = useNavigate();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', formData);
        navigate('/mybookmarks');
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div
                    className="row"
                    style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
                >
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Add Bookmark</h3>
                        <form onSubmit={onFormSubmit}>
                            <input type="text" name="title" placeholder="Title" className="form-control" onChange={onTextChange} value={formData.title} />
                            <br />
                            <input type="text" name="url" placeholder="Url" className="form-control" onChange={onTextChange} value={formData.url} />
                            <br />
                            <button className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>)
}


export default AddBookmark;