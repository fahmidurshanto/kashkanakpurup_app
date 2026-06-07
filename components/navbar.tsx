import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface NavItem {
  label: string;
  icon?: string;
  route: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: '', icon: 'house.fill', route: '/' },
  { label: 'আমাদের পরিষদ', route: '/council' },
  { label: 'ই-সেবা কেন্দ্র', route: '/e-service' },
  { label: 'যাচাই', route: '/verify' },
  { label: 'লগইন', route: '/login' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = (route: string) => {
    if (pathname === route) return; // Already on this screen
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.route || (item.route === '/' && pathname === '/');

          return (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() => handlePress(item.route)}
              activeOpacity={0.6}
            >
              {item.icon ? (
                <IconSymbol
                  name={item.icon as any}
                  size={18}
                  color={isActive ? '#006400' : '#333333'}
                />
              ) : (
                <Text
                  style={[
                    styles.navText,
                    isActive && styles.navTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#cccccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cccccc',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 24,
  },
  navItem: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  navText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#006400',
    fontWeight: '700',
  },
});
