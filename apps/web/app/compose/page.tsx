'use client';

import { useState } from 'react';
import { Button, Card, Chip } from '@caffee/ui';
import { useMutation, gql } from '@apollo/client';

const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      overall
    }
  }
`;

export default function ComposePage() {
  const [placeId, setPlaceId] = useState('');
  const [text, setText] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mutate, { loading, data }] = useMutation(CREATE_REVIEW);

  const handleSubmit = async () => {
    await mutate({
      variables: {
        input: {
          placeId,
          overall: 4.5,
          text,
          items: [],
          media: mediaUrls.map((url) => ({ url, type: 'photo', width: 1000, height: 750 }))
        }
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-primary">Share a review</h1>
        <p className="text-sm text-stone-500">Media-first composer with menu tagging and vibe chips.</p>
      </header>
      <Card>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-stone-700">Place ID</label>
            <input
              className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
              placeholder="Search and select a place"
              value={placeId}
              onChange={(event) => setPlaceId(event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">Quick takes</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Cozy', 'Laptop-friendly', 'Third-wave', 'Great for dates'].map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">Story</label>
            <textarea
              className="mt-2 min-h-[140px] w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm"
              placeholder="Tell people what to order, when to go, and any pro tips"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-700">Media URLs</label>
            <input
              className="mt-2 w-full rounded-2xl border border-dashed border-stone-300 px-4 py-3 text-sm"
              placeholder="Paste an image URL and press enter"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  const value = (event.target as HTMLInputElement).value;
                  if (value) {
                    setMediaUrls((prev) => [...prev, value]);
                    (event.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {mediaUrls.map((url) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={url} src={url} alt="upload" className="h-24 w-full rounded-2xl object-cover" />
              ))}
            </div>
          </div>
          <Button label={loading ? 'Posting…' : 'Post review'} onPress={handleSubmit} />
          {data ? <p className="text-sm text-green-600">Review posted!</p> : null}
        </div>
      </Card>
    </div>
  );
}
