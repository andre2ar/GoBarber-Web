import React from "react";

import { Container, Header, HeaderContent, Profile } from "./styles";

import logoImg from '../../assets/logo.svg';
import {FiPower} from "react-icons/all";
import {useAuth} from "../../hooks/auth";

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt={"Go Barber"} />

                    <Profile>
                        { user.avatar_url && <img src={user.avatar_url} alt={user.name} />}

                        <div>
                            <span>Welcome,</span>
                            <strong>
                                {user.name}
                            </strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    );
};

export default Dashboard;
