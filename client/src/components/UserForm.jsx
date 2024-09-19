import User from "./User";
import { useState, useEffect } from "react";
import userService from "../services/userService";
import "bootstrap/dist/css/bootstrap.css";

const userId = "66e9d845a091298bcc78e213";
const UserForm = ({ userid }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserById = async () => {
    try {
      const res = await userService.getUserById(userId);
      if (res.status === 200) {
        setUser(res.data);
        setIsLoading(false);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      setError("Error fetching user data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    setIsSaving(true);
    try {
      const response = await userService.updateUser(userId, user); // 假设 updateUser 是更新用户数据的API
      if (response.status === 200) {
        alert("User updated successfully");
      } else {
        setError("Failed to update user");
      }
    } catch (err) {
      setError("Error updating user");
    }
    setIsSaving(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="container mt-5">
      <h2 className="">Edit User</h2>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            readOnly=""
            className="form-control-plaintext"
            id="staticEmail"
            defaultValue={user.email}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">first_name:</label>
        <div className="col-sm-10">
          <input
            type="text"
            name="first_name"
            className="form-control"
            value={user.first_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">last_name:</label>
        <div className="col-sm-10">
          <input
            type="text"
            name="last_name"
            className="form-control"
            value={user.last_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">email:</label>
        <div className="col-sm-10">
          <input
            type="text"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">phone:</label>
        <div className="col-sm-10">
          <input
            type="text"
            name="phone"
            className="form-control"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">category:</label>
        <div className="col-sm-10">
          <input
            type="text"
            name="category"
            className="form-control"
            value={user.category}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="d-grid my-3">
        <button
          type="button"
          className="btn btn-primary btn-lg btn-dark text-uppercase btn-rounded-none fs-6"
          onClick={saveUser}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default UserForm;
