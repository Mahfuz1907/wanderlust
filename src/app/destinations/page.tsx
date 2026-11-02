import DestinationExplorer from "./destination-explorer";


const AllDestinationsPage = async () => {
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/destinations`,
    );
  const destinations = await res.json();
  console.log(destinations);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 sm:px-14">
      <h1 className="text-4xl font-medium text-zinc-900 sm:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Find your perfect travel experience from our curated collection
      </p>

      <DestinationExplorer destinations={destinations} />
    </main>
  );
};

export default AllDestinationsPage;
