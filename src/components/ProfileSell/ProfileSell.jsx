import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfileSell.css';

const ProfileSell = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "User's Name",
    email: "user@example.com",
    firstname: "Eshaa",
    lastname: "Aranggan",
    bitsid: "2022A7PS2013H",
    hostel: "Malaviya",
  });

  useEffect(() => {
    // Fetch user data from the backend when the component mounts
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get('/users/1'); // Replace '1' with the actual user ID
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const saveProfile = async () => {
    try {
      // Make a PUT request to update user data on the backend
      await axios.put(`/users/1`, userData); // Replace '1' with the actual user ID
      setIsEditing(false);
      alert('Profile information saved!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <header className="header">
        <div className="logo-tagline">
          <h1>BITSBids</h1>
        </div>
        <span id="greeting"></span>
        <span className="tagline">...bid the BITS way</span>
      </header>

      <div className="navbar">
        <nav>
          <ul>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/add-product">Add Products</Link>
            </li>
            <li>
              <Link to="/message-bidder">Message Bidder</Link>
            </li>
            <li id="profile" className="active">
              <Link to="/profile-sell">Profile</Link>
            </li>
            <li>
              <Link to="/">Back to Bidding</Link>
            </li>
          </ul>
        </nav>
      </div>

      <main className="main">
        <div className="user-profile">
          <div className="editable-field">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="editable-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="editable-field">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={userData.firstname}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="editable-field">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={userData.lastname}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="editable-field">
            <label htmlFor="bitsid">BITS ID:</label>
            <input
              type="text"
              id="bitsid"
              name="bitsid"
              value={userData.bitsid}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="editable-field">
            <label htmlFor="hostel">Hostel:</label>
            <input
              type="text"
              id="hostel"
              name="hostel"
              value={userData.hostel}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="profile-buttons">
            {isEditing ? (
              <>
                <button className="save-button" onClick={saveProfile}>
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button className="edit-button" onClick={enableEditing}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSell;
