import React, { FC, Ref } from 'react';
import "./popupBox.scss";

interface PopupBoxProps {
    show: boolean;
    elements: string[];
    uniq: number;
}

const PopupBox: FC<PopupBoxProps> = ({ uniq, show, elements }) => {

    return (
        <div key={uniq} className='popup'>
            <div className={"popup-box " + (show ? "popup-box-show" : "")}>
                {elements.length
                    ? elements.map(elem => <p>{elem}</p>)
                    : <p>No likes!</p>}
            </div>
        </div>

    )
}
export default PopupBox;