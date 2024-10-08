import React, { createContext, useContext, useState } from 'react';
import useAxios from '../axios';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    const api = useAxios();
    const updateUnreadCount = async () => {
        try {
            const response = await api.get('/api/messages/unread-count');
            setUnreadCount(response.data.unreadMessagesCount);
        } catch (error) {
            console.error("Failed to update unread messages count:", error);
        }
    };

    return (
        <MessageContext.Provider value={{ unreadCount, updateUnreadCount, setUnreadCount }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    return useContext(MessageContext);
};
