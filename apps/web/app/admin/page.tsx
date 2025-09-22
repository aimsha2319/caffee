import { fetchModerationQueue, fetchRankingAdmin } from '../../lib/graphql';
import { Card } from '@caffee/ui';

export default async function AdminPage() {
  const [queue, ranking] = await Promise.all([fetchModerationQueue(), fetchRankingAdmin()]);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-primary">Trust &amp; safety dashboard</h1>
        <p className="text-sm text-stone-500">Review reports, adjust ranking levers, and audit anomalies.</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-primary">Ranking weights</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {Object.entries(ranking.rankingWeights).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-primary/5 p-3">
                <dt className="text-xs uppercase tracking-wider text-primary">{key}</dt>
                <dd className="text-lg font-semibold text-primary">{Number(value).toFixed(2)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-2xl bg-secondary/10 p-3 text-xs text-primary">
            Toggles: {Object.entries(ranking.rankingToggles)
              .map(([key, val]) => `${key}=${val ? 'on' : 'off'}`)
              .join(' · ')}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-primary">Moderation queue</h2>
          <div className="mt-4 space-y-3">
            {queue.map((report) => (
              <div key={report.id} className="rounded-2xl border border-stone-200 p-3 text-sm text-stone-600">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-400">
                  <span>{report.entityType}</span>
                  <span>Status: {report.status}</span>
                </div>
                <p className="mt-2 font-medium text-stone-700">{report.reason}</p>
                <p className="text-xs text-stone-500">{report.details}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
