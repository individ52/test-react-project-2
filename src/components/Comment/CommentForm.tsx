import React, { FC, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { IComment } from '../../models/IComment';
import FormWrap from '../FormWrap';
import Col from "react-bootstrap/Col";
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IEvent } from '../../models/IEvent';
import { useActions } from '../../hooks/useActions';


interface CommentFormProps {
    event: IEvent;
}

const CommentForm: FC<CommentFormProps> = ({ event }) => {
    const username = useAppSelector(state => state.auth.user.username);
    const { comments } = useAppSelector(state => state.event);
    const defaultComment = {
        authorUsername: username,
        body: "",
        eventId: event.id
    } as IComment;
    const [comment, setComment] = useState<IComment>(defaultComment);
    const { addEventComment } = useActions();
    const addComment = () => {
        if (comment.body) {
            addEventComment(comment);
            setComment(defaultComment);
            console.log(comments)
        }
    }
    return (
        <FormWrap error='' isLoading={false} onSubmitAction={addComment} success=''>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Control
                        onChange={(e) => setComment({ ...comment, body: e.target.value })}
                        required
                        type="text"
                        placeholder="Leave a comment here"
                        as="textarea"
                        value={comment.body}
                        style={{ height: '75px' }}
                    />
                </Form.Group>
            </Row>
            <div className="d-flex justify-content-end">
                <Button type="submit">Submit form</Button>

            </div>
        </FormWrap>
    )
}
export default CommentForm;