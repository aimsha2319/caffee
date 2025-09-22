import { ScrollView, Text, View, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Button, Card, Chip } from '@caffee/ui';

const FEED_QUERY = gql`
  query MobileFeed {
    feed {
      id
      reason
      review {
        id
        overall
        text
        user { id name handle }
        media { id url type }
      }
    }
  }
`;

export default function HomeScreen() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F2ED' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#4C3A51' }}>Nearby highlights</Text>
        <Text style={{ fontSize: 14, color: '#6F6776' }}>
          Trusted takes from diners you follow and seasonal openings.
        </Text>
      </View>
      {(data?.feed ?? []).map((card: any) => (
        <Card key={card.id}>
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 12, color: '#6F6776', textTransform: 'uppercase' }}>{card.reason}</Text>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#4C3A51' }}>{card.review.user.name}</Text>
              </View>
              <Chip label={`${card.review.overall.toFixed(1)}/5`} selected />
            </View>
            <Text style={{ fontSize: 14, color: '#3f3d46' }}>{card.review.text}</Text>
            {card.review.media?.[0] ? (
              <Image
                source={{ uri: card.review.media[0].url }}
                style={{ width: '100%', height: 200, borderRadius: 20 }}
              />
            ) : null}
            <Button label="View place" />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
