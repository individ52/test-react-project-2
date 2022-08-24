import React, { FC } from 'react';
import "./Cross.scss";
interface CrossProps {
    onClick: () => void;
}

const Cross: FC<CrossProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className="plus">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                <defs />
                <path d="M26 0h12v64H26z" />
                <path d="M0 38V26h64v12z" />
            </svg>
        </div>
    )
}
export default Cross;