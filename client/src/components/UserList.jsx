import User from "./User";
import { useState, useEffect } from "react";
import userService from "../services/userService";

const userId="66e939d2b5d08ae24758029d";
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
                setError('Failed to fetch user data');
            }
        } catch (error) {
            setError('Error fetching user data');
            setIsLoading(false);
        }
    }

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
                alert('User updated successfully');
            } else {
                setError('Failed to update user');
            }
        } catch (err) {
            setError('Error updating user');
        }
        setIsSaving(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div>
            <h2>Edit User</h2>
            <form>
                <label>
                    first_name:
                    <input
                        type="text"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    last_name:
                    <input
                        type="text"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    email:
                    <input
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    phone:
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    category:
                    <input
                        type="text"
                        name="category"
                        value={user.category}
                        onChange={handleChange}
                    />
                </label>
                <br />

                <button type="button" onClick={saveUser} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );


}

export default UserForm;