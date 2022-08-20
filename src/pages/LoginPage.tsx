import React, { FC, useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';
import Switcher from '../components/UI/Switcher/Switcher';

interface LoginPageProps {

}

export interface IFormUser {
    username: string;
    password: string;
}

const LoginPage: FC<LoginPageProps> = ({ }) => {
    const [isLogin, setLogin] = useState(true);
    return (
        <Row className="h100 d-flex justify-content-center align-items-center" >
            <Card className='h-60 p-4 w-50'>
                <Switcher left='Login' right='Register' setValue={setLogin} value={isLogin} />
                {isLogin
                    ? <LoginForm />
                    : <RegForm />}

            </Card>
        </Row>
    )
}
export default LoginPage;