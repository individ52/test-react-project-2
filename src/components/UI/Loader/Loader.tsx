import { FC } from 'react';
import "./Loader.css";

interface LoaderProps {
    centred?: boolean;
}

const Loader: FC<LoaderProps> = ({ centred = false }) => {
    const classes = [];
    if (centred) classes.push("d-flex justify-content-center");
    return (
        <div className={classes.join(" ")}>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
export default Loader;