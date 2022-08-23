import React, { FC, useState } from 'react';
import "./like.css";
import PopupBox from './PopupBox';
export interface SocialIconProps {
    active?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    count: number;
    elementsPopup?: string[];
    uniq: number;
}

const Like: FC<SocialIconProps> = ({ uniq, count = 0, active, onClick, elementsPopup }) => {

    const [showPopup, setShowPopup] = useState(false);

    return (
        <div key={uniq} className='popup-parent'>
            <div className={"like " + (active ? "on" : "")} onClick={onClick} onMouseEnter={() => setShowPopup(true)} onMouseLeave={() => setShowPopup(false)}>
                <svg viewBox="0 0 24 24">
                    <use xlinkHref="#heart" />
                    <use xlinkHref="#heart" />
                </svg>
                <svg className="hide" viewBox="0 0 40 40">
                    <defs>
                        <path id="heart" d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
                    </defs>
                </svg>
                <div className="comment-icon-text text-center fw-bolder lh-1 fs-5">{count}</div>
            </div>
            {elementsPopup && <PopupBox key={uniq} uniq={uniq} show={showPopup} elements={elementsPopup} />}
        </div>
    )
}
export default Like;