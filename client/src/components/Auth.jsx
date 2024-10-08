import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import {useEffect} from 'react';
import { useMessage } from '../context/MessageContext.jsx';
import useAxios from '../axios';

export default function Auth() {
  const { auth, logout, loginRef } = useAuth();
  const api = useAxios();
  const { unreadCount, setUnreadCount } = useMessage(); // Get the unread message count and the method to update it
  useEffect(() => {
    if (auth.isLoggedIn) {
      // Fetch the unread message count when the user logs in
      const fetchUnreadMessages = async () => {
        try {
          const response = await api.get('/api/messages/unread-count');
          setUnreadCount(response.data.unreadMessagesCount);
        } catch (error) {
          console.error("Failed to fetch unread messages count:", error);
        }
      };
      fetchUnreadMessages();
    }
  }, [auth.isLoggedIn, api, setUnreadCount]);

  const updateUnreadCount = async () => {
    try {
        const response = await api.get('/api/messages/unread-count');
        setUnreadCount(response.data.unreadMessagesCount);
    } catch (error) {
        console.error("Failed to update unread messages count:", error);
    }
  };

  if (!auth.isLoggedIn) {

    return (
      <>
        <div className="d-flex mt-5 mt-lg-0 ps-xl-5 align-items-center justify-content-center">
          <ul className="navbar-nav justify-content-end align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link px-3"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                ref={loginRef}
              >
                Login
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Sign up
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item">
            <Link className="nav-link px-3" to="/profile">
              Profile
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item position-relative">
            <Link className="nav-link px-3" to="/messages">
              Message
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    width: '15px', // 设置宽度
                    height: '15px', // 设置高度
                    borderRadius: '50%', // 设置圆角，使其成为圆形
                    padding: '0', // 移除内边距
                    fontSize: '0', // 隐藏文字
                    lineHeight: '10px', // 设置行高，使其垂直居中
                  }}
                >
                  <span style={{ display: 'none' }}>{unreadCount}</span>
                </span>
              )}
            </Link>
          </li>
        </ul>

        {auth.category === "passenger" && (<ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item">
            <Link className="nav-link px-3" to="/deposit">
              Deposit
            </Link>
          </li>
        </ul>)}
        {auth.category === "driver" && (<ul className="navbar-nav justify-content-end align-items-center fs-4">
          <li className="nav-item">
            <Link className="nav-link px-3" to="/withDrawal">
              WithDrawal
            </Link>
          </li>
        </ul>)}

        <div className="navbar-nav justify-content-end align-items-center">
          <button
            type="button"
            onClick={logout}
            className="btn btn-outline-primary nav-button mx-3 text-white bg-dark text-nowrap"
          >
            Log out
          </button>
        </div>
      </>
    );
  }
}
