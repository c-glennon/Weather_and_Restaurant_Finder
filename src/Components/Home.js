import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { AddressContext } from "../Contexts/addressContext";
import { IsSubmitContext } from '../Contexts/isSubmitContext';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
  }));

const Home = () => {

    const [temp, setTemp] = useState("");
    const { address, setAddress } = useContext(AddressContext);
    const { isSubmit, setIsSubmit } = useContext(IsSubmitContext);

    const onSubmit = (e) => {
        e.preventDefault();
        if(temp !== ""){
        setAddress(temp);
        setIsSubmit(true);
        console.log(address);
        }
      }

    const classes = useStyles();

    return (
        <div style = {{ textAlign: "center"}}>
            <h1>The Weather/Restaurant Combo!</h1>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}> 
            <TextField id="outlined-basic" label="Enter address to get weather and restaurants" variant="outlined" 
                onChange={(e) => {
                    const { value } = e.target;
                    setTemp(value);
                }}
             />
        </form>
        {isSubmit  && (
            <div>
                <h2>Your info is ready!</h2>
            </div>
        )}
        </div>
    );
}

export default Home;