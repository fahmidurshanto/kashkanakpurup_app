import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ServiceItem {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  label: string;
}

const SERVICES: ServiceItem[] = [
  { icon: 'home', label: 'হোল্ডিং আবেদন' },
  { icon: 'groups', label: 'ওয়ারিশ সনদ আবেদন' },
  { icon: 'brightness-7', label: 'ট্রেড লাইসেন্স আবেদন' },
  { icon: 'brightness-5', label: 'নাগরিক সনদপত্র আবেদন' },
];

export default function EServiceScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderAccent} />
        <Text style={styles.sectionHeaderText}>ই-সেবাসমূহ</Text>
      </View>

      {/* Service Grid */}
      <View style={styles.serviceGrid}>
        {SERVICES.map((service, index) => (
          <TouchableOpacity key={index} style={styles.serviceItem} activeOpacity={0.6}>
            <MaterialIcons name={service.icon} size={42} color="#2e7d32" />
            <Text style={styles.serviceLabel}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sectionHeaderAccent: {
    width: 5,
    height: '100%',
    minHeight: 36,
    backgroundColor: '#2e7d32',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 24,
  },
  serviceItem: {
    alignItems: 'center',
    width: 80,
  },
  serviceLabel: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 6,
  },
});
