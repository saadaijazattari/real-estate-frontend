import { useNavigate } from 'react-router-dom';
import Chat from '../../components/Chat/Chat';
import List from '../../components/List/List';
import apiRequest from '../../lib/apiRequest';
import './ProfilePage.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  
  // ✅ State for posts data
  const [userPosts, setUserPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch profile posts
  useEffect(() => {
    const fetchProfilePosts = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get("/users/profilePosts");
        console.log("Profile data:", res.data);
        
        setUserPosts(res.data.userPosts || []);
        setSavedPosts(res.data.savedPosts || []);
        setError(null);
      } catch (err) {
        console.log("Error fetching profile posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfilePosts();
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={() => navigate('/profile/update')}>Update Profile</button>
          </div>
          
          <div className="info">
            <span>Avatar: 
              <img 
                src={currentUser?.avatar || currentUser?.user?.avatar || "/noavatar.jpg"} 
                alt="avatar" 
              />
            </span>
            <span>UserName: <b>{currentUser?.userName || currentUser?.user?.userName}</b></span>
            <span>E-mail: <b>{currentUser?.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          
          <div className="title">
            <h1>My List ({userPosts.length})</h1>
            <button onClick={() => navigate('/addPost')}>Create New Post</button>
          </div>
          
          {/* ✅ Pass user posts to List */}
          <List posts={userPosts} type="user" />
          
          <div className="title">
            <h1>Saved List ({savedPosts.length})</h1>
          </div>
          
          {/* ✅ Pass saved posts to List */}
          <List posts={savedPosts} type="saved" />
        </div>
      </div>
      
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}