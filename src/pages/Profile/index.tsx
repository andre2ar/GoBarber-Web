import React, {ChangeEvent, useCallback, useRef} from "react";
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
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {addToast} = useToast();
    const history = useHistory();

    const { user, updateUser } = useAuth();

    const handleSubmit = useCallback(async (data: ProfileFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .required('E-mail is required')
                    .email('Type a valid e-mail'),
                old_password: Yup.string(),
                password: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Mandatory field'),
                    otherwise: Yup.string(),
                }),
                password_confirmation: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Mandatory field'),
                    otherwise: Yup.string(),
                }).oneOf([Yup.ref('password'), undefined], 'Password must match'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const response = await api.put('/profile', data);
            updateUser(response.data);

            addToast({
                type: "success",
                title: "Successfully updated",
                description: "Profile information were updated",
            });
        } catch (err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationError(err);
                formRef.current?.setErrors(errors);
                return;
            }

            addToast({
                type: 'error',
                title: 'Could not save',
                description: 'You profile could not be updated'
            });
        }
    }, [addToast, history]);

    const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) {
            return;
        }

        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        try {
            const response = await api.patch('/users/avatar', formData);
            addToast({
                type: 'success',
                title: 'Avatar updated'
            });

            updateUser(response.data);
        } catch (e) {
            addToast({
                type: 'error',
                title: 'Avatar could not be updated'
            });
        }
    }, [addToast, updateUser]);

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
                        <label htmlFor='avatar'>
                            <FiCamera />
                            <input type='file' id='avatar' onChange={handleAvatarChange} />
                        </label>
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
