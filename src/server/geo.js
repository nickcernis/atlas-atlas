/**
 * Gives a normalized unique list of country codes.
 *
 * @example
 * ```
 * getCountries([
 *  { countryCode: "USA" },
 *  { countryCode: "usa" },
 *  { countryCode: "IrL" },
 * ]);
 * // => ["USA", "IRL"]
 * ```
 * @param {array} people Containing at least a countryCode property.
 * @returns {array} Unique country codes.
 */
function getCountries(people) {
  const isUnique = (v, i, a) => a.indexOf(v) === i;
  return people
    .map((person) => person.countryCode.toUpperCase())
    .filter(isUnique);
}

/**
 * Gives a normalized frequency table of cities people live in.
 *
 * @example
 * ```
 * getCityFrequency([
 *  { city: "amsterdam" },
 *  { city: "Amsterdam" },
 *  { city: "London" },
 * ]);
 *
 * // => { amsterdam: 2, london: 1 }
 * ```
 * @param {array} people Containing at least a 'city' key.
 * @returns {object} Cities as keys, frequencies as values.
 */
function getCityFrequency(people) {
  return people.reduce((acc, person) => {
    const key = person.city.toLowerCase();
    acc[key] = key in acc ? acc[key] + 1 : 1;
    return acc;
  }, {});
}

/**
 * City positions, hard-coded for now.
 *
 * TODO: fetch this data from a related cities model.
 */
const cityPositions = {
  allen: { lat: "33.1032", lng: "-96.6706" },
  austin: { lat: "30.2672", lng: "-97.7431" },
  "colorado springs": { lat: "38.8339", lng: "-104.8214" },
  concord: { lat: "37.9780", lng: "-122.0311" },
  detroit: { lat: "42.3314", lng: "-83.0458" },
  innsbruck: { lat: "47.2692", lng: "11.4041" },
  krakow: { lat: "50.0647", lng: "19.9450" },
  limerick: { lat: "52.6638", lng: "-8.6267" },
  "los angeles": { lat: "34.0522", lng: "-118.2437" },
  lynchburg: { lat: "37.4138", lng: "-79.1422" },
  omaha: { lat: "41.2565", lng: "-95.9345" },
  "san antonio": { lat: "29.4241", lng: "-98.4936" },
  sarasota: { lat: "27.3364", lng: "-82.5307" },
  tualatin: { lat: "45.3780", lng: "-122.7822" },
  williamston: { lat: "42.6889", lng: "-84.2830" },
};

module.exports = { getCountries, getCityFrequency, cityPositions };
