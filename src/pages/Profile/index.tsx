import React, {useCallback, useRef} from "react";
import {Link} from 'react-router-dom';
import {FiArrowLeft, FiCamera, FiLock, FiMail, FiUser} from "react-icons/fi";
import {Form} from "@unform/web";
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Container, Content, PasswordContainer, AvatarInput } from "./styles";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {FormHandles} from "@unform/core";
import getValidationError from "../../utils/getValidationError";
import api from "../../services/api";
import {useToast} from "../../hooks/toast";
import {useAuth} from "../../hooks/auth";

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {addToast} = useToast();
    const history = useHistory();

    const { user } = useAuth();

    const handleSubmit = useCallback(async (data: ProfileFormData) => {
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
            history.push('/');
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
    }, [addToast, history]);

    return (
        <Container>
            <header>
                <div>
                    <Link to={"/dashboard"}>
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Content>
                <Form ref={formRef} initialData={{
                    name: user.name,
                    email: user.email,
                }}  onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img
                            src={user?.avatar_url ?? `https://ui-avatars.com/api/?name=${user.name}`}
                            alt={user.name}
                        />
                        <button type={"button"}>
                            <FiCamera />
                        </button>
                    </AvatarInput>

                    <h1>My profile</h1>

                    <Input name={"name"} icon={FiUser} type="text" placeholder="Name"/>
                    <Input name={"email"} icon={FiMail} type="email" placeholder="E-mail"/>

                    <PasswordContainer>
                        <Input name={"old_password"} icon={FiLock} type="password" placeholder="Current password"/>
                        <Input name={"password"} icon={FiLock} type="password" placeholder="New password"/>
                        <Input name={"password_confirmation"} icon={FiLock} type="password" placeholder="Confirm new password"/>
                    </PasswordContainer>

                    <Button type="submit">
                        Confirm changes
                    </Button>
                </Form>
            </Content>
        </Container>
    );
}

export default Profile;
