import React, { FC, useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useEventLike } from '../../hooks/eventLike';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IEvent } from '../../models/IEvent';
import CommentForm from '../Comment/CommentForm';
import CommentItem from '../Comment/CommentItem';
import Comment from '../UI/icons/Comment/Comment';
import FollowerIcon from '../UI/icons/Followers/followers';
import Like from '../UI/icons/Like/Like';
import "./Event.css";

interface FullEventItemProps {

}

const FullEventItem: FC<FullEventItemProps> = ({ }) => {
    const { user } = useAppSelector(state => state.auth);
    const { event, comments, followers, success, likes, isLiked } = useAppSelector(state => state.event);
    const [showEvent, setShowEvent] = useState(false);
    const { setCurEvent, fetchEventComments } = useActions();
    const dispatch = useDispatch();
    // const { isLiked, liked, setLiked } = useEventLike(event.id, user, likes);
    const { updateEventLikes } = useActions();

    useEffect(() => {
        if (event) {
            setShowEvent(true);
            fetchEventComments(event.id);
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
            <div className="socials d-flex justify-content-end">
                <div className="d-flex justify-content-between w-25">
                    <Like count={likes.length} uniq={event.id} active={isLiked} onClick={() => updateEventLikes(isLiked, event.id, user.username)} />
                    <Comment count={comments.length} uniq={event.id} />
                    <FollowerIcon count={followers.length} uniq={event.id} />
                </div>
            </div>
            <h3>Comments</h3>
            <CommentForm event={event} />
            {comments.length
                ? comments.map(comment => <CommentItem comment={comment} />)
                : <h4>No comments</h4>}
        </div>
    )
}
export default FullEventItem;