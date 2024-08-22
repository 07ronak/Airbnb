const graph_api = process.env.GRAPH_API;

// Function to perform geocoding using GraphHopper API with Nominatim provider
async function geocode(address) {
  const apiKey = graph_api;

  const params = new URLSearchParams({
    q: address,
    locale: "en",
    limit: "1",
    reverse: "false",
    debug: "false",
    provider: "nominatim",
    key: apiKey,
  }).toString();

  try {
    const response = await fetch(
      `https://graphhopper.com/api/1/geocode?${params}`,
      { method: "GET" }
    );
    const data = await response.json();
    return data;
    //cut from here
  } catch (error) {
    console.error("Error during geocoding:", error);
  }
}

module.exports.geocode = geocode;
/* geocode("Gurugram, India"); */
