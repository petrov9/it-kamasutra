import preloader from "../../../preloader.svg";
import React from "react";

type PropsType = {
}

const Preloader: React.FC<PropsType> = (props) => {
    return (
        <div style={{backgroundColor: 'white'}}>
            <img style={{width: '150px'}} src={preloader} />
        </div>
    );
}

export default Preloader;
