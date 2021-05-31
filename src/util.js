//heleper function
import React from "react";
import numeral from "numeral";
import { Circle ,Tooltip } from "react-leaflet";

// tryy filter also after completing:
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },

  recovered: {
    hex: "#7DD71D",
    multiplier: 1200,
  },

  deaths: {
    hex: "#C0C0C0",
    multiplier: 2000,
  },
};

export const prettyPrintStat = (stat) => 
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";


//Draw circles on the map
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].multiplier
      }
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
    >
      <Tooltip>
        <div className="info-container">
          <div
            className="infoFlag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          >
          </div>
            <div className="infoName">{country.country}</div>
            <div className="info-cases">
              Cases : {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recoverd">
              Recovered : {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths : {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        
      </Tooltip>
    </Circle>
  ));
