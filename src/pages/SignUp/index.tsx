import React, {useCallback, useRef} from "react";
import {FiArrowLeft, FiLock, FiMail, FiUser} from "react-icons/fi";
import {Form} from "@unform/web";
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import {Background, Container, Content, AnimationContainer} from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {FormHandles} from "@unform/core";
import getValidationError from "../../utils/getValidationError";
import api from "../../services/api";
import {useToast} from "../../hooks/toast";

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {addToast} = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .required('E-mail is required')
                    .email('Type a valid e-mail'),
                password: Yup.string()
                    .min(6, 'Password must have at least 6 digits'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.post('/users', data);
            addToast({
                type: "success",
                title: "Successfully signed-up",
                description: "Now you can sign in",
            });
        } catch (err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationError(err);
                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Sign-up error',
                description: 'Try again in some minutes'
            });
        }
    }, [addToast]);

    return (
        <Container>
            <Background/>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>

                        <Input name={"name"} icon={FiUser} type="text" placeholder="Name"/>
                        <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>
                        <Input name={"password"} icon={FiLock} type="password" placeholder="Password"/>

                        <Button type="submit">
                            Sign Up
                        </Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft/>
                        Back to sign in
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
}

export default SignUp;
