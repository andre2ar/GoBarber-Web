import React from "react";
import { FiLogIn } from "react-icons/fi";

import logoImg  from '../../assets/logo.svg';

import { Container, Content, Background } from "./styles";

const SignIn: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Go Barber"/>
                <form>
                    <h1>Login</h1>

                    <input type="email" placeholder="E-mail"/>
                    <input type="password" placeholder="Password"/>

                    <button>
                        Log In
                    </button>

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
