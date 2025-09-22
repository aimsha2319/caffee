'use client';

import { useState } from 'react';
import { Button, Card } from '@caffee/ui';
import { gql, useMutation } from '@apollo/client';

const CLAIM_PLACE = gql`
  mutation ClaimPlace($input: ClaimPlaceInput!) {
    claimPlace(input: $input) {
      id
      status
    }
  }
`;

export default function OwnerConsolePage() {
  const [placeId, setPlaceId] = useState('');
  const [documents, setDocuments] = useState('');
  const [mutate, { data, loading }] = useMutation(CLAIM_PLACE);

  const submitClaim = async () => {
    await mutate({ variables: { input: { placeId, documents: documents.split(',').map((d) => d.trim()) } } });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-primary">Owner console</h1>
        <p className="text-sm text-stone-500">Manage your menu, reply to guests, and post updates.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold text-primary">Claim your place</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <label className="block text-stone-500">Place ID</label>
              <input
                className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3"
                value={placeId}
                onChange={(event) => setPlaceId(event.target.value)}
              />
            </div>
            <div>
              <label className="block text-stone-500">Documents</label>
              <input
                className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3"
                placeholder="Upload URLs, separated by commas"
                value={documents}
                onChange={(event) => setDocuments(event.target.value)}
              />
            </div>
            <Button label={loading ? 'Submitting…' : 'Submit claim'} onPress={submitClaim} />
            {data ? (
              <p className="text-sm text-green-600">Claim status: {data.claimPlace.status}</p>
            ) : null}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-primary">Menu manager</h2>
          <div className="mt-4 space-y-3 text-sm text-stone-600">
            <p>Drag-and-drop CSV or connect your POS to sync menu items.</p>
            <div className="rounded-2xl border border-dashed border-primary/40 p-6 text-center text-xs uppercase tracking-wide">
              CSV Import Dropzone
            </div>
            <p className="text-xs text-stone-400">Pending updates appear in preview before going live.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
