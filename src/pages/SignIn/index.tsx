import React from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import logoImg  from '../../assets/logo.svg';

import { Container, Content, Background } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SignIn: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Go Barber"/>
                <form>
                    <h1>Sign In</h1>

                    <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>
                    <Input name={"password"} icon={FiLock} type="password" placeholder="Password"/>

                    <Button type="submit">
                        Sign In
                    </Button>

                    <a href="forgot">Forgot password?</a>
                </form>

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