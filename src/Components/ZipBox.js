import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import Toggle from "./Toggle";
import Current from "./Current";
import { IsSubmitContext } from '../Contexts/isSubmitContext';
import { AddressContext } from "../Contexts/addressContext";

const API_KEY = process.env.REACT_APP_WEATHER_api_key;
const API_KEY_2 = process.env.REACT_APP_FINDER_api_key;

const ZipBox = (props) => {

  const [hourWeather, setHourWeather] = useState([]); 
  const [hourTemps, setHourTemps] = useState([]);
  const [hourMains, setHourMains] = useState([]);
  const [dayTemps, setDayTemps] = useState([]);
  const [dayMains, setDayMains] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentMain, setCurrentMain] = useState("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { address, setAddress } = useContext(AddressContext);
  const { isSubmit, setIsSubmit } = useContext(IsSubmitContext);

  const [formatAddress, setFormatAddress] = useState("");
  
  useEffect(() => {
    if(isSubmit){
      let add = address;
      add = encodeURIComponent(add.trim());
      console.log(address);
      
      let geocode = 'https://maps.googleapis.com/maps/api/geocode/json?';
      geocode += "address=" + add;
      geocode += "&key=";
      geocode += API_KEY_2;
      console.log(geocode);
  
      axios.get(geocode)
          .then(res => {
              if(res.data.results.length > 0){
              console.log(res);
              setLatitude(res.data.results[0].geometry.location.lat);
              setLongitude(res.data.results[0].geometry.location.lng);
              setFormatAddress(res.data.results[0].formatted_address);
              }
              else{
                  alert("Invalid Address!");
                  setIsSubmit(false);
              }
          });
  
  }}, [isSubmit, address]);

  useEffect(() => {
    const urlO = new URL("https://api.openweathermap.org/data/2.5/onecall");

    urlO.searchParams.append("lat", latitude);
    urlO.searchParams.append("lon", longitude);
    urlO.searchParams.append("exclude", "minutely");
    urlO.searchParams.append("appid", API_KEY);
    urlO.searchParams.append("units", "imperial"); 

    fetch(urlO)
    .then((resp) => {
      return resp.json();
    })
    .then((obj) => {
      console.log(obj);
      // also important to check html error codes
      // 400 means errors
      if (obj.cod !== 400 && isSubmit) {
        console.log(obj);
        setCurrentTemp(obj.current.temp);
        setCurrentMain(obj.current.weather[0].main);
        setHourWeather(obj.hourly);
        setDailyWeather(obj.daily);
     } else {
        if(isSubmit)
          alert("Please refresh and enter a valid ZipCode");
      }
    });
  }, [longitude, latitude]);

  useEffect(() => {
    let a = hourWeather.map(h => h.temp);
    setHourTemps(a);
    let b = hourWeather.map(h => h.weather[0].main);
    setHourMains(b);
  }, [hourWeather]);

  useEffect(() => {
    let a = dailyWeather.map(d => d.temp.day);
    setDayTemps(a);
    let b = dailyWeather.map(d => d.weather[0].main);
    setDayMains(b);
  }, [dailyWeather]);

  const onSubmit = (e) => {
    e.preventDefault();  
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* !isSubmit && (
      <div className = "ZipForm">
        <form onSubmit={onSubmit}>
          <h1>What's your zip?</h1>
          <p>Enter zip code:</p>
          <input
            className="zip"
            value={zipCode || ""}
            type="text"
            name="zip"
            id="zip"
            onChange={(event) => {
              const { value } = event.target;
              setZipCode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
            }}
          />
        </form>
          </div>) */}
      <div> 
        {isSubmit && (address !== "") && (
          <div className="Current">
            <Current temp={currentTemp} weather={currentMain} address={formatAddress}/>
          </div>
        )}
      </div>
      <div> 
        {isSubmit && (address !== "") && (
          <div className = "Toggle" >
          <Toggle hourTemps={hourTemps} hourMains={hourMains} dayTemps={dayTemps} dayMains={dayMains}/>
          </div>
        )}
      </div>
      </div>
  );
}

export default ZipBox;