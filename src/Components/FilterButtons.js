import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import ResList from './ResList';
import { AddressContext } from "../Contexts/addressContext";
import { IsSubmitContext } from "../Contexts/isSubmitContext";

const FilterButtons = () => {

    const [filter, setFilter] = useState("restaurant");
    const { address } = useContext(AddressContext);
    const { isSubmit } = useContext(IsSubmitContext);

    return (
        <div style={{ textAlign: "center"}}>
            <Button variant="outlined" onClick={() => {(filter !== "restaurant") && setFilter("restaurant")}}>Restaurants</Button>
            <Button variant="outlined" onClick={() => {(filter === "bar") ? setFilter("bars") : setFilter("bars")}}>Bars</Button>
            <Button variant="outlined" onClick={()=> {(filter === "cafe") ? setFilter("cafes") : setFilter("cafes")}}>Cafes</Button>
            <div style={{ textAlign: "left"}}>
            
            {isSubmit && (
                <ResList filter={filter} address={address}/>
                )}
        </div>
        </div>
    );
}

export default FilterButtons;