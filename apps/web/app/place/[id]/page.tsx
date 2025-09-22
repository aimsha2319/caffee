import { notFound } from 'next/navigation';
import { fetchPlace } from '../../../lib/graphql';
import { Card, Chip } from '@caffee/ui';

interface PlacePageProps {
  params: { id: string };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const place = await fetchPlace(params.id);
  if (!place) {
    notFound();
  }
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-400">Verified café</p>
                <h1 className="text-3xl font-semibold text-primary">{place.name}</h1>
                <p className="text-sm text-stone-500">{place.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Chip label="Quick Take: Cozy" />
                <Chip label="Laptop-friendly" />
                <Chip label="Single origin" />
              </div>
            </div>
            <div className="grid gap-3 text-sm text-stone-600 lg:grid-cols-2">
              <div className="rounded-2xl bg-primary/5 p-4">
                <p className="text-xs uppercase tracking-wider text-primary">Overall score</p>
                <p className="mt-1 text-3xl font-semibold text-primary">4.6</p>
                <p className="text-xs text-stone-500">Based on multi-aspect ratings and verified visits</p>
              </div>
              <div className="rounded-2xl bg-secondary/10 p-4">
                <p className="text-xs uppercase tracking-wider text-primary">Coffee dial-in</p>
                <p className="mt-1">Roaster: Shared Space Coffee · Brew: V60, Espresso</p>
                <p className="text-xs text-stone-500">Flavor notes: stone fruit, dark chocolate</p>
              </div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2">
            {place.photos?.slice(0, 4).map((photo: string, idx: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={idx}
                src={photo}
                alt={`${place.name} photo ${idx + 1}`}
                className="h-44 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-primary">Menu highlights</h2>
          <ul className="mt-4 space-y-3">
            {place.menuItems?.map((item: any) => (
              <li key={item.id} className="flex items-center justify-between text-sm text-stone-600">
                <span>
                  {item.name}
                  <span className="ml-2 text-xs uppercase tracking-wide text-stone-400">{item.category}</span>
                </span>
                <span className="font-medium text-stone-800">${item.price?.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-primary">Recent reviews</h2>
          <div className="mt-4 space-y-4">
            {place.reviews?.map((review: any) => (
              <div key={review.id} className="rounded-2xl bg-stone-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-primary">{review.user.name}</p>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {review.overall.toFixed(1)} / 5
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-600">{review.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
