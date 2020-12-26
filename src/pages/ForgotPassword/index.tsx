import React, {useCallback, useRef, useState} from "react";
import {FiArrowLeft, FiMail} from "react-icons/fi";
import {Form} from '@unform/web';

import getValidationError from "../../utils/getValidationError";

import logoImg from '../../assets/logo.svg';

import Button from "../../components/Button";
import Input from "../../components/Input";
import * as Yup from "yup";
import {FormHandles} from "@unform/core";
import {useToast} from "../../hooks/toast";
import {Link} from "react-router-dom";
import {Background, Container, AnimationContainer, Content} from "./styles";
import api from "../../services/api";

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true);
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail is required')
                    .email('Type a valid e-mail'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.post('/password/forgot', {
                email: data.email
            });

            addToast({
                type: 'success',
                title: 'Recover password e-mail sent',
                description: 'Recover password e-mail sent, check your inbox'
            });
        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationError(err);
                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Password recover error',
                description: 'An error occurred in password recover'
            });
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recover password</h1>

                        <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>

                        <Button loading={loading} type="submit">
                            Recover
                        </Button>
                    </Form>

                    <Link to="signin">
                        <FiArrowLeft/>
                        Back to login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    );
}

export default ForgotPassword;
