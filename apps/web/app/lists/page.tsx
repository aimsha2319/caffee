import { fetchLists } from '../../lib/graphql';
import { Card, Button } from '@caffee/ui';

export default async function ListsPage() {
  const lists = await fetchLists();
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Your curated lists</h1>
          <p className="text-sm text-stone-500">Spotlight your go-tos and plan crawls with friends.</p>
        </div>
        <Button label="Create list" />
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {lists.map((list) => (
          <Card key={list.id}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">{list.title}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  {list.isCollaborative ? 'Collaborative' : 'Private'}
                </span>
              </div>
              <p className="text-sm text-stone-600">{list.description}</p>
              <div className="flex -space-x-3">
                {list.items.slice(0, 4).map((item: any) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={item.place.id}
                    src={item.place.photos?.[0] ?? 'https://placehold.co/80'}
                    className="h-16 w-16 rounded-2xl border-4 border-white object-cover"
                    alt={item.place.name}
                  />
                ))}
              </div>
              <div className="text-xs uppercase tracking-wide text-stone-400">
                {list.items.length} places · shareable link ready
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
