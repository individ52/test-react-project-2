import React, { FC } from 'react';
import "./Switcher.css";
interface SwitcherProps {
    value: boolean;
    setValue: (value: boolean) => void;
    left: string;
    right: string;
}

const Switcher: FC<SwitcherProps> = ({ value, setValue, left, right }) => {
    return (
        <div className="switches-container">
            <input type="radio" id={`switch${left}`} name="switchPlan" onChange={() => { }} value={left} checked={value} />
            <input type="radio" id={`switch${right}`} name="switchPlan" onChange={() => { }} value={right} checked={!value} />
            <label onClick={() => setValue(true)}>{left}</label>
            <label onClick={() => setValue(false)}>{right}</label>
            <div className="switch-wrapper">
                <div className="switch">
                    <div>{left}</div>
                    <div>{right}</div>
                </div>
            </div>
        </div>
    )
}
export default Switcher;