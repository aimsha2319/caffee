export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Profile &amp; preferences</h1>
          <p className="text-sm text-stone-500">Manage dietary tags, privacy, and notification cadence.</p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Identity</h2>
          <form className="mt-4 space-y-4 text-sm">
            <div>
              <label className="block text-stone-500">Display name</label>
              <input className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3" defaultValue="Ava Foodnerd" />
            </div>
            <div>
              <label className="block text-stone-500">Handle</label>
              <input className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3" defaultValue="@avaeats" />
            </div>
            <div>
              <label className="block text-stone-500">Dietary lenses</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Vegetarian', 'Nut-free', 'Halal'].map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </form>
        </section>
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Notifications</h2>
          <div className="mt-4 space-y-3 text-sm text-stone-600">
            <label className="flex items-center justify-between">
              <span>Digest frequency</span>
              <select className="rounded-full border border-stone-200 px-4 py-2">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Quiet hours</option>
              </select>
            </label>
            <label className="flex items-center justify-between">
              <span>Push: friend posts nearby</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
            <label className="flex items-center justify-between">
              <span>Email: owner replies</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
