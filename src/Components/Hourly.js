import React from 'react';

const Hourly = (props) => {

return(
    <div style={{ textAlign: "center" }}>
    <div className = "Hourly">
        <u1>
            {props.temps.map((value,index)=>{
                return <div>Hour: {index+1} Temp: {value} Weather: {props.mains[index]}</div>
            })}

        </u1>
    </div>
    </div>
);

}

export default Hourly;