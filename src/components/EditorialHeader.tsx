import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Layout } from '@/constants/theme';
import { MountainMotif } from './MountainMotif';
import { useWishlist } from '@/context/WishlistContext';

export const EditorialHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { wishlistIds } = useWishlist();
  const isDesktop = width >= 768;

  const navItems = [
    { label: 'Discover', path: '/' },
    { label: 'Destinations', path: '/explore' },
    { label: 'Saved Escapes', path: '/wishlist', badge: wishlistIds.length },
    { label: 'Find My Escape', path: '/find-escape', highlight: true },
  ];

  return (
    <header style={{ width: '100%' } as any}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {/* TERRA Brand Wordmark & Tagline */}
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="TERRA Home"
            onPress={() => router.push('/')}
            style={({ pressed }) => [styles.brandWrapper, pressed && styles.pressed]}>
            <MountainMotif size={26} color={Colors.forestGreen} />
            <View style={styles.brandTextGroup}>
              <Text style={styles.brandTitle}>TERRA</Text>
              <Text style={styles.brandSubtitle}>A DEEPER WAY TO TRAVEL</Text>
            </View>
          </Pressable>

          {/* Desktop Navigation Links */}
          {isDesktop ? (
            <View style={styles.desktopNav}>
              {navItems.map((item) => {
                const isActive =
                  item.path === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.path);

                return (
                  <Pressable
                    key={item.path}
                    accessibilityRole="link"
                    onPress={() => router.push(item.path as any)}
                    style={({ pressed }) => [
                      styles.navLink,
                      item.highlight && styles.highlightLink,
                      isActive && !item.highlight && styles.activeNavLink,
                      pressed && styles.pressed,
                    ]}>
                    <Text
                      style={[
                        styles.navText,
                        isActive && styles.activeNavText,
                        item.highlight && styles.highlightNavText,
                      ]}>
                      {item.label}
                    </Text>

                    {item.badge !== undefined && item.badge > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ) : (
            /* Mobile Quick Header Actions */
            <View style={styles.mobileRightActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Saved Wishlist"
                onPress={() => router.push('/wishlist')}
                style={({ pressed }) => [styles.mobileIconBtn, pressed && styles.pressed]}>
                <Ionicons
                  name={wishlistIds.length > 0 ? 'heart' : 'heart-outline'}
                  size={22}
                  color={wishlistIds.length > 0 ? Colors.heartActive : Colors.forestGreen}
                />
                {wishlistIds.length > 0 && (
                  <View style={styles.mobileBadge}>
                    <Text style={styles.mobileBadgeText}>{wishlistIds.length}</Text>
                  </View>
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </header>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    zIndex: 100,
  },
  innerContainer: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  brandWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  brandTextGroup: {
    flexDirection: 'column',
  },
  brandTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 26,
    letterSpacing: 3,
    color: Colors.forestGreen,
    lineHeight: 28,
  },
  brandSubtitle: {
    fontFamily: Fonts.sansMedium,
    fontSize: 9,
    letterSpacing: 2.2,
    color: Colors.mutedOlive,
    marginTop: 2,
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    gap: 6,
    position: 'relative',
  },
  navText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 14,
    color: Colors.darkText,
    letterSpacing: 0.5,
  },
  activeNavLink: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.terracotta,
  },
  activeNavText: {
    fontFamily: Fonts.sansBold,
    color: Colors.forestGreen,
  },
  highlightLink: {
    backgroundColor: Colors.forestGreen,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Layout.borderRadiusPill,
  },
  highlightNavText: {
    color: Colors.softCream,
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    letterSpacing: 0.8,
  },
  badge: {
    backgroundColor: Colors.terracotta,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontFamily: Fonts.sansBold,
    fontSize: 10,
  },
  mobileRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  mobileIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.softCream,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mobileBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.terracotta,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  mobileBadgeText: {
    color: Colors.white,
    fontFamily: Fonts.sansBold,
    fontSize: 9,
  },
  pressed: {
    opacity: 0.7,
  },
});
