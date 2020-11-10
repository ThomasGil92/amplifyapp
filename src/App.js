import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

//Array of cities
import { cities } from "./cities";

import { setCity } from "./reducers/selectedCityReducer";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedCity = useSelector((state) => {
    return state.selectedCity;
  });
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState();

  useEffect(() => {
    if (selectedCity) {
      console.log(cities);
      setPosition([selectedCity.lat, selectedCity.lng]);
    }
  }, [selectedCity]);

  const handleChange = (event) => {
    const name = event.target.value;
    const newCity = cities.find((element) => {
      return element.name === name;
    });

    dispatch(setCity(name, newCity.lat, newCity.lng));
    setPosition([`${newCity.lat}`, `${newCity.lng}`]);
    map.setView([newCity.lat, newCity.lng], 13);
    map.getCenter();
  };

  return (
    <div className="vw-100 ">
      {position && (
        <Fragment>
          <div className="mb-3">
            <FormControl className={classes.formControl}>
              <Select value={selectedCity.name} onChange={handleChange}>
                {cities.map((city) => {
                  return (
                    <MenuItem key={city.lat} value={city.name}>
                      {city.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <MapContainer
            className="vw-100"
            style={{ height: "500px" }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            whenCreated={setMap}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Center of {selectedCity.name}</Popup>
            </Marker>
          </MapContainer>
        </Fragment>
      )}
    </div>
  );
};
export default App;
