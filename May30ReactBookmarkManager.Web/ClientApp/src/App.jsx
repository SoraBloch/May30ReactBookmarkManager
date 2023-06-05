import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Logout from './Pages/Logout';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';


const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                    <Route exact path='/mybookmarks' element={
                        <PrivateRoute>
                            <MyBookmarks />
                        </PrivateRoute>
                    } />
                    <Route exact path='/addbookmark' element={
                        <PrivateRoute>
                            <AddBookmark />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;