import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Calendar from '../components/Calendar/Calendar';

interface CalendarPageProps {

}

const CalendarPage: FC<CalendarPageProps> = ({ }) => {
    return (
        <div>
            <h1 className="mt-3 text-center">Events</h1>
            <Row>
                <Col className='text-center' xs lg="7">
                    <Calendar />
                </Col>
                <Col className='text-center bg-secondary' xs lg="5">
                    <h2>
                        Message
                    </h2>
                </Col>
            </Row>
        </div>
    )
}
export default CalendarPage;