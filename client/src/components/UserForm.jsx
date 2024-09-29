import User from "./User";
import useAxios from '../axios';
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const UserForm = ({ userId }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

  const fetchUserById = async () => {
    try {
      const res = await api.get("/api/users");
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
    console.log(user);
    try {
      const response = await api.put("api/users", user);
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
      <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
        <h1 className="page-title display-3 mt-5">Edit User</h1>
      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">{user.email}</div>
      </div>

      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">First name:</label>
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
        <label className="col-sm-2 col-form-label">Last name:</label>
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
        <label className="col-sm-2 col-form-label">Phone:</label>
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
