import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { AddressContext } from "../Contexts/addressContext";

const API_KEY = process.env.REACT_APP_FINDER_api_key;

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
    },
  }));

const ResList = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [location, setLocation] = useState("");
    const [isLocationSet, setIsLocationSet] = useState(false);
    const [filterChanged, setFilterChanged] = useState(false);
    const [formatAddress, setFormatAddress] = useState("");

    const { address } = useContext(AddressContext);

    useEffect(() => {
    let add = address;
    add = encodeURIComponent(add.trim());
    console.log(add);
    
    let geocode = 'https://maps.googleapis.com/maps/api/geocode/json?';
    geocode += "address=" + add;
    geocode += "&key=";
    geocode += API_KEY;
    console.log(geocode);

    axios.get(geocode)
        .then(res => {
            if(res.data.results.length > 0){
            console.log(res);
            let lat = res.data.results[0].geometry.location.lat;
            let lon = res.data.results[0].geometry.location.lng;
            let location = lat + "," + lon;
            setFormatAddress(res.data.results[0].formatted_address);
            setLocation(location);
            }
            else
                alert("Invalid Address!");
        });

    setIsLocationSet(true);
    
    }, [address]);

    useEffect(() => {
    
    if(isLocationSet){
        
    const u = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=16000');
    u.searchParams.append("key", API_KEY);
    u.searchParams.append("location", location);

    const params = u.searchParams;
    //console.log(params.get('type'));

    if(props.filter === "restaurant" || filterChanged === false){
        u.searchParams.append("type", "restaurant");
        setFilterChanged(true);
    }
    if(props.filter === "bars")
        u.searchParams.append("type", "bar");
    if(props.filter === "cafes" )
        u.searchParams.append("type", "cafe");

    console.log(u);

    axios.get(u)
        .then(res => {
            console.log(res); 
            setRestaurants(res.data.results);
        });
    }
    }, [location, props.filter]);

    const dol = "$";
    const classes = useStyles();

    return (
        <div className="ResList">
            <div>
                <h3 style={{ textAlign: "center" }}>
                    {formatAddress}
                </h3>
            </div>
        <Grid container alignItems="center" justify="center" >
            {(restaurants.map(e => {
        return <div> {(typeof e.opening_hours !== "undefined" && e.opening_hours.open_now) && (
            <div className={classes.root}>
            <Grid >
            <Paper className={classes.paper} variant="outlined" elevation={3}>
            <p>{e.name}:</p>
                <ul>
                    <li>Price: {(typeof e.price_level !== "undefined") ? dol.repeat(e.price_level) : "Unavailable"}</li>
                    <li>Rating: {(typeof e.rating !== "undefined") ? e.rating +"/5" : "Unavailable" }</li>
                </ul>
            </Paper>
            </Grid>
            </div>
        )}</div>
        }
        ))}
        </Grid>
        </div>
    );
}

export default ResList;