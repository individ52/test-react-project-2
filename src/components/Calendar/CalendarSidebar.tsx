import React, { FC, useEffect, useMemo, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IEvent } from '../../models/IEvent';
import { formateDate, getDateFromString } from '../../utils/date';
import EventItem from '../Event/EventItem';
import FullEventItem from '../Event/FullEventItem';
import FormWrap from '../FormWrap';
import Loader from '../UI/Loader/Loader';
import "./CalendarSidebar.scss";
interface CalendarSidebarProps {

}

const CalendarSidebar: FC<CalendarSidebarProps> = ({ }) => {
    const { dateEvents, date, error, success, isLoadingEvent } = useAppSelector(state => state.events);
    const { event: curEvent } = useAppSelector(state => state.event);
    const { user } = useAppSelector(state => state.auth);
    const [addModal, setAddModal] = useState<boolean>(false);
    const [formEvent, setFormEvent] = useState<IEvent>({} as IEvent);
    const { addEvent, fetchEvents } = useActions();
    useEffect(() => {
        // console.log("date is updated: " + date);
        fetchEvents(getDateFromString(date));
        setFormEvent({
            ...formEvent,
            authorUsername: user.username,
            date: date,
            description: "",
            title: ""
        });
        // setDateTitle(date);
    }, [date])

    useMemo(() => {
        console.log("dateEvents is updated: ", dateEvents);
    }, [dateEvents]);

    useMemo(() => {
        console.log("isLoading", isLoadingEvent)
    }, [isLoadingEvent]);

    const closeAddModal = () => {
        setAddModal(false);
    }
    const openAddModal = () => {
        setAddModal(true);
    }
    const addNewEvent = () => {
        // console.log("add formEvent", formEvent)
        addEvent(formEvent);
        if (!isLoadingEvent) {
            setTimeout(() => {
                setAddModal(false)
            }, 3000);
        }

    }

    useMemo(() => {
        if (!isLoadingEvent && success) {
            setTimeout(() => {
                setAddModal(false)
            }, 3000);
        }
    }, [isLoadingEvent]);

    return (
        <div className='calendar-sidebar'>
            <h2>Events for: {date}</h2>
            <button className='btn btn-outline-secondary w-100 fs-4' onClick={openAddModal}>Add new Event</button>
            <div className='calendar-events-wrap'>
                {isLoadingEvent && <Loader />}
                {!curEvent.id
                    ? <div className={["calendar-events", curEvent.id ? "" : "calendar-events-show"].join(" ")}>
                        {dateEvents.length
                            ? dateEvents.map(event => <EventItem event={event} />)
                            : <h3>No events</h3>
                        }
                    </div>
                    : <div className="calendar-event">
                        {curEvent.id && <FullEventItem />}
                    </div>
                }

            </div>
            <Modal show={addModal} onHide={closeAddModal} aria-labelledby="contained-modal-title-vcenter" centered size="lg" >
                <Modal.Header closeButton >
                    <Modal.Title>Add new event</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <FormWrap error={error} isLoading={isLoadingEvent} success={success} onSubmitAction={addNewEvent}>
                        <Row className="mb-3">
                            <Form.Group controlId="validationCustom01" as={Row}>
                                <Form.Label column sm={2}>Event title</Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        onChange={(e) => setFormEvent({ ...formEvent, title: e.target.value })}
                                        required
                                        type="text"
                                        placeholder="Title"
                                    />
                                </Col>
                                <Form.Control.Feedback type='invalid'>Invalid title</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <FloatingLabel controlId="floatingTextarea2" label="Event description">
                            <Form.Control
                                required
                                onChange={(e) => setFormEvent({ ...formEvent, description: e.target.value })}
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                            <Form.Control.Feedback type='invalid'>Invalid description</Form.Control.Feedback>
                        </FloatingLabel>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeAddModal}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </FormWrap>
                </Modal.Body>

            </Modal>
        </div>
    )
}
export default CalendarSidebar;