import { ScrollView, Text, View, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@caffee/ui';

const LISTS_QUERY = gql`
  query MobileLists {
    myLists {
      id
      title
      description
      isCollaborative
      items { place { id name photos } }
    }
  }
`;

export default function ListsScreen() {
  const { data } = useQuery(LISTS_QUERY);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F2ED' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#4C3A51' }}>Lists</Text>
          <Text style={{ fontSize: 14, color: '#6F6776' }}>Collaborate with friends and share itineraries.</Text>
        </View>
        <Button label="New list" />
      </View>
      {(data?.myLists ?? []).map((list: any) => (
        <View key={list.id} style={{ backgroundColor: '#fff', borderRadius: 24, padding: 16, gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#4C3A51' }}>{list.title}</Text>
            <Text style={{ fontSize: 12, color: '#6F6776' }}>{list.isCollaborative ? 'Collaborative' : 'Personal'}</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#6F6776' }}>{list.description}</Text>
          <View style={{ flexDirection: 'row' }}>
            {list.items.slice(0, 3).map((item: any) => (
              <Image
                key={item.place.id}
                source={{ uri: item.place.photos?.[0] ?? 'https://placehold.co/60' }}
                style={{ width: 80, height: 80, borderRadius: 18, marginRight: 8 }}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
