import React, {useCallback, useRef} from "react";
import {FiArrowLeft, FiLock, FiMail, FiUser} from "react-icons/fi";
import {Form} from "@unform/web";
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import {Background, Container, Content} from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {FormHandles} from "@unform/core";
import getValidationError from "../../utils/getValidationError";

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
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
        } catch (err) {
            const errors = getValidationError(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background/>
            <Content>
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

                <a href="signin">
                    <FiArrowLeft/>
                    Back to sign in
                </a>
            </Content>
        </Container>
    );
}

export default SignUp;
