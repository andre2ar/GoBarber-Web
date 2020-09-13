import React, {useCallback, useRef} from "react";
import {FiLock, FiLogIn, FiMail} from "react-icons/fi";
import {Form} from '@unform/web';

import {useAuth} from "../../context/AuthContext";
import getValidationError from "../../utils/getValidationError";

import logoImg from '../../assets/logo.svg';

import {Background, Container, Content} from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as Yup from "yup";
import {FormHandles} from "@unform/core";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail is required')
                    .email('Type a valid e-mail'),
                password: Yup.string()
                    .required('Password is required'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await signIn({
                email: data.email,
                password: data.password
            });
        } catch (err) {
            const errors = getValidationError(err);
            formRef.current?.setErrors(errors);
        }
    }, [signIn]);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Go Barber"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Sign In</h1>

                    <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>
                    <Input name={"password"} icon={FiLock} type="password" placeholder="Password"/>

                    <Button type="submit">
                        Sign In
                    </Button>

                    <a href="forgot">Forgot password?</a>
                </Form>

                <a href="signup">
                    <FiLogIn/>
                    Sign-up
                </a>
            </Content>
            <Background/>
        </Container>
    );
}

export default SignIn;
