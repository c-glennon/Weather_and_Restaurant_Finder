import React, { useContext } from 'react';

const Current = (props) => {

return (
    <div style={{ textAlign: "center" }}>
        <h1>Current Weather</h1>
        <h2>Temp: {props.temp} Weather: {props.weather}</h2>
        <h3>{props.address}</h3>
    </div>
);
}

export default Current;