import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EditorialHeader } from '@/components/EditorialHeader';
import { DestinationCard } from '@/components/DestinationCard';
import { EmptyState } from '@/components/EmptyState';
import { MountainMotif } from '@/components/MountainMotif';
import { Colors, Fonts, Spacing, Layout } from '@/constants/theme';
import { DESTINATIONS } from '@/data/destinations';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { wishlistIds, clearWishlist } = useWishlist();

  const isDesktop = width >= 992;
  const isTablet = width >= 640 && width < 992;

  // Filter destinations that match the saved IDs
  const savedDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => wishlistIds.includes(d.id));
  }, [wishlistIds]);

  const handleClearAll = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to clear all your saved escapes?')) {
        clearWishlist();
      }
    } else {
      Alert.alert(
        'Clear Saved Escapes',
        'Are you sure you want to remove all destinations from your wishlist?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear All', style: 'destructive', onPress: clearWishlist },
        ]
      );
    }
  };

  // Responsive grid columns
  const gridColumns = isDesktop ? 3 : isTablet ? 2 : 1;
  const cardWidth =
    gridColumns === 3
      ? '31.6%'
      : gridColumns === 2
      ? '48.5%'
      : '100%';

  return (
    <View style={styles.screen}>
      <EditorialHeader />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isDesktop && styles.scrollContentMobile,
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerInner}>
            <View style={styles.breadcrumb}>
              <MountainMotif size={16} color={Colors.terracotta} />
              <Text style={styles.breadcrumbText}>PERSONAL TRAVEL ARCHIVE</Text>
            </View>

            <View style={styles.titleRow}>
              <View>
                <Text style={styles.title}>Your Saved Escapes</Text>
                <Text style={styles.subtitle}>
                  A curated collection of Indian destinations reserved for your
                  upcoming journeys.
                </Text>
              </View>

              {savedDestinations.length > 0 && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear all saved escapes"
                  onPress={handleClearAll}
                  style={({ pressed }) => [
                    styles.clearBtn,
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons name="trash-outline" size={15} color={Colors.terracotta} />
                  <Text style={styles.clearBtnText}>Clear All</Text>
                </Pressable>
              )}
            </View>

            {/* Quick Summary Pill Bar */}
            <View style={styles.summaryBar}>
              <View style={styles.summaryBadge}>
                <Ionicons name="bookmark" size={14} color={Colors.forestGreen} />
                <Text style={styles.summaryBadgeText}>
                  {savedDestinations.length}{' '}
                  {savedDestinations.length === 1 ? 'Sanctuary' : 'Sanctuaries'} Saved
                </Text>
              </View>

              <Text style={styles.storageNote}>
                Persisted locally on device via AsyncStorage
              </Text>
            </View>
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.bodyWrapper}>
          {savedDestinations.length > 0 ? (
            <View style={styles.grid}>
              {savedDestinations.map((destination) => (
                <View key={destination.id} style={{ width: cardWidth }}>
                  <DestinationCard destination={destination} />
                </View>
              ))}
            </View>
          ) : (
            <EmptyState
              icon="heart-outline"
              title="Your Archive is Empty"
              description="You have not saved any escapes yet. Explore the TERRA collection and tap the heart icon on any sanctuary to preserve it for your journey."
              actionLabel="Discover Escapes"
              onAction={() => router.push('/')}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  scrollContentMobile: {
    paddingBottom: 90,
  },
  headerWrapper: {
    backgroundColor: Colors.paperLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  headerInner: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    gap: Spacing.md,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breadcrumbText: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.terracotta,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  title: {
    fontFamily: Fonts.serifBold,
    fontSize: 38,
    color: Colors.forestGreen,
  },
  subtitle: {
    fontFamily: Fonts.sansRegular,
    fontSize: 15,
    color: Colors.mutedText,
    marginTop: 4,
    maxWidth: 600,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.softCream,
    borderWidth: 1,
    borderColor: Colors.terracotta,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: Layout.borderRadiusPill,
    alignSelf: 'center',
  },
  clearBtnText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Colors.terracotta,
  },
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.softCream,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadiusPill,
  },
  summaryBadgeText: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.forestGreen,
  },
  storageNote: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedOlive,
  },
  bodyWrapper: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  pressed: {
    opacity: 0.8,
  },
});
