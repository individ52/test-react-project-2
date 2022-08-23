import React, { FC } from 'react';
import Col from "react-bootstrap/Col";
import { useState } from 'react';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import FormWrap from './FormWrap';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useTypedSelector';

interface LoginFormProps {

}

interface IFormUser {
    username: string;
    password: string;
}

const LoginForm: FC<LoginFormProps> = ({ }) => {
    const [formUser, setFormUser] = useState({
        password: "",
        username: ""
    } as IFormUser);

    const { login } = useActions();

    const onSubmit = () => {
        login(formUser.username, formUser.password);
    }

    const { error, isLoading, success } = useAppSelector(state => state.auth);

    return (
        <FormWrap onSubmitAction={onSubmit} error={error} isLoading={isLoading} success={success}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={(e) => setFormUser({ ...formUser, username: e.target.value })}
                        required
                        type="text"
                        placeholder="Username"
                    />
                    <Form.Control.Feedback type='invalid'>Invalid username</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                        required
                        type="password"
                        placeholder="Password"
                    />
                    <Form.Control.Feedback type='invalid'>Invalid password</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
        </FormWrap >
    )
}
export default LoginForm;