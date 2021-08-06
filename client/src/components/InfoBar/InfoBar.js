import React from 'react';

import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({ room, code, setCode }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} />
                <h3> Room - {room} </h3>
            </div>

            <select id="dropdown" value={code} defaultValue={code}
                onChange={(event) => {
                    setCode(event.target.value);
                }
                }
            >
                <option value="en"> English</option>
                <option value="ar"> Arabic </option>
                <option value="fr"> French </option>
                <option value="de"> German </option>
                <option value="gu"> Gujarati </option>
                <option value="hi"> Hindi </option>
                <option value="it"> Italian </option>
                <option value="ja"> Japanese </option>
                <option value="ko"> Korean </option>
                <option value="mr"> Marathi </option>
                <option value="nb"> Norwegian </option>
                <option value="pt"> Portuguese </option>
                <option value="pa"> Punjabi </option>
                <option value="ru"> Russian </option>
                <option value="es"> Spanish </option>
                <option value="ur"> Urdu </option>

            </select>

            <div className="rightInnerContainer">
                <a href='/'>
                    <img src={closeIcon} />
                </a>
            </div>
        </div>
    );
}
export default InfoBar;