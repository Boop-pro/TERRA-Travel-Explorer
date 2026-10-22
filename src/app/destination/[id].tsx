import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Linking,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EditorialHeader } from '@/components/EditorialHeader';
import { AttractionCard } from '@/components/AttractionCard';
import { WeatherWidget } from '@/components/WeatherWidget';
import { MountainMotif } from '@/components/MountainMotif';
import { Colors, Fonts, Spacing, Layout, Shadows } from '@/constants/theme';
import { DESTINATIONS } from '@/data/destinations';
import { useWishlist } from '@/context/WishlistContext';

export function generateStaticParams(): { id: string }[] {
  return DESTINATIONS.map((d) => ({ id: d.id }));
}

export default function DestinationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const isDesktop = width >= 860;

  // Find destination by id
  const destination = DESTINATIONS.find((d) => d.id === id);

  if (!destination) {
    return (
      <View style={styles.screen}>
        <EditorialHeader />
        <View style={styles.notFoundContainer}>
          <Ionicons name="compass-outline" size={48} color={Colors.terracotta} />
          <Text style={styles.notFoundTitle}>Destination Not Found</Text>
          <Text style={styles.notFoundText}>
            The sanctuary you are looking for does not exist in our editorial catalog.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/')}
            style={styles.backHomeBtn}>
            <Text style={styles.backHomeText}>Return to Discovery</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const wishlisted = isWishlisted(destination.id);

  const handleOpenMaps = async () => {
    const lat = destination.coordinates.latitude;
    const lon = destination.coordinates.longitude;
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(destination.name + ', ' + destination.state)}@${lat},${lon}`,
      android: `geo:0,0?q=${lat},${lon}(${encodeURIComponent(destination.name)})`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            destination.name + ', ' + destination.state + ', India'
          )}`
        );
      }
    } catch {
      await Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          destination.name + ', ' + destination.state + ', India'
        )}`
      );
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <View style={styles.screen}>
      <EditorialHeader />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          !isDesktop && styles.scrollContentMobile,
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Navigation & Breadcrumb Bar */}
        <View style={styles.navBar}>
          <View style={styles.navBarInner}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={handleBack}
              style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
              <Ionicons name="arrow-back" size={18} color={Colors.forestGreen} />
              <Text style={styles.backBtnText}>All Escapes</Text>
            </Pressable>

            <View style={styles.breadcrumbPath}>
              <Text style={styles.breadcrumbItem}>{destination.category}</Text>
              <Ionicons name="chevron-forward" size={12} color={Colors.mutedOlive} />
              <Text style={styles.breadcrumbActive}>{destination.name}</Text>
            </View>
          </View>
        </View>

        {/* ================= HERO PHOTOGRAPH SECTION ================= */}
        <View style={styles.heroSection}>
          <View style={styles.heroInner}>
            <View style={styles.heroImageWrapper}>
              <Image
                source={{
                  uri: imageError ? destination.thumbnailUrl : destination.heroImageUrl,
                }}
                style={styles.heroImage}
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
              <View style={styles.heroGradientOverlay} />

              {/* Floating Hero Content */}
              <View style={styles.heroContent}>
                <View style={styles.heroBadgeRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {destination.category.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.stateBadge}>
                    <Ionicons name="location-sharp" size={13} color={Colors.softCream} />
                    <Text style={styles.stateBadgeText}>
                      {destination.state}, INDIA
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.heroTitle,
                    {
                      fontSize: isDesktop ? 52 : 32,
                      lineHeight: isDesktop ? 56 : 38,
                    },
                  ]}>
                  {destination.name}
                </Text>
                <Text style={styles.heroTagline}>{destination.tagline}</Text>
              </View>
            </View>

            {/* Quick Actions Bar */}
            <View
              style={[
                styles.actionsBar,
                {
                  flexDirection: isDesktop ? 'row' : 'column',
                  alignItems: isDesktop ? 'center' : 'stretch',
                },
              ]}>
              <View style={styles.quickInfoChips}>
                <View style={styles.infoChip}>
                  <Ionicons name="calendar-outline" size={15} color={Colors.terracotta} />
                  <Text style={styles.infoChipLabel}>Best Season:</Text>
                  <Text style={styles.infoChipValue}>
                    {destination.bestTimeToVisit.split('(')[0].trim()}
                  </Text>
                </View>

                <View style={styles.infoChip}>
                  <Ionicons name="time-outline" size={15} color={Colors.forestGreen} />
                  <Text style={styles.infoChipLabel}>Duration:</Text>
                  <Text style={styles.infoChipValue}>{destination.duration}</Text>
                </View>

                <View style={styles.infoChip}>
                  <Ionicons name="wallet-outline" size={15} color={Colors.mutedOlive} />
                  <Text style={styles.infoChipLabel}>Budget:</Text>
                  <Text style={styles.infoChipValue}>{destination.budget}</Text>
                </View>
              </View>

              <View style={[styles.actionButtonsGroup, { width: isDesktop ? 'auto' : '100%' }]}>
                {/* Wishlist Button */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'
                  }
                  onPress={() => toggleWishlist(destination.id)}
                  style={({ pressed }) => [
                    styles.wishlistActionBtn,
                    { flex: isDesktop ? 0 : 1 },
                    wishlisted && styles.wishlistActionBtnActive,
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons
                    name={wishlisted ? 'heart' : 'heart-outline'}
                    size={18}
                    color={wishlisted ? Colors.white : Colors.forestGreen}
                  />
                  <Text
                    style={[
                      styles.wishlistActionText,
                      wishlisted && styles.wishlistActionTextActive,
                    ]}>
                    {wishlisted ? 'Saved in Escapes' : 'Save to Wishlist'}
                  </Text>
                </Pressable>

                {/* Google Maps Button */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Open in Google Maps"
                  onPress={handleOpenMaps}
                  style={({ pressed }) => [
                    styles.mapsActionBtn,
                    { flex: isDesktop ? 0 : 1 },
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons name="map-outline" size={17} color={Colors.softCream} />
                  <Text style={styles.mapsActionText}>Open Maps</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* ================= DETAILS BODY ================= */}
        <View style={styles.bodySection}>
          <View style={[styles.bodyInner, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            {/* Left Column: Editorial Narrative & Attractions */}
            <View style={styles.leftCol}>
              {/* Editorial Story */}
              <View style={styles.sectionBlock}>
                <View style={styles.blockTitleRow}>
                  <MountainMotif size={18} color={Colors.terracotta} />
                  <Text style={styles.blockPreTitle}>EDITORIAL CHRONICLE</Text>
                </View>
                <Text style={styles.blockTitle}>About This Sanctuary</Text>

                <Text style={styles.leadParagraph}>{destination.description}</Text>
                <Text style={styles.bodyParagraph}>{destination.longDescription}</Text>

                {/* Key Highlights */}
                <View style={styles.highlightsContainer}>
                  <Text style={styles.highlightsHeader}>JOURNEY HIGHLIGHTS</Text>
                  <View style={styles.highlightPills}>
                    {destination.highlights.map((h, i) => (
                      <View key={i} style={styles.highlightPill}>
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color={Colors.forestGreen}
                        />
                        <Text style={styles.highlightPillText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Three Popular Attractions */}
              <View style={styles.sectionBlock}>
                <View style={styles.blockTitleRow}>
                  <View style={styles.blockDot} />
                  <Text style={styles.blockPreTitle}>ESSENTIAL SIGHTS</Text>
                </View>
                <Text style={styles.blockTitle}>Three Iconic Attractions</Text>
                <Text style={styles.blockDesc}>
                  Each sanctuary harbors extraordinary micro-destinations waiting to
                  be discovered.
                </Text>

                <View style={styles.attractionsGrid}>
                  {destination.attractions.map((attraction, idx) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      index={idx}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Right Column: Weather, Best Time, Travel Notes */}
            <View style={styles.rightCol}>
              {/* Live Weather Integration */}
              <WeatherWidget
                latitude={destination.coordinates.latitude}
                longitude={destination.coordinates.longitude}
                locationName={destination.name}
              />

              {/* Best Time To Visit Card */}
              <View style={styles.sideCard}>
                <View style={styles.sideCardHeader}>
                  <Ionicons name="sunny-outline" size={20} color={Colors.terracotta} />
                  <Text style={styles.sideCardTitle}>Best Time to Visit</Text>
                </View>
                <Text style={styles.sideCardText}>{destination.bestTimeToVisit}</Text>
                <View style={styles.seasonTip}>
                  <Ionicons name="information-circle-outline" size={16} color={Colors.mutedOlive} />
                  <Text style={styles.seasonTipText}>
                    Pack breathable organic cotton for coastal plains and layered woolens for high altitudes.
                  </Text>
                </View>
              </View>

              {/* Ideal For Activities */}
              <View style={styles.sideCard}>
                <View style={styles.sideCardHeader}>
                  <Ionicons name="compass-outline" size={20} color={Colors.forestGreen} />
                  <Text style={styles.sideCardTitle}>Ideal Experiences</Text>
                </View>
                <View style={styles.activitiesList}>
                  {destination.idealFor.map((activity, i) => (
                    <View key={i} style={styles.activityItem}>
                      <View style={styles.activityDot} />
                      <Text style={styles.activityText}>{activity}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Geographic Coordinates Card */}
              <View style={styles.sideCard}>
                <View style={styles.sideCardHeader}>
                  <Ionicons name="navigate-outline" size={20} color={Colors.mutedOlive} />
                  <Text style={styles.sideCardTitle}>Geographic Coordinates</Text>
                </View>
                <Text style={styles.coordsText}>
                  Latitude: {destination.coordinates.latitude.toFixed(4)}° N{'\n'}
                  Longitude: {destination.coordinates.longitude.toFixed(4)}° E
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={handleOpenMaps}
                  style={styles.openMapsLink}>
                  <Text style={styles.openMapsLinkText}>View on Interactive Map</Text>
                  <Ionicons name="arrow-forward" size={13} color={Colors.terracotta} />
                </Pressable>
              </View>
            </View>
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
    paddingBottom: 60,
  },
  scrollContentMobile: {
    paddingBottom: 100,
  },

  // NAV BAR
  navBar: {
    backgroundColor: Colors.paperLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  navBarInner: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  backBtnText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    color: Colors.forestGreen,
  },
  breadcrumbPath: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  breadcrumbItem: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedOlive,
  },
  breadcrumbActive: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.terracotta,
  },

  // HERO
  heroSection: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  heroInner: {
    borderRadius: Layout.borderRadiusLg,
    overflow: 'hidden',
    backgroundColor: Colors.paperLight,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadows.card,
  },
  heroImageWrapper: {
    width: '100%',
    height: Platform.select({ web: 480, default: 340 }),
    position: 'relative',
    backgroundColor: Colors.softCream,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(18, 30, 23, 0.45)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.xl,
    gap: 6,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: Colors.terracotta,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadiusPill,
  },
  categoryBadgeText: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    color: Colors.white,
    letterSpacing: 1,
  },
  stateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(32, 56, 43, 0.75)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadiusPill,
  },
  stateBadgeText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 11,
    color: Colors.softCream,
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: Platform.select({ web: 52, default: 36 }),
    color: Colors.softCream,
    lineHeight: Platform.select({ web: 56, default: 40 }),
    letterSpacing: 0.5,
  },
  heroTagline: {
    fontFamily: Fonts.sansRegular,
    fontSize: 16,
    color: 'rgba(233, 224, 210, 0.92)',
    maxWidth: 620,
    lineHeight: 22,
  },

  // ACTIONS BAR
  actionsBar: {
    backgroundColor: Colors.paperLight,
    padding: Spacing.md,
    flexDirection: Platform.select({ web: 'row', default: 'column' }) as any,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
  },
  quickInfoChips: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoChipLabel: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },
  infoChipValue: {
    fontFamily: Fonts.sansBold,
    fontSize: 12.5,
    color: Colors.forestGreen,
  },
  actionButtonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    width: Platform.select({ default: '100%', web: 'auto' }) as any,
  },
  wishlistActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: Layout.borderRadiusPill,
    backgroundColor: Colors.softCream,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    flex: Platform.select({ default: 1, web: 0 }) as any,
    justifyContent: 'center',
  },
  wishlistActionBtnActive: {
    backgroundColor: Colors.heartActive,
    borderColor: Colors.heartActive,
  },
  wishlistActionText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    color: Colors.forestGreen,
  },
  wishlistActionTextActive: {
    color: Colors.white,
    fontFamily: Fonts.sansBold,
  },
  mapsActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Layout.borderRadiusPill,
    backgroundColor: Colors.forestGreen,
    justifyContent: 'center',
  },
  mapsActionText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    color: Colors.softCream,
  },

  // BODY SECTION
  bodySection: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  bodyInner: {
    flexDirection: Platform.select({ web: 'row', default: 'column' }) as any,
    gap: Spacing.xl,
  },
  leftCol: {
    flex: 1.8,
    gap: Spacing.xl,
  },
  rightCol: {
    flex: 1,
    gap: Spacing.lg,
  },

  // CONTENT BLOCKS
  sectionBlock: {
    backgroundColor: Colors.paperLight,
    borderRadius: Layout.borderRadiusLg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  blockTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blockDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.terracotta,
  },
  blockPreTitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.mutedOlive,
  },
  blockTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 30,
    color: Colors.forestGreen,
  },
  blockDesc: {
    fontFamily: Fonts.sansRegular,
    fontSize: 14,
    color: Colors.mutedText,
    marginTop: -4,
  },
  leadParagraph: {
    fontFamily: Fonts.serifRegular,
    fontSize: 18,
    lineHeight: 28,
    color: Colors.darkText,
    fontStyle: 'italic',
  },
  bodyParagraph: {
    fontFamily: Fonts.sansRegular,
    fontSize: 15,
    lineHeight: 25,
    color: Colors.darkText,
  },
  highlightsContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    gap: Spacing.sm,
  },
  highlightsHeader: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.terracotta,
  },
  highlightPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.softCream,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadiusPill,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  highlightPillText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12.5,
    color: Colors.forestGreen,
  },

  // ATTRACTIONS
  attractionsGrid: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },

  // SIDE CARDS
  sideCard: {
    backgroundColor: Colors.paperLight,
    borderRadius: Layout.borderRadiusMd,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  sideCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sideCardTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 18,
    color: Colors.forestGreen,
  },
  sideCardText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 14,
    color: Colors.darkText,
    lineHeight: 20,
  },
  seasonTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(133, 139, 112, 0.12)',
    padding: Spacing.sm,
    borderRadius: 8,
    marginTop: 4,
  },
  seasonTipText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedText,
    flex: 1,
    lineHeight: 16,
  },
  activitiesList: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.mutedOlive,
  },
  activityText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13.5,
    color: Colors.darkText,
  },
  coordsText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    color: Colors.mutedText,
    lineHeight: 20,
  },
  openMapsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  openMapsLinkText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12.5,
    color: Colors.terracotta,
  },

  // NOT FOUND
  notFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
    gap: 16,
  },
  notFoundTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 28,
    color: Colors.forestGreen,
  },
  notFoundText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 15,
    color: Colors.mutedText,
    textAlign: 'center',
    maxWidth: 420,
  },
  backHomeBtn: {
    backgroundColor: Colors.forestGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: Layout.borderRadiusPill,
    marginTop: 8,
  },
  backHomeText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 14,
    color: Colors.softCream,
  },
  pressed: {
    opacity: 0.8,
  },
});
