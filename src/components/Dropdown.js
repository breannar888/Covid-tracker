import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";


function DropdownCountry({ stats, setStats, country }) {

  const handleChange = (e) => {
    setStats(e.target.value);
  };

  if (stats) {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 150, }}>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Country"
            value={stats}
            onChange={handleChange}
          >
            {country.map((countries) => (
              <MenuItem key={countries.country} value={countries}>{countries.country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
  return <></>;
}

export default DropdownCountry;
