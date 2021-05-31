import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
    const history = useHistory();

    return(
        <div style={{ textAlign: "center" }}>
            <Button variant="outlined" onClick={()=>
                history.push("/")
            }>Home</Button>
            <Button variant="outlined" onClick={()=>
                history.push("/weather")
            }>Weather App</Button>
            <Button variant="outlined" onClick={()=>
                history.push("/finder")
            }>Restaurant Finder</Button>
        </div>
    );
}

export default NavBar;