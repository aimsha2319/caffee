const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:4000/graphql';

async function gqlFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 30 }
  });
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL request failed');
  }
  return json.data;
}

export async function fetchFeed() {
  const data = await gqlFetch<{ feed: Array<any> }>(
    `query Feed {
      feed {
        id
        type
        reason
        review {
          id
          overall
          text
          createdAt
          user { id name handle photoUrl }
          media { id url type }
          itemsReviewed { id menuItem { id name } rating }
        }
      }
    }`
  );
  return data.feed;
}

export async function fetchPlaces(filters?: Record<string, unknown>) {
  const data = await gqlFetch<{ places: Array<any> }>(
    `query Places($filters: PlaceFilterInput) {
      places(filters: $filters) {
        id
        name
        photos
        cuisineTags
        priceLevel
        ranking { composite overall }
      }
    }`,
    { filters }
  );
  return data.places;
}

export async function fetchPlace(id: string) {
  const data = await gqlFetch<{ place: any }>(
    `query Place($id: String!) {
      place(id: $id) {
        id
        name
        address
        photos
        cuisineTags
        priceLevel
        reviews {
          id
          overall
          text
          user { id name handle }
          media { id url type }
        }
        menuItems { id name category price }
      }
    }`,
    { id }
  );
  return data.place;
}

export async function fetchLists() {
  const data = await gqlFetch<{ myLists: Array<any> }>(
    `query Lists {
      myLists {
        id
        title
        description
        isCollaborative
        items { place { id name photos } note }
      }
    }`
  );
  return data.myLists;
}

export async function fetchModerationQueue() {
  const data = await gqlFetch<{ moderationQueue: Array<any> }>(
    `query Moderation {
      moderationQueue {
        id
        entityType
        entityId
        reason
        status
        details
      }
    }`
  );
  return data.moderationQueue;
}

export async function fetchRankingAdmin() {
  return gqlFetch<{ rankingWeights: any; rankingToggles: any }>(
    `query RankingAdmin {
      rankingWeights {
        qualityWeight
        recencyWeight
        trustWeight
        diversityWeight
        consistencyWeight
        mediaWeight
      }
      rankingToggles {
        freezeOnAlerts
        boostVerifiedVisits
        suppressAdsInOrganic
      }
    }`
  );
}
