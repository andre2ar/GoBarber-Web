import React, {useCallback, useRef} from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from '@unform/web';
import logoImg  from '../../assets/logo.svg';

import { Container, Content, Background } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import * as Yup from "yup";
import getValidationError from "../../utils/getValidationError";
import {FormHandles} from "@unform/core";

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
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
        } catch (err) {
            const errors = getValidationError(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

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
