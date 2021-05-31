import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FilterButtons from './FilterButtons';
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

const SearchBar = () => {

    const { address } = useContext(AddressContext);
    console.log(address);
    const { isSubmit, setIsSubmit } = useContext(IsSubmitContext);
    //const [temp, setTemp] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
       // setAddress(temp);
        //setIsAddressSubmit(true);
      }

    const classes = useStyles();

    return (
        <div style={{ textAlign: "center" }}>
        <br></br>
        <FilterButtons isAddressSubmit={isSubmit} address={address}/>
        </div>
    );
}

export default SearchBar;