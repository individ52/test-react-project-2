import React, { FC, useState, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IEvent } from '../../models/IEvent';
import Comment from '../UI/icons/Comment/Comment';
import FollowerIcon from '../UI/icons/Followers/followers';
import Like from '../UI/icons/Like/Like';
import "./Event.css";

interface FullEventItemProps {

}

const FullEventItem: FC<FullEventItemProps> = ({ }) => {
    const { event, comments, followers, likes, success } = useAppSelector(state => state.event);
    const [showEvent, setShowEvent] = useState(false);
    const { setCurEvent } = useActions();
    useEffect(() => {
        if (event) {
            setShowEvent(true);
        }
    }, [event]);

    const goToFullEvents = () => {
        setShowEvent(false);
        setTimeout(() => {
            setCurEvent({} as IEvent);
        }, 1000);
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
            <div className="socials">
                <div className="d-flex justify-content-between w-25">
                    {/* <Like count={likes.length} uniq={event.id} active={liked} onClick={updateLike} /> */}
                    {/* <Comment count={comments.length} uniq={event.id} /> */}
                    {/* <FollowerIcon count={followers.length} uniq={event.id} /> */}
                </div>
            </div>
        </div>
    )
}
export default FullEventItem;