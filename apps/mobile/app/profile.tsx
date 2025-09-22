import { ScrollView, Text, View, Switch } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F5F2ED' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#4C3A51' }}>Profile</Text>
        <Text style={{ fontSize: 14, color: '#6F6776' }}>Control your foodie footprint and privacy.</Text>
      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#4C3A51' }}>Notifications</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#6F6776' }}>Weekly digest</Text>
          <Switch value trackColor={{ true: '#4C3A51' }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#6F6776' }}>Owner replies</Text>
          <Switch value trackColor={{ true: '#4C3A51' }} />
        </View>
        <Text style={{ fontSize: 12, color: '#6F6776' }}>
          Quiet hours respect 10pm-8am unless you opt into critical alerts.
        </Text>
      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#4C3A51' }}>Dietary lenses</Text>
        <Text style={{ fontSize: 14, color: '#6F6776' }}>
          Vegetarian · No peanuts · Specialty coffee dial-ins
        </Text>
      </View>
    </ScrollView>
  );
}
