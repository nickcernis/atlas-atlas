const fetch = require("node-fetch");
const queries = require("./queries.js");
const geo = require("./geo.js");
const graphQLEndpoint = "https://atlasatlas.wpengine.com/graphql";

/**
 * Gets stats about people.
 *
 * @param {object} req
 * @param {object} res
 */
async function peopleStats(req, res) {
  await fetch(graphQLEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: queries.people }),
  })
    .then((r) => r.json())
    .then((result) => {
      const countries = geo.getCountries(result.data.people.nodes);
      const cityFrequency = geo.getCityFrequency(result.data.people.nodes);
      const maxEmployees = Math.max(...Object.values(cityFrequency));
      const cityData = Object.keys(cityFrequency).map((city) => {
        return {
          label: city,
          height: cityFrequency[city],
          ...(city in geo.cityPositions ? geo.cityPositions[city] : {}),
        };
      });
      res.send({
        countries,
        maxEmployees,
        cities: cityData,
      });
    });
}

module.exports = { peopleStats };
