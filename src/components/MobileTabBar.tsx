import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';
import { useWishlist } from '@/context/WishlistContext';

export const MobileTabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { wishlistIds } = useWishlist();

  // Only show on mobile screens
  if (width >= 768) {
    return null;
  }

  const tabs = [
    {
      name: 'Discover',
      path: '/',
      activeIcon: 'compass' as const,
      inactiveIcon: 'compass-outline' as const,
    },
    {
      name: 'Explore',
      path: '/explore',
      activeIcon: 'map' as const,
      inactiveIcon: 'map-outline' as const,
    },
    {
      name: 'Saved',
      path: '/wishlist',
      activeIcon: 'heart' as const,
      inactiveIcon: 'heart-outline' as const,
      badge: wishlistIds.length,
    },
    {
      name: 'Matcher',
      path: '/find-escape',
      activeIcon: 'sparkles' as const,
      inactiveIcon: 'sparkles-outline' as const,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive =
          tab.path === '/' ? pathname === '/' : pathname.startsWith(tab.path);

        return (
          <Pressable
            key={tab.path}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.name}
            onPress={() => router.push(tab.path as any)}
            style={({ pressed }) => [styles.tabItem, pressed && styles.pressed]}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={isActive ? tab.activeIcon : tab.inactiveIcon}
                size={22}
                color={isActive ? Colors.terracotta : Colors.forestGreen}
              />
              {tab.badge !== undefined && tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
              ]}>
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 76 : 64,
    paddingBottom: Platform.OS === 'ios' ? 16 : 6,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 999,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 26,
  },
  tabLabel: {
    fontFamily: Fonts.sansMedium,
    fontSize: 10,
    color: Colors.mutedText,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  activeTabLabel: {
    color: Colors.terracotta,
    fontFamily: Fonts.sansBold,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.terracotta,
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: Colors.white,
    fontFamily: Fonts.sansBold,
    fontSize: 9,
  },
  pressed: {
    opacity: 0.7,
  },
});
