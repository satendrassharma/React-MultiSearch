import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [inputs, setInputs] = useState({
    country: "",
    capital: "",
    region: "",
    subregion: ""
  });

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/mledoze/countries/master/countries.json";
    fetch(url)
      .then(data => data.json())
      .then(json => {
        const parsejson = json.map(
          ({ capital, latlng, name: { common }, region, subregion }) => ({
            capital: capital.join(" "),
            latlng,
            common,
            region,
            subregion
          })
        );
        console.log(parsejson);
        setData(parsejson);
        setSearch(parsejson);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    console.log(inputs);
    const countryResult = filter(inputs.country, data, "common");
    const capitalResult = filter(inputs.capital, countryResult, "capital");
    const regionResult = filter(inputs.region, capitalResult, "region");
    const subregionResult = filter(inputs.subregion, regionResult, "subregion");
    console.log({
      countryResult,
      capitalResult,
      regionResult,
      subregionResult
    });
    setSearch(subregionResult);
  }, [inputs.country, inputs.capital, inputs.region, inputs.subregion]);

  const filter = (input, data, name) => {
    if (input == "") {
      return data;
    }
    const tdata = data.filter(item => {
      if (item[name].toLowerCase().match(input)) {
        return item;
      }
    });
    return tdata;
  };

  // const SearchByCountry = () => {
  //   // let dataToSearch = country.length > inputs.country ? search : data;
  //   if (inputs.country == "") {
  //     return data;
  //   }
  //   const tdata = data.filter(item => {
  //     if (item.common.toLowerCase().match(inputs.country)) {
  //       return item;
  //     }
  //   });
  //   return tdata;
  // };
  // const SearchByCapital = tdata => {
  //   if (inputs.capital == "") {
  //     return tdata;
  //   }
  //   const data = tdata.filter(item => {
  //     if (
  //       item.capital
  //         .join(" ")
  //         .toLowerCase()
  //         .match(inputs.capital)
  //     ) {
  //       return item;
  //     }
  //   });
  //   return data;
  // };
  // const SearchByRegion = tdata => {
  //   if (inputs.region == "") {
  //     return tdata;
  //   }
  //   const data = tdata.filter(item => {
  //     if (item.region.toLowerCase().match(inputs.region)) {
  //       return item;
  //     }
  //   });
  //   return data;
  // };
  // const SearchBySubregion = tdata => {
  //   if (inputs.subregion == "") {
  //     return tdata;
  //   }
  //   const data = tdata.filter(item => {
  //     if (item.subregion.toLowerCase().match(inputs.subregion)) {
  //       return item;
  //     }
  //   });
  //   return data;
  // };

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value.toLowerCase() });
  };

  return (
    <div className="wrapper">
      <header className="header">
        <h1>React MultiSearch</h1>
      </header>
      <div className="table inputss">
        <input
          type="text"
          name="country"
          onChange={handleChange}
          value={inputs.country}
          placeholder="filter by country"
        />
        <input
          type="text"
          name="capital"
          onChange={handleChange}
          value={inputs.capital}
          placeholder="filter by capital"
        />
        <input
          type="text"
          name="region"
          onChange={handleChange}
          value={inputs.region}
          placeholder="filter by region"
        />
        <input
          type="text"
          name="subregion"
          onChange={handleChange}
          value={inputs.subregion}
          placeholder="filter by subregion"
        />
      </div>
      <div className="table">
        <div className="label">Country</div>
        <div className="label">Capital</div>
        <div className="label">Region</div>
        <div className="label">SubRegion</div>
        <div className="label">Latitude</div>
        <div className="label">Longitude</div>
      </div>
      {search.map(data => (
        <div className="table">
          <div className="value">{data.common}</div>
          <div className="value">{data.capital}</div>
          <div className="value">{data.region}</div>
          <div className="value">{data.subregion}</div>
          <div className="value">{data.latlng[0].toFixed(2)}</div>
          <div className="value">{data.latlng[1].toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
