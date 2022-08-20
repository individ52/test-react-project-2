import React, { FC, useState, useMemo } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useAppSelector } from '../hooks/useTypedSelector';

interface FormWrapProps {
    children: React.ReactNode;
    onSubmitAction: () => void;
}

interface alertData {
    variant: string;
    message: string;
}

const FormWrap: FC<FormWrapProps> = ({ children, onSubmitAction }) => {

    const [validated, setValidated] = useState(false);

    const [alertData, setAlertData] = useState({ variant: "secondary", message: "" } as alertData);

    const { isLoading, error, success } = useAppSelector(state => state.auth);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            onSubmitAction();
        }
        setValidated(true);
    };

    useMemo(() => {
        if (isLoading) {
            setAlertData({
                message: "Loading...",
                variant: "primary"
            });
        } else if (error) {
            setAlertData({
                message: error,
                variant: "danger"
            });
        } else if (success) {
            setAlertData({
                message: success,
                variant: "success"
            });
        } else {
            setAlertData({
                message: "",
                variant: "secondary"
            });
        }
    }, [isLoading, error, success]);

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {alertData.message !== "" && <Alert key={alertData.variant} variant={alertData.variant} className="mt-3">{alertData.message}</Alert>}


            {children}
        </Form>
    )
}
export default FormWrap;