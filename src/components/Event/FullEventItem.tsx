import React, { FC, useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IEvent } from '../../models/IEvent';
import "./Event.css";

interface FullEventItemProps {

}

const FullEventItem: FC<FullEventItemProps> = ({ }) => {
    const { event } = useAppSelector(state => state.event);
    const [showEvent, setShowEvent] = useState(false);
    const { setEvent } = useActions();
    useEffect(() => {
        if (event) {
            setShowEvent(true);
        }
    }, [event]);

    const goToFullEvents = () => {
        setEvent({} as IEvent);
        setShowEvent(false);

    }

    return (
        <div className={`full-event ${showEvent ? "active-full-event" : ""}`}>
            <div className='event-arrow-back' onClick={goToFullEvents}>
                <i className='main'></i>
            </div>
            <h2>{event.title}</h2>
            <hr />
            <p>{event.description}</p>
            <p className='author'>{event.authorUsername}</p>
        </div>
    )
}
export default FullEventItem;