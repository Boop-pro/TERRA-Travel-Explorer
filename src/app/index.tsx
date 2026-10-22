import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  useWindowDimensions,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EditorialHeader } from '@/components/EditorialHeader';
import { CategoryChips } from '@/components/CategoryChips';
import { DestinationCard } from '@/components/DestinationCard';
import { MountainMotif } from '@/components/MountainMotif';
import { EmptyState } from '@/components/EmptyState';
import { Colors, Fonts, Spacing, Layout, Shadows } from '@/constants/theme';
import { DESTINATIONS } from '@/data/destinations';
import { Category } from '@/types';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const isDesktop = width >= 992;
  const isTablet = width >= 640 && width < 992;

  // Filter destinations based on category and search query
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category, number>> = { All: DESTINATIONS.length };
    DESTINATIONS.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Compute responsive columns for cards
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
        {/* ================= HERO SECTION ================= */}
        <View style={styles.heroWrapper}>
          <View style={[styles.heroContainer, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            <View style={styles.heroTextCol}>
              <View style={styles.taglineBadge}>
                <MountainMotif size={18} color={Colors.terracotta} />
                <Text style={styles.taglineBadgeText}>
                  DISCOVER THE SOUL OF INDIA
                </Text>
              </View>

              <Text
                style={[
                  styles.heroHeadline,
                  {
                    fontSize: isDesktop ? 54 : 36,
                    lineHeight: isDesktop ? 60 : 42,
                  },
                ]}>
                A Deeper Way{'\n'}to Travel.
              </Text>

              <Text style={styles.heroSubhead}>
                Immerse yourself in timeless coastal coves, snow-crested Himalayan
                passes, and sunlit medieval monuments. Slow down and journey beyond
                the ordinary with TERRA’s editorial collection.
              </Text>

              {/* Action Buttons */}
              <View style={styles.heroActions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push('/explore')}
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    pressed && styles.btnPressed,
                  ]}>
                  <Text style={styles.primaryBtnText}>Explore India</Text>
                  <Ionicons name="arrow-forward" size={16} color={Colors.softCream} />
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push('/find-escape')}
                  style={({ pressed }) => [
                    styles.secondaryBtn,
                    pressed && styles.btnPressed,
                  ]}>
                  <Ionicons name="sparkles" size={15} color={Colors.forestGreen} />
                  <Text style={styles.secondaryBtnText}>Find My Escape</Text>
                </Pressable>
              </View>

              {/* Quick Editorial Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Curated Escapes</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4</Text>
                  <Text style={styles.statLabel}>Diverse Terrains</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>36+</Text>
                  <Text style={styles.statLabel}>Sanctuary Sights</Text>
                </View>
              </View>
            </View>

            {/* Hero Editorial Photography */}
            <View style={[styles.heroImageCol, { maxWidth: isDesktop ? 520 : '100%' }]}>
              <View style={styles.heroImageFrame}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
                  }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
                {/* Organic Paper Accent Card */}
                <View style={styles.heroFloatingBadge}>
                  <Text style={styles.floatingTag}>FEATURED REGION</Text>
                  <Text style={styles.floatingTitle}>Gulmarg, Kashmir</Text>
                  <Text style={styles.floatingDesc}>
                    Meadow of Flowers & Pir Panjal Ridge
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= SEARCH & FILTER BAR ================= */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Ionicons name="search" size={18} color={Colors.mutedOlive} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by destination name, state, or region..."
                placeholderTextColor={Colors.mutedText}
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear search"
                  onPress={() => setSearchQuery('')}
                  style={styles.clearBtn}>
                  <Ionicons name="close-circle" size={18} color={Colors.mutedOlive} />
                </Pressable>
              )}
            </View>

            <View style={styles.filterRow}>
              <CategoryChips
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
              />
            </View>
          </View>
        </View>

        {/* ================= PLACES THAT INSPIRE (DESTINATIONS) ================= */}
        <View style={styles.destinationsSection}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTagline}>
                <View style={styles.sectionBullet} />
                <Text style={styles.sectionSubtitle}>CURATED COLLECTION</Text>
              </View>
              <Text style={styles.sectionTitle}>Places That Inspire</Text>
            </View>

            <Text style={styles.resultCounter}>
              Showing{' '}
              <Text style={styles.resultCounterBold}>
                {filteredDestinations.length}
              </Text>{' '}
              of {DESTINATIONS.length} sanctuaries
            </Text>
          </View>

          {/* Destinations Grid or Empty State */}
          {filteredDestinations.length > 0 ? (
            <View style={styles.grid}>
              {filteredDestinations.map((destination) => (
                <View key={destination.id} style={{ width: cardWidth }}>
                  <DestinationCard destination={destination} />
                </View>
              ))}
            </View>
          ) : (
            <EmptyState
              icon="search-outline"
              title="No Escapes Found"
              description={`We couldn't find any destinations matching "${searchQuery}" in ${selectedCategory}. Try resetting your search or exploring all categories.`}
              actionLabel="Reset Search & Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            />
          )}
        </View>

        {/* ================= EDITORIAL TRAVEL PHILOSOPHY BANNER ================= */}
        <View style={styles.quoteSection}>
          <View style={styles.quoteCard}>
            <MountainMotif size={32} color={Colors.terracotta} />
            <Text style={styles.quoteText}>
              “Travel is not merely the crossing of borders, but the waking up of
              the soul to the quiet grandeur of the world.”
            </Text>
            <Text style={styles.quoteAuthor}>TERRA EDITORIAL MANIFESTO</Text>
          </View>
        </View>

        {/* ================= EDITORIAL FOOTER ================= */}
        <View style={styles.footer}>
          <View style={[styles.footerInner, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            <View style={styles.footerBrandCol}>
              <View style={styles.footerBrand}>
                <MountainMotif size={24} color={Colors.softCream} />
                <Text style={styles.footerBrandTitle}>TERRA</Text>
              </View>
              <Text style={styles.footerTagline}>
                A deeper way to travel. Discover the soul of India through
                thoughtful, sustainable exploration.
              </Text>
            </View>

            <View style={styles.footerLinksCol}>
              <Text style={styles.footerHeader}>CATEGORIES</Text>
              <Pressable onPress={() => { setSelectedCategory('Beaches'); }}>
                <Text style={styles.footerLink}>Beaches & Coasts</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedCategory('Mountains'); }}>
                <Text style={styles.footerLink}>Himalayan Peaks</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedCategory('Heritage'); }}>
                <Text style={styles.footerLink}>Living Heritage</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedCategory('Adventure'); }}>
                <Text style={styles.footerLink}>High Adventures</Text>
              </Pressable>
            </View>

            <View style={styles.footerLinksCol}>
              <Text style={styles.footerHeader}>RESOURCES</Text>
              <Pressable onPress={() => router.push('/find-escape')}>
                <Text style={styles.footerLink}>Smart Matcher</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/wishlist')}>
                <Text style={styles.footerLink}>Your Saved Escapes</Text>
              </Pressable>
              <Pressable onPress={() => router.push('/explore')}>
                <Text style={styles.footerLink}>Search Directory</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>
              © 2026 TERRA Travel Explorer. Built for GDGC VNRVJIET Recruitment Assignment.
            </Text>
          </View>
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
    paddingBottom: 90, // Leave room for MobileTabBar
  },

  // HERO
  heroWrapper: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  heroContainer: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }) as any,
    alignItems: 'center',
    gap: Spacing.xl,
  },
  heroTextCol: {
    flex: 1.1,
    gap: Spacing.md,
  },
  taglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(185, 101, 72, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadiusPill,
    alignSelf: 'flex-start',
  },
  taglineBadgeText: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.terracotta,
  },
  heroHeadline: {
    fontFamily: Fonts.serifBold,
    fontSize: Platform.select({ web: 54, default: 40 }),
    lineHeight: Platform.select({ web: 60, default: 46 }),
    color: Colors.forestGreen,
    letterSpacing: -0.5,
  },
  heroSubhead: {
    fontFamily: Fonts.sansRegular,
    fontSize: 16,
    lineHeight: 25,
    color: Colors.mutedText,
    maxWidth: 540,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.forestGreen,
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: Layout.borderRadiusPill,
    ...Shadows.subtle,
  },
  primaryBtnText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 15,
    color: Colors.softCream,
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.softCream,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: Layout.borderRadiusPill,
  },
  secondaryBtnText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 15,
    color: Colors.forestGreen,
    letterSpacing: 0.3,
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingTop: Spacing.md,
    marginTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  statItem: {
    gap: 2,
  },
  statNumber: {
    fontFamily: Fonts.serifBold,
    fontSize: 26,
    color: Colors.terracotta,
    lineHeight: 28,
  },
  statLabel: {
    fontFamily: Fonts.sansRegular,
    fontSize: 11.5,
    color: Colors.mutedText,
    letterSpacing: 0.4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.cardBorder,
  },

  // HERO IMAGE
  heroImageCol: {
    flex: 1,
    width: '100%',
    maxWidth: 520,
  },
  heroImageFrame: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: Layout.borderRadiusLg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    position: 'relative',
    ...Shadows.card,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroFloatingBadge: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(244, 239, 230, 0.94)',
    padding: Spacing.md,
    borderRadius: Layout.borderRadiusMd,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadows.subtle,
  },
  floatingTag: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    color: Colors.terracotta,
    letterSpacing: 1.2,
  },
  floatingTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 18,
    color: Colors.forestGreen,
    marginVertical: 2,
  },
  floatingDesc: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },

  // SEARCH & FILTER
  searchSection: {
    backgroundColor: Colors.paperLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  searchContainer: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    gap: Spacing.md,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Layout.borderRadiusPill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.sansRegular,
    fontSize: 14,
    color: Colors.darkText,
    outlineStyle: 'none' as any,
  },
  clearBtn: {
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // DESTINATIONS LIST
  destinationsSection: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sectionTagline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.terracotta,
  },
  sectionSubtitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.mutedOlive,
  },
  sectionTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 34,
    color: Colors.forestGreen,
  },
  resultCounter: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    color: Colors.mutedText,
  },
  resultCounterBold: {
    fontFamily: Fonts.sansBold,
    color: Colors.forestGreen,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },

  // QUOTE MANIFESTO
  quoteSection: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  quoteCard: {
    backgroundColor: Colors.softCream,
    borderRadius: Layout.borderRadiusLg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.md,
  },
  quoteText: {
    fontFamily: Fonts.serifBold,
    fontSize: 22,
    fontStyle: 'italic',
    color: Colors.forestGreen,
    textAlign: 'center',
    lineHeight: 32,
    maxWidth: 680,
  },
  quoteAuthor: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.terracotta,
  },

  // FOOTER
  footer: {
    backgroundColor: Colors.forestGreen,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  footerInner: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: Platform.select({
      web: 'row',
      default: 'column',
    }) as any,
    gap: Spacing.xl,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 224, 210, 0.15)',
  },
  footerBrandCol: {
    flex: 1.5,
    gap: Spacing.sm,
  },
  footerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  footerBrandTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 24,
    color: Colors.softCream,
    letterSpacing: 2,
  },
  footerTagline: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    color: 'rgba(233, 224, 210, 0.75)',
    lineHeight: 20,
    maxWidth: 380,
  },
  footerLinksCol: {
    flex: 1,
    gap: 8,
  },
  footerHeader: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.terracotta,
    marginBottom: 4,
  },
  footerLink: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    color: Colors.softCream,
    paddingVertical: 2,
  },
  footerBottom: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingTop: Spacing.md,
    alignItems: 'center',
  },
  footerCopyright: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: 'rgba(233, 224, 210, 0.55)',
    textAlign: 'center',
  },
});
