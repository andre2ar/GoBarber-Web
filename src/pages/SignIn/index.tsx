import React, {useCallback, useRef} from "react";
import {FiLock, FiLogIn, FiMail} from "react-icons/fi";
import {Form} from '@unform/web';

import {useAuth} from "../../hooks/auth";
import getValidationError from "../../utils/getValidationError";

import logoImg from '../../assets/logo.svg';

import Button from "../../components/Button";
import Input from "../../components/Input";
import * as Yup from "yup";
import {FormHandles} from "@unform/core";
import {useToast} from "../../hooks/toast";
import {Link} from "react-router-dom";
import {Background, Container, AnimationContainer, Content} from "./styles";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();

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
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationError(err);
                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Authentication error',
                description: 'Wrong e-mail or password, try again'
            });
        }
    }, [signIn, addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="Go Barber"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Sign In</h1>

                        <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>
                        <Input name={"password"} icon={FiLock} type="password" placeholder="Password"/>

                        <Button type="submit">
                            Sign In
                        </Button>

                        <Link to="/forgot-password">Forgot password?</Link>
                    </Form>

                    <Link to="signup">
                        <FiLogIn/>
                        Sign-up
                    </Link>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    );
}

export default SignIn;
