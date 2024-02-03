'use client'

import { Author, PostsConnection } from "@/types/data";
import { createContext, useContext, useState } from "react";

type Tabs = 'start' | 'posts';

interface UserContextProps {
    user: Author;
    userPosts: PostsConnection;  // Add userPosts to the context
    children: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<UserContextProps> = ({ user, userPosts, children }) => {
    return <UserContext.Provider value={{ user, userPosts, children }}>{children}</UserContext.Provider>;
};

