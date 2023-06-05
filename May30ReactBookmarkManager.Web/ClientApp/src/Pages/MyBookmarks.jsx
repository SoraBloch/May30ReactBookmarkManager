import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookmarkRow from '../BookmarkRow';

const MyBookmarks = () => {

    const [myBookmarks, setMyBookmarks] = useState([]);
   
    const getMyBookmarks = async () => {
        const bookmarks = await axios.get('/api/bookmark/getbookmarksforcurrentuser');
        setMyBookmarks(bookmarks.data);
    }

    useEffect(() => {
        getMyBookmarks();
    }, []);

    const onUpdateClick = async (id, title) => {
        await axios.post('/api/bookmark/updatebookmark', { id, title });
        getMyBookmarks();
    }

    const onDeleteClick = async (id) => {
        await axios.post('/api/bookmark/deletebookmark', { id });
        getMyBookmarks();
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: 20 }}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back John Doe</h1>
                            <Link className="btn btn-primary btn-block" to="/addbookmark">
                                Add Bookmark
                            </Link>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBookmarks.map(b => <BookmarkRow
                                    key={b.id}
                                    bookmark={b}
                                    onDeleteClick={onDeleteClick}
                                    update={onUpdateClick}
                                />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}



export default MyBookmarks;