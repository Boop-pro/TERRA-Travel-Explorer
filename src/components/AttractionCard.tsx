import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { Colors, Fonts, Spacing, Layout, Shadows } from '@/constants/theme';
import { Attraction } from '@/types';

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({
  attraction,
  index,
}) => {
  const [imageError, setImageError] = useState(false);
  const formattedIndex = String(index + 1).padStart(2, '0');

  const fallbackUrl =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';

  return (
    <View style={styles.card}>
      {/* Attraction Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageError ? fallbackUrl : attraction.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
        <View style={styles.indexBadge}>
          <Text style={styles.indexText}>{formattedIndex}</Text>
        </View>
      </View>

      {/* Attraction Details */}
      <View style={styles.content}>
        <Text style={styles.name}>{attraction.name}</Text>
        <Text style={styles.description}>{attraction.description}</Text>
      </View>
    </View>
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
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.softCream,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indexBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.forestGreen,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  indexText: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    color: Colors.softCream,
    letterSpacing: 0.5,
  },
  content: {
    padding: Spacing.md,
    gap: 4,
  },
  name: {
    fontFamily: Fonts.serifBold,
    fontSize: 18,
    color: Colors.forestGreen,
    lineHeight: 22,
  },
  description: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.mutedText,
  },
});
