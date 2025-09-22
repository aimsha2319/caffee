import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { Button, Chip } from '@caffee/ui';

const CREATE_REVIEW = gql`
  mutation MobileCreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      overall
    }
  }
`;

export default function ComposeScreen() {
  const [placeId, setPlaceId] = useState('');
  const [text, setText] = useState('');
  const [mutate, { loading, data }] = useMutation(CREATE_REVIEW);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F2ED' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#4C3A51' }}>Compose</Text>
        <Text style={{ fontSize: 14, color: '#6F6776' }}>
          Camera-first workflow with offline drafts. Attach media, tag menu items, and vibe chips.
        </Text>
      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 16, gap: 16 }}>
        <TextInput
          value={placeId}
          onChangeText={setPlaceId}
          placeholder="Place ID"
          style={{ borderWidth: 1, borderColor: '#E0D7EA', borderRadius: 18, paddingHorizontal: 16, paddingVertical: 12 }}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {['Cozy', 'Third-wave', 'Great for groups'].map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={6}
          placeholder="Tell people what to order and any pro tips"
          style={{
            borderWidth: 1,
            borderColor: '#E0D7EA',
            borderRadius: 18,
            paddingHorizontal: 16,
            paddingVertical: 12,
            textAlignVertical: 'top'
          }}
        />
        <Button
          label={loading ? 'Saving…' : 'Post review'}
          onPress={() =>
            mutate({
              variables: { input: { placeId, overall: 4.5, text, items: [], media: [] } }
            })
          }
        />
        {data ? <Text style={{ color: '#2E7D32' }}>Review saved!</Text> : null}
      </View>
    </ScrollView>
  );
}
