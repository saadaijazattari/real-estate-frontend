import { useNavigate } from 'react-router-dom';
import Chat from '../../components/Chat/Chat'
import List from '../../components/List/List'
import apiRequest from '../../lib/apiRequest';
import './ProfilePage.scss'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';


export default function ProfilePage() {

    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext(AuthContext);


    const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null)
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

    return (
            <div className="profilePage">
                <div className="details">
                    <div className="wrapper">
                        <div className="title">
                            <h1>User Information</h1>
                            <button onClick={()=> navigate('/profile/update')}>Update Profile</button>
                    </div>
                    <div className="info">
                        <span>Avatar: <img src={currentUser?.avatar || currentUser?.user?.avatar || "/noavatar.jpg"} alt="" /></span>
                        <span>UserName: <b>{currentUser?.userName || currentUser?.user?.userName }</b></span>
                        <span>E-mail: <b>{currentUser?.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <button onClick={()=> navigate('/addPost')}>Create New Post</button>
                    </div>
                    <List />
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat/>
                </div>
            </div>
        </div>)
    
}