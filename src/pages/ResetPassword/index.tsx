import React, {useCallback, useRef} from "react";
import {FiLock} from "react-icons/fi";
import {useHistory, useLocation} from 'react-router-dom';
import {Form} from '@unform/web';

import getValidationError from "../../utils/getValidationError";

import logoImg from '../../assets/logo.svg';

import Button from "../../components/Button";
import Input from "../../components/Input";
import * as Yup from "yup";
import {FormHandles} from "@unform/core";
import {useToast} from "../../hooks/toast";
import {Background, Container, AnimationContainer, Content} from "./styles";
import api from "../../services/api";

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                password: Yup.string()
                    .required('Password is required'),
                password_confirmation: Yup.string().oneOf([Yup.ref('password'), undefined], 'Password must match')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const token = location.search.replace('?token=', '');
            if(!token) {
                throw new Error();
            }

            await api.post('/password/reset', {
                password: data.password,
                password_confirmation: data.password_confirmation,
                token
            });

            history.push('/signin');
        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationError(err);
                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Password reset error',
                description: 'An error occurred, try again'
            });
        }
    }, [addToast, history, location.search]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Reset password</h1>

                        <Input name={"password"} icon={FiLock} type="password" placeholder="New password"/>
                        <Input name={"password_confirmation"} icon={FiLock} type="password" placeholder="Password confirmation"/>

                        <Button type="submit">
                            Reset password
                        </Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    );
}

export default ResetPassword;
