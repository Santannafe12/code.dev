'use client'

import { Author } from "@/types/data";
import { createContext, useContext } from "react";
interface UserContextProps {
    user: Author;
    username: string;
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

export const UserProvider: React.FC<UserContextProps> = ({ user, username, children }) => {
    return <UserContext.Provider value={{ user, username, children }}>{children}</UserContext.Provider>;
};

