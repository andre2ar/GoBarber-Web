import React, {useEffect} from "react";

import {Container} from "./styles";
import {FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle} from "react-icons/fi";
import {ToastMessage, useToast} from "../../../hooks/toast";

interface ToastProps {
    toast: ToastMessage;
    style: object;
}

const icons = {
    info:  <FiInfo size={24}/>,
    error: <FiAlertCircle size={24}/>,
    success: <FiCheckCircle size={24}/>
}

const Toast: React.FC<ToastProps> = ({ toast: message, style }) => {
    const {removeToast} = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [message.id, removeToast]);

    return (
        <Container hasDescription={!!message.description}
                   type={message.type}
                   style={style}
        >
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeToast(message.id)}>
                <FiXCircle size={18}/>
            </button>
        </Container>
    );
}

export default Toast;
