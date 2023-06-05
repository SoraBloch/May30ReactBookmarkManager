import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookmarkRow = ({ bookmark, onDeleteClick, update }) => {

    const [title, setTitle] = useState(bookmark.title);
    const [editMode, setEditMode] = useState(false);

    const onEditClick = () => {
        setEditMode(true);
    }

    const onUpdateClick = () => {
        update(bookmark.id, title)
        setEditMode(false);
    }

    const onCancelClick = () => {
        setEditMode(false)
    }

    const onTextChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <>
            <tr>
                {!editMode ? <td>{bookmark.title}</td>
                    : <td><input type="text" className="form-control" placeholder="Title" onChange={onTextChange} value={title} /></td>}
                <td>
                    <a href={bookmark.url} target="_blank">
                        {bookmark.url}
                    </a>
                </td>
                <td>
                    {!editMode && <button onClick={onEditClick} className="btn btn-success">Edit Title</button>}
                    {!!editMode && <>
                        <button onClick={onUpdateClick} class="btn btn-warning">Update</button>
                        <button onClick={onCancelClick} class="btn btn-info">Cancel</button>
                    </>}
                    <button onClick={() => onDeleteClick(bookmark.id)} className="btn btn-danger" style={{ marginLeft: 10 }}>
                        Delete
                    </button>
                </td>
            </tr>
        </>

    )
}



export default BookmarkRow;