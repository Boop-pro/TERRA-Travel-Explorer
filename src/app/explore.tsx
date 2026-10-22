import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EditorialHeader } from '@/components/EditorialHeader';
import { CategoryChips } from '@/components/CategoryChips';
import { DestinationCard } from '@/components/DestinationCard';
import { EmptyState } from '@/components/EmptyState';
import { Colors, Fonts, Spacing, Layout } from '@/constants/theme';
import { DESTINATIONS } from '@/data/destinations';
import { Category, BudgetLevel } from '@/types';

export default function ExploreScreen() {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedBudget, setSelectedBudget] = useState<'All' | BudgetLevel>('All');

  const isDesktop = width >= 992;
  const isTablet = width >= 640 && width < 992;

  // Simultaneous Search & Multi-filtering
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Budget filter
      const matchesBudget =
        selectedBudget === 'All' || item.budget === selectedBudget;

      // Case-insensitive Search by destination name or state or tagline
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.state.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.attractions.some((a) => a.name.toLowerCase().includes(query));

      return matchesCategory && matchesBudget && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedBudget]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category, number>> = { All: DESTINATIONS.length };
    DESTINATIONS.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBudget('All');
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'All' ||
    selectedBudget !== 'All';

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
        {/* Directory Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerInner}>
            <View style={styles.breadcrumb}>
              <Text style={styles.breadcrumbMuted}>TERRA</Text>
              <Ionicons name="chevron-forward" size={12} color={Colors.mutedOlive} />
              <Text style={styles.breadcrumbActive}>EXPLORE SANCTUARIES</Text>
            </View>

            <View style={styles.titleRow}>
              <View>
                <Text style={styles.title}>Explore Sanctuaries</Text>
                <Text style={styles.subtitle}>
                  Filter across India’s coastal frontiers, sacred monuments, and
                  Himalayan ridge lines.
                </Text>
              </View>

              {hasActiveFilters && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Reset all filters"
                  onPress={handleResetFilters}
                  style={({ pressed }) => [
                    styles.resetBtn,
                    pressed && styles.pressed,
                  ]}>
                  <Ionicons name="refresh-outline" size={14} color={Colors.terracotta} />
                  <Text style={styles.resetBtnText}>Reset All</Text>
                </Pressable>
              )}
            </View>

            {/* Live Search Bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search" size={19} color={Colors.forestGreen} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by destination name, state, or attraction..."
                placeholderTextColor={Colors.mutedText}
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setSearchQuery('')}
                  style={styles.clearBtn}>
                  <Ionicons name="close-circle" size={18} color={Colors.mutedOlive} />
                </Pressable>
              )}
            </View>

            {/* Category Filters */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>TERRAIN / CATEGORY</Text>
              <CategoryChips
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
              />
            </View>

            {/* Budget Filters */}
            <View style={styles.budgetRow}>
              <Text style={styles.filterLabel}>BUDGET TIER</Text>
              <View style={styles.budgetChips}>
                {(['All', 'Budget', 'Moderate', 'Luxury'] as const).map((tier) => {
                  const isSelected = selectedBudget === tier;
                  return (
                    <Pressable
                      key={tier}
                      accessibilityRole="button"
                      onPress={() => setSelectedBudget(tier)}
                      style={[
                        styles.budgetChip,
                        isSelected && styles.budgetChipSelected,
                      ]}>
                      <Text
                        style={[
                          styles.budgetChipText,
                          isSelected && styles.budgetChipTextSelected,
                        ]}>
                        {tier === 'All' ? 'All Budgets' : tier}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Results Grid */}
        <View style={styles.resultsWrapper}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              Showing <Text style={styles.boldText}>{filteredDestinations.length}</Text>{' '}
              {filteredDestinations.length === 1 ? 'escape' : 'escapes'}
            </Text>

            {hasActiveFilters && (
              <View style={styles.activeFilterPill}>
                <Ionicons name="funnel" size={12} color={Colors.terracotta} />
                <Text style={styles.activeFilterText}>Filters Active</Text>
              </View>
            )}
          </View>

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
              icon="compass-outline"
              title="No Matching Sanctuaries"
              description="No destinations match your combination of category, budget, and search query. Reset your filters to explore the full collection."
              actionLabel="Clear All Filters"
              onAction={handleResetFilters}
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
    gap: 6,
  },
  breadcrumbMuted: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.mutedOlive,
  },
  breadcrumbActive: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
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
  resetBtn: {
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
  resetBtnText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Colors.terracotta,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Layout.borderRadiusPill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 12 : 9,
    gap: 10,
    marginTop: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.sansRegular,
    fontSize: 15,
    color: Colors.darkText,
    outlineStyle: 'none' as any,
  },
  clearBtn: {
    padding: 4,
  },
  filterSection: {
    gap: 6,
  },
  filterLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: Colors.mutedOlive,
  },
  budgetRow: {
    gap: 8,
    marginTop: 4,
  },
  budgetChips: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  budgetChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: Layout.borderRadiusPill,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  budgetChipSelected: {
    backgroundColor: Colors.terracotta,
    borderColor: Colors.terracotta,
  },
  budgetChipText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Colors.darkText,
  },
  budgetChipTextSelected: {
    color: Colors.white,
    fontFamily: Fonts.sansBold,
  },
  resultsWrapper: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.md,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsCount: {
    fontFamily: Fonts.sansRegular,
    fontSize: 14,
    color: Colors.mutedText,
  },
  boldText: {
    fontFamily: Fonts.sansBold,
    color: Colors.forestGreen,
  },
  activeFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(185, 101, 72, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Layout.borderRadiusPill,
  },
  activeFilterText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 11,
    color: Colors.terracotta,
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
