import React, { FC, useState, useEffect, useMemo } from 'react';
import { isJSDocLinkCode } from 'typescript';
import { useFetchEventComments, useFetchEventFollowers } from '../../hooks/event';
import { useEventLike } from '../../hooks/eventLike';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IComment } from '../../models/IComment';
import { IEvent } from '../../models/IEvent';
import { IEventLike } from '../../models/IEventLike';
import { IFollower } from '../../models/IFollower';
import Comment from '../UI/icons/Comment/Comment';
import FollowerIcon from '../UI/icons/Followers/followers';
import Like from '../UI/icons/Like/Like';
import "./Event.css";
interface EventItemProps {
    event: IEvent;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
    const { user } = useAppSelector(state => state.auth);
    const { date } = useAppSelector(state => state.events);
    const [comments, setComments] = useState<IComment[]>([]);
    const [followers, setFollowers] = useState<IFollower[]>([]);
    const fetchEventComments = useFetchEventComments(event.id);
    const fetchEventFollowers = useFetchEventFollowers(event.id);

    const { likes, setEventLikes, liked, updateLike } = useEventLike(event.id, user);
    const { setCurEvent, setCurEventComments, setCurEventLikes, setCurEventFollowers, setIsLiked } = useActions();

    const setEventComments = async () => {
        const dbComments = await fetchEventComments();
        setComments(dbComments);
    }
    const setEventFolllowers = async () => {
        const dbFollowers = await fetchEventFollowers();
        setFollowers(dbFollowers);
    }

    const setCurEventHandler = () => {
        setCurEvent(event);
        setCurEventComments(comments);
        setCurEventLikes(likes);
        setCurEventFollowers(followers);
        setIsLiked(liked);
    }
    useEffect(() => {
        setEventLikes();
        setEventComments();
        setEventFolllowers();
    }, [date, comments]);

    return (
        <div className='row event-item'>
            <div className='d-flex justify-content-between event-item-body m-0'>
                <div className="event-item-author text-start"><h5>{event.authorUsername}</h5></div>
                <div className="d-flex justify-content-between w-25">
                    <Like count={likes.length} uniq={event.id} active={liked} onClick={updateLike} />
                    <Comment count={comments.length} uniq={event.id} />
                    <FollowerIcon count={followers.length} uniq={event.id} />
                </div>
            </div>
            <hr />
            <div className='d-flex justify-content-between event-item-body m-0'>
                <div onClick={setCurEventHandler}><h4>{event.title}</h4></div>
            </div>
        </div>
    )
}
export default EventItem;