const people = `
{
  people(first: 100) {
    nodes {
      countryCode
      city
    }
  }
}`;

module.exports = { people };
