import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Layout } from '@/constants/theme';
import { Category } from '@/types';
import { CATEGORIES } from '@/data/destinations';

interface CategoryChipsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  counts?: Partial<Record<Category, number>>;
}

const CATEGORY_ICONS: Record<Category, keyof typeof Ionicons.glyphMap> = {
  All: 'earth-outline',
  Beaches: 'sunny-outline',
  Mountains: 'trail-sign-outline',
  Heritage: 'business-outline',
  Adventure: 'compass-outline',
};

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        const count = counts ? counts[cat] : undefined;

        return (
          <Pressable
            key={cat}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`Filter by ${cat}`}
            onPress={() => onSelectCategory(cat)}
            style={({ pressed }) => [
              styles.chip,
              isSelected ? styles.selectedChip : styles.unselectedChip,
              pressed && styles.pressed,
            ]}>
            <Ionicons
              name={CATEGORY_ICONS[cat]}
              size={15}
              color={isSelected ? Colors.softCream : Colors.forestGreen}
            />
            <Text
              style={[
                styles.chipText,
                isSelected ? styles.selectedChipText : styles.unselectedChipText,
              ]}>
              {cat}
            </Text>
            {count !== undefined && (
              <View
                style={[
                  styles.countBadge,
                  isSelected ? styles.selectedCountBadge : styles.unselectedCountBadge,
                ]}>
                <Text
                  style={[
                    styles.countText,
                    isSelected ? styles.selectedCountText : styles.unselectedCountText,
                  ]}>
                  {count}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: Layout.borderRadiusPill,
    gap: 8,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: Colors.forestGreen,
    borderColor: Colors.forestGreen,
  },
  unselectedChip: {
    backgroundColor: Colors.paperLight,
    borderColor: Colors.cardBorder,
  },
  chipText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  selectedChipText: {
    color: Colors.softCream,
  },
  unselectedChipText: {
    color: Colors.forestGreen,
  },
  countBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCountBadge: {
    backgroundColor: 'rgba(233, 224, 210, 0.25)',
  },
  unselectedCountBadge: {
    backgroundColor: Colors.softCream,
  },
  countText: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
  },
  selectedCountText: {
    color: Colors.softCream,
  },
  unselectedCountText: {
    color: Colors.forestGreen,
  },
  pressed: {
    opacity: 0.8,
  },
});
