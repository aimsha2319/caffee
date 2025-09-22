import { useState } from 'react';
import { ScrollView, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const PLACES_QUERY = gql`
  query MobilePlaces($filters: PlaceFilterInput) {
    places(filters: $filters) {
      id
      name
      photos
      cuisineTags
      ranking { composite }
    }
  }
`;

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data, refetch } = useQuery(PLACES_QUERY, { variables: { filters: { query } } });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F2ED' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#4C3A51' }}>Search the scene</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => refetch({ filters: { query } })}
          placeholder="Try: cozy latte art, vegan tacos, third-wave"
          style={{
            backgroundColor: '#fff',
            borderRadius: 18,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 14,
            borderColor: '#E0D7EA',
            borderWidth: 1
          }}
        />
      </View>
      {(data?.places ?? []).map((place: any) => (
        <TouchableOpacity key={place.id} style={{ backgroundColor: '#fff', borderRadius: 24, padding: 16, gap: 12 }}>
          <Image
            source={{ uri: place.photos?.[0] ?? 'https://placehold.co/300x200' }}
            style={{ width: '100%', height: 180, borderRadius: 20 }}
          />
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#4C3A51' }}>{place.name}</Text>
            <Text style={{ fontSize: 14, color: '#6F6776' }}>{place.cuisineTags.join(' · ')}</Text>
            <Text style={{ fontSize: 12, color: '#4C3A51' }}>
              Trust score {place.ranking?.composite?.toFixed(2) ?? '—'} · Map &amp; filters available on web
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
