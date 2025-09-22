import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GraphQLProvider } from '../apollo';

export default function RootLayout() {
  return (
    <GraphQLProvider>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4C3A51',
          tabBarStyle: { paddingBottom: 6, height: 60 },
          headerStyle: { backgroundColor: '#4C3A51' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' }
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="search" options={{ title: 'Discover' }} />
        <Tabs.Screen name="compose" options={{ title: 'Create' }} />
        <Tabs.Screen name="lists" options={{ title: 'Lists' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </GraphQLProvider>
  );
}
