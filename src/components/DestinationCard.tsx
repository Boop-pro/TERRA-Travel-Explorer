import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Layout, Shadows } from '@/constants/theme';
import { Destination } from '@/types';
import { useWishlist } from '@/context/WishlistContext';

interface DestinationCardProps {
  destination: Destination;
  compact?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  compact = false,
}) => {
  const router = useRouter();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const wishlisted = isWishlisted(destination.id);

  const handleCardPress = () => {
    router.push(`/destination/${destination.id}` as any);
  };

  const handleHeartPress = async (e: any) => {
    // Stop propagation on web to avoid triggering card click
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    await toggleWishlist(destination.id);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Beaches':
        return Colors.terracotta;
      case 'Mountains':
        return Colors.forestGreen;
      case 'Heritage':
        return Colors.mutedOlive;
      case 'Adventure':
        return '#C27D38';
      default:
        return Colors.forestGreen;
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View details for ${destination.name}, ${destination.state}`}
      onPress={handleCardPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => [
        styles.card,
        isHovered && styles.cardHovered,
        pressed && styles.cardPressed,
      ]}>
      {/* Destination Image & Overlays */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageError ? destination.heroImageUrl : destination.thumbnailUrl,
          }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />

        {/* Category Pill Tag */}
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(destination.category) },
          ]}>
          <Text style={styles.categoryText}>{destination.category}</Text>
        </View>

        {/* Wishlist Heart Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            wishlisted
              ? `Remove ${destination.name} from saved escapes`
              : `Save ${destination.name} to wishlist`
          }
          onPress={handleHeartPress}
          style={({ pressed }) => [
            styles.heartButton,
            wishlisted && styles.heartButtonActive,
            pressed && styles.heartPressed,
          ]}>
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? Colors.heartActive : Colors.forestGreen}
          />
        </Pressable>
      </View>

      {/* Card Content & Metadata */}
      <View style={styles.content}>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={13} color={Colors.terracotta} />
          <Text style={styles.stateText}>{destination.state}</Text>
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {destination.name}
        </Text>

        {!compact && (
          <Text style={styles.tagline} numberOfLines={2}>
            {destination.tagline}
          </Text>
        )}

        {/* Card Footer: Best Time & Explore CTA */}
        <View style={styles.footerRow}>
          <View style={styles.bestTimeBadge}>
            <Ionicons name="calendar-outline" size={12} color={Colors.mutedOlive} />
            <Text style={styles.bestTimeText} numberOfLines={1}>
              {destination.bestTimeToVisit.split('(')[0].trim()}
            </Text>
          </View>

          <View style={styles.ctaArrow}>
            <Text style={styles.ctaText}>View</Text>
            <Ionicons name="arrow-forward" size={13} color={Colors.forestGreen} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.paperLight,
    borderRadius: Layout.borderRadiusMd,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
    ...Shadows.subtle,
  },
  cardHovered: {
    transform: [{ translateY: -4 }],
    ...Shadows.card,
    borderColor: Colors.mutedOlive,
  },
  cardPressed: {
    opacity: 0.95,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: Colors.softCream,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Layout.borderRadiusPill,
    ...Shadows.subtle,
  },
  categoryText: {
    color: Colors.white,
    fontFamily: Fonts.sansBold,
    fontSize: 10.5,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heartButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.heartBg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  heartButtonActive: {
    backgroundColor: Colors.white,
  },
  heartPressed: {
    transform: [{ scale: 0.88 }],
  },
  content: {
    padding: Spacing.md,
    gap: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stateText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 11.5,
    letterSpacing: 1.2,
    color: Colors.terracotta,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: Fonts.serifBold,
    fontSize: 22,
    color: Colors.forestGreen,
    letterSpacing: 0.3,
    lineHeight: 26,
  },
  tagline: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.mutedText,
    marginVertical: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 217, 204, 0.7)',
    marginTop: 4,
  },
  bestTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  bestTimeText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 11,
    color: Colors.mutedText,
  },
  ctaArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ctaText: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.forestGreen,
  },
});
