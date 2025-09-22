import { fetchFeed } from '../../lib/graphql';
import { FeedCardComponent } from '../../components/feed-card';

export default async function HomePage() {
  const feed = await fetchFeed();
  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-primary">Today’s tasting table</h2>
          <p className="text-sm text-stone-500">
            Personalized bites from trusted creators and neighbors.
          </p>
        </div>
        <div className="hidden rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-500 md:block">
          Why you see this: proximity + people you follow
        </div>
      </header>
      <section className="grid gap-4">
        {feed.map((card) => (
          <FeedCardComponent key={card.id} card={card} />
        ))}
      </section>
    </div>
  );
}
