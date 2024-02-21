interface Plant {
  id: number;
  common_name: string;
  slug: string;
  scientific_name: string;
  year: number;
  bibliography: string;
  synonyms: string;
  image_url: string;
}

async function plantInfoData() {
  const response = await fetch(
    "https://trefle.io/api/v1/plants?token=68K0RChApR3UWk_E3V_4bkZRlf9g9SnnGSmkwYApUT4",
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("No data found");
  }

  const data = await response.json();
  return data.data;
}

export default async function PlantSearch() {
  try {
    const plants: Array<Plant> = await plantInfoData();

    return (
      <main className="w-full h-full max-md:mt-5 overflow-hidden">
        <h1>Plant Testing</h1>
        <div>
          <ul>
            {plants.map((plant) => (
              <li key={plant.id}>
                <strong>
                  {plant.common_name} / {plant.scientific_name}{" "}
                </strong>
                {plant.synonyms}
                <img
                  src={plant.image_url}
                  alt={`${plant.common_name} image`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching plant data:", error);
    return (
      <main className="w-full h-full max-md:mt-5 overflow-hidden">
        <h1>Error Loading Plants</h1>
      </main>
    );
  }
}
