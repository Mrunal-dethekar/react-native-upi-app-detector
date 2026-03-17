import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { getUPIApps } from 'react-native-upi-app-detector';
import type { UPIAppResult } from 'react-native-upi-app-detector';

export default function App() {
  const [apps, setApps] = useState<UPIAppResult[]>([]);

  useEffect(() => {
    getUPIApps().then(setApps);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>UPI Apps Detected</Text>
        {apps.map((app) => (
          <View key={app.appName} style={styles.row}>
            <Text style={styles.name}>{app.appName}</Text>
            <Text style={app.isPresent ? styles.present : styles.absent}>
              {app.isPresent ? 'Installed' : 'Not Installed'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  present: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  absent: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});
