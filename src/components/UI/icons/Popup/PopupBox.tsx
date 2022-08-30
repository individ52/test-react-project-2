import React, { FC, Ref } from 'react';
import "./popupBox.scss";

interface PopupBoxProps {
    show: boolean;
    elements: string[];
    uniq: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
const PopupBox: FC<PopupBoxProps> = ({ uniq, show, elements, onMouseEnter, onMouseLeave }) => {

    return (
        <div key={uniq} className='popup' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className={"popup-box " + (show ? "popup-box-show" : "")}>
                {elements.length
                    ? elements.map(elem => <p>{elem}</p>)
                    : <p>No likes!</p>}
            </div>
        </div>
    )
}
export default PopupBox;