import { fetchPlaces } from '../../lib/graphql';

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string> }) {
  const places = await fetchPlaces({ query: searchParams.q ?? undefined });
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Find your next spot</h1>
          <p className="text-sm text-stone-500">Dial in by vibe, dietary needs, brew method, and more.</p>
        </div>
        <form className="flex w-full max-w-xl items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 shadow-sm">
          <input
            className="flex-1 border-none bg-transparent text-sm outline-none"
            placeholder="Search places, dishes, vibes..."
            defaultValue={searchParams.q}
            name="q"
          />
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">Search</button>
        </form>
      </header>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {places.map((place) => (
            <a
              key={place.id}
              href={`/place/${place.id}`}
              className="flex gap-4 rounded-3xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="h-24 w-24 overflow-hidden rounded-2xl bg-stone-200">
                {place.photos?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={place.photos[0]} alt={place.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{place.name}</h3>
                    <p className="text-sm text-stone-500">{place.cuisineTags.join(' · ')}</p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {place.ranking?.composite?.toFixed(2) ?? '—'} trust score
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-stone-500">
                  <span>{'💸'.repeat(place.priceLevel)}</span>
                  <span>Open now · Laptop friendly</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="sticky top-6 hidden h-[600px] rounded-3xl border border-dashed border-primary/40 bg-gradient-to-br from-white via-primary/5 to-primary/10 p-6 text-sm text-stone-500 lg:block">
          <p className="font-semibold text-primary">Live map preview</p>
          <p className="mt-2 leading-relaxed">
            Map clustering, popular times, and outlet counts render here. In local dev we show a placeholder to
            keep dependencies light.
          </p>
          <div className="mt-6 grid gap-3 text-xs">
            <span className="rounded-full bg-white px-3 py-2 shadow">Filter: Open now</span>
            <span className="rounded-full bg-white px-3 py-2 shadow">Vibe: Cozy, third-wave</span>
            <span className="rounded-full bg-white px-3 py-2 shadow">Dietary: Vegan-friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
}
