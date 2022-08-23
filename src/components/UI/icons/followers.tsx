import React, { FC } from 'react';
import "./comment.scss";
import { SocialIconProps } from './Like';



const FollowerIcon: FC<SocialIconProps> = ({ count }) => {
    return (
        <div className="comment-icon">
            <svg className="mds-icon" id="icon-settings" viewBox="0 0 24 24"><title>icon-profile</title><circle cx="12" cy="8" r="5" /><path d="M3,21H3a8,8,0,0,1,8-8h2a8,8,0,0,1,8,8h0" /></svg>
            <div className="comment-icon-text text-center fw-bolder lh-1 fs-5">{count}</div>
        </div>
    )
}
export default FollowerIcon;