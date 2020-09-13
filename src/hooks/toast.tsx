import React, {createContext, useCallback, useContext} from "react";
import ToastContainer from "../components/ToastContainer";

interface ToastContextData {
    addToast(): void;
    removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
    const addToast = useCallback(() => {

    }, []);

    const removeToast = useCallback(() => {

    }, []);

    return (
        <ToastContext.Provider value={{addToast, removeToast}}>
            {children}
            <ToastContainer/>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be user within an ToastProvider');
    }

    return context;
}
