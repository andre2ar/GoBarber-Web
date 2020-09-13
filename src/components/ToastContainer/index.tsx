import React from "react";

import { Container } from "./styles";
import {ToastMessage} from "../../hooks/toast";
import Toast from "./Toast";
import {useTransition} from "react-spring";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(messages, message => message.id, {
        from: { right: '-120%'},
        enter: { right: '0%' },
        leave: { right:  '-120%'}
    });
    return (
        <Container>
            {messagesWithTransitions.map(({item, key, props}) => (
                <Toast key={key} style={props}
                       toast={item}
                />
            ))}
        </Container>
    );
}

export default ToastContainer;
