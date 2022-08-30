import React, { FC } from 'react';
import { CommentService } from '../../api/CommentService';
import { useCommentLike } from '../../hooks/commentLike';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IComment } from '../../models/IComment';
import Cross from '../UI/icons/Cross/Cross';
import Like from '../UI/icons/Like/Like';

interface CommentItemProps {
    comment: IComment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
    const { removeEventComment } = useActions();
    const user = useAppSelector(state => state.auth.user);
    const { liked, commentLikes, updateCommentLike } = useCommentLike(comment, user);
    const deleteComment = () => {
        removeEventComment(comment);
    }
    return (
        <div className='row event-item comment-event-item'>
            <div className="cross-wrap">
                {user.username == comment.authorUsername && <Cross onClick={deleteComment} />}
            </div>
            <div className='d-flex justify-content-between comment-event-item-body m-0'>
                <div className="comment-event-item-author text-start"><h6>Author: {comment.authorUsername}</h6></div>
                <div className="d-flex justify-content-end w-25 p-1">
                    <Like elementsPopup={commentLikes.map(com => com.username)} count={commentLikes.length} uniq={comment.id} active={liked} onClick={updateCommentLike} />
                </div>
            </div>
            {/* <hr /> */}
            <div className='d-flex justify-content-between comment-event-item-body m-0'>
                <div>{comment.body}</div>
            </div>
        </div>
    )
}
export default CommentItem;