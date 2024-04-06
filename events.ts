export const loadEvents = async () => {
  const response = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/events/`);
  const results = await response.json();
  return results
};