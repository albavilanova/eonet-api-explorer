interface EventSource {
  id: string;
  title: string;
  url: string;
}

interface EventCategory {
  id:
    | "drought"
    | "dustHaze"
    | "earthquakes"
    | "floods"
    | "landslides"
    | "manmade"
    | "seaLakeIce"
    | "severeStorms"
    | "snow"
    | "tempExtremes"
    | "volcanoes"
    | "waterColor"
    | "wildfires";
  title: string;
}

interface EventGeometry {
  magnitudeValue: number;
  magnitudeUnit: string;
  date: string;
  type: string;
  coordinates: number[];
}

export class Event {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public closed: string,
    public categories: EventCategory[],
    public sources: EventSource[],
    public geometry: EventGeometry[],
    public geometryDates: string[]
  ) {}
}

export const loadEvents = async (options: {
  limit?: number;
  start?: string;
  end?: string;
  source?: string;
  category?: string;
  status?: string;
  bbox?: string;
}) => {
  // Append optional parameters to url
  const url = new URL(`https://eonet.gsfc.nasa.gov/api/v3/events`);
  Object.entries(options).forEach(([key, value]) => {
    console.log(options);
    url.searchParams.append(key, value.toString());
  });

  // Get results
  const response = await fetch(url);
  const results = (await response.json()) as any;

  // Save them in an array
  const events: Array<Event> = [];
  for (const {
    id,
    title,
    description,
    closed,
    categories,
    sources,
    geometry,
    geometryDates,
  } of results["events"]) {
    events.push(
      new Event(
        id,
        title,
        description,
        closed,
        categories,
        sources,
        geometry,
        geometryDates
      )
    );
  }

  return events;
};
