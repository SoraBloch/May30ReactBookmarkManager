import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const [topFive, setTopFive] = useState([]);

    const getTopFive = async () => {
        const topFive = await axios.get('/api/bookmark/getfivemostusedbookmarks');
        console.log(topFive.data);
        setTopFive(topFive.data);
    }

    useEffect(() => {
        getTopFive();
    }, []);

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <main role="main" className="pb-3">
                <div>
                    <h1>Welcome to the React Bookmark Application.</h1>
                    <h3>Top 5 most bookmarked links</h3>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topFive.map(b => (
                                <tr key={b.url}>
                                    <td>
                                        <a href={b.url} target="_blank">
                                            {b.url}
                                        </a>
                                    </td>
                                    <td>{b.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Home;