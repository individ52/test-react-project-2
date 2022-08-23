import React, { FC, useState, useEffect, useMemo } from 'react';
import { isJSDocLinkCode } from 'typescript';
import { useFetchEventComments, useFetchEventFollowers, useFetchEventLikes } from '../../hooks/event';
import { useAddEventLike, useRemoveEventLike } from '../../hooks/like';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IComment } from '../../models/IComment';
import { IEvent } from '../../models/IEvent';
import { IEventLike } from '../../models/IEventLike';
import { IFollower } from '../../models/IFollower';
import Comment from '../UI/icons/Comment';
import FollowerIcon from '../UI/icons/followers';
import Like from '../UI/icons/Like';
import "./Event.css";
interface EventItemProps {
    event: IEvent;
}

const EventItem: FC<EventItemProps> = ({ event }) => {
    const [liked, setLiked] = useState(false);
    const { user } = useAppSelector(state => state.auth);
    const { date } = useAppSelector(state => state.event);
    const [likes, setLikes] = useState<IEventLike[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [followers, setFollowers] = useState<IFollower[]>([]);
    const fetchEventLikes = useFetchEventLikes(event.id);
    const fetchEventComments = useFetchEventComments(event.id);
    const fetchEventFollowers = useFetchEventFollowers(event.id);
    const addLike = useAddEventLike(event.id, user.username);
    const removeLike = useRemoveEventLike(event.id, user.username);

    const updateLike = async () => {
        if (liked) await removeLike();
        else await addLike();
        await setEventLikes();
    }
    const setEventLikes = async () => {
        const dbLikes = await fetchEventLikes();
        // console.log("dbLikes", dbLikes);
        setLikes(dbLikes);
    }
    const setEventComments = async () => {
        const dbComments = await fetchEventComments();
        setComments(dbComments);
    }
    const setEventFolllowers = async () => {
        const dbFollowers = await fetchEventFollowers();
        setFollowers(dbFollowers);
    }
    const isLiked = (): boolean => {
        const userLike = likes.find(userLike => userLike.username === user.username);
        if (userLike) return true;
        return false;
    }
    useMemo(() => {
        setLiked(isLiked());
    }, [likes]);

    useEffect(() => {
        // console.log(event.title, " => loaded");
        setEventLikes();
        setEventComments();
        setEventFolllowers();
    }, [date]);

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
                <div className=""><h4>{event.title}</h4></div>
            </div>
        </div>
    )
}
export default EventItem;