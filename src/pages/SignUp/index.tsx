import React from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";

import logoImg  from '../../assets/logo.svg';

import { Container, Content, Background } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";

const SignUp: React.FC = () => {
    return (
        <Container>
            <Background/>
            <Content>
                <img src={logoImg} alt="Go Barber"/>
                <form>
                    <h1>Sign Up</h1>

                    <Input name={"name"} icon={FiUser} type="text" placeholder="Name"/>
                    <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>
                    <Input name={"password"} icon={FiLock} type="password" placeholder="Password"/>

                    <Button type="submit">
                        Sign Up
                    </Button>
                </form>

                <a href="signin">
                    <FiArrowLeft/>
                    Back to sign in
                </a>
            </Content>
        </Container>
    );
}

export default SignUp;
