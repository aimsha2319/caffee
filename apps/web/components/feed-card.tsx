"use client";

import { Card, Chip } from '@caffee/ui';
import Image from 'next/image';

interface FeedCardProps {
  card: any;
}

export function FeedCardComponent({ card }: FeedCardProps) {
  const review = card.review;
  if (!review) return null;
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-400">{card.reason}</p>
            <h3 className="text-lg font-semibold text-primary">{review.user.name}</h3>
            <p className="text-sm text-stone-500">@{review.user.handle}</p>
          </div>
          <Chip label={`${review.overall.toFixed(1)}/5`} selected />
        </div>
        <p className="text-sm leading-relaxed text-stone-700">{review.text}</p>
        {review.media?.length ? (
          <div className="grid grid-cols-2 gap-3">
            {review.media.map((media: any) => (
              <div key={media.id} className="relative h-48 overflow-hidden rounded-2xl">
                <Image src={media.url} alt={media.type} fill className="object-cover" />
                {media.type === 'video' ? (
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                    Video
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {review.itemsReviewed.map((item: any) => (
            <Chip key={item.id} label={`${item.menuItem.name} · ${item.rating.toFixed(1)}`} />
          ))}
        </div>
      </div>
    </Card>
  );
}
