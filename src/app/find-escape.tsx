import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EditorialHeader } from '@/components/EditorialHeader';
import { DestinationCard } from '@/components/DestinationCard';
import { MountainMotif } from '@/components/MountainMotif';
import { Colors, Fonts, Spacing, Layout, Shadows } from '@/constants/theme';
import { matchDestinations } from '@/utils/recommender';
import { Category, BudgetLevel, TripDuration } from '@/types';

export default function FindEscapeScreen() {
  const { width } = useWindowDimensions();

  // Matcher state
  const [selectedCategory, setSelectedCategory] = useState<Exclude<Category, 'All'>>('Mountains');
  const [selectedBudget, setSelectedBudget] = useState<BudgetLevel>('Moderate');
  const [selectedDuration, setSelectedDuration] = useState<TripDuration>('1 Week');

  const isDesktop = width >= 992;

  // Run deterministic matcher
  const matchResults = useMemo(() => {
    return matchDestinations({
      category: selectedCategory,
      budget: selectedBudget,
      duration: selectedDuration,
    });
  }, [selectedCategory, selectedBudget, selectedDuration]);

  // Top matches
  const topMatches = matchResults.slice(0, 4);

  const categories: { label: Exclude<Category, 'All'>; icon: keyof typeof Ionicons.glyphMap; desc: string }[] = [
    { label: 'Mountains', icon: 'trail-sign-outline', desc: 'Alpine cedar groves, glacial valleys & snow passes' },
    { label: 'Beaches', icon: 'sunny-outline', desc: 'Sun-drenched sands, palm coves & ocean tides' },
    { label: 'Heritage', icon: 'business-outline', desc: 'Centuries-old forts, stone temples & royal ghats' },
    { label: 'Adventure', icon: 'compass-outline', desc: 'White-water rapids, high-altitude passes & paragliding' },
  ];

  const budgets: { label: BudgetLevel; icon: string; desc: string }[] = [
    { label: 'Budget', icon: '₹', desc: 'Authentic homestays, hostels & conscious local exploration' },
    { label: 'Moderate', icon: '₹₹', desc: 'Comfortable boutique stays, heritage havelis & guided tours' },
    { label: 'Luxury', icon: '₹₹₹', desc: 'Iconic palace hotels, private houseboats & bespoke retreats' },
  ];

  const durations: { label: TripDuration; icon: keyof typeof Ionicons.glyphMap; desc: string }[] = [
    { label: 'Weekend', icon: 'flash-outline', desc: '2 to 4 days rejuvenating reset' },
    { label: '1 Week', icon: 'calendar-outline', desc: '5 to 7 days immersive itinerary' },
    { label: '2+ Weeks', icon: 'infinite-outline', desc: '8+ days transformative grand expedition' },
  ];

  // Responsive grid columns
  const gridColumns = isDesktop ? 2 : 1;
  const cardWidth = gridColumns === 2 ? '48.8%' : '100%';

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
            <View style={styles.badgeRow}>
              <MountainMotif size={16} color={Colors.terracotta} />
              <Text style={styles.badgeText}>DETERMINISTIC SMART MATCHER</Text>
            </View>

            <Text style={styles.title}>Find Your Ideal Escape</Text>
            <Text style={styles.subtitle}>
              Select your travel intentions below. Our transparent, explainable
              matching engine pairs your rhythm with the ideal Indian sanctuary.
            </Text>
          </View>
        </View>

        {/* Questionnaire Form */}
        <View style={styles.formWrapper}>
          {/* Question 1: Travel Terrain */}
          <View style={styles.questionBlock}>
            <View style={styles.questionHeader}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <View>
                <Text style={styles.questionTitle}>Preferred Travel Terrain</Text>
                <Text style={styles.questionSub}>
                  What landscape speaks to your wanderlust right now?
                </Text>
              </View>
            </View>

            <View style={styles.optionsGrid}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <Pressable
                    key={cat.label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedCategory(cat.label)}
                    style={({ pressed }) => [
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                      pressed && styles.pressed,
                    ]}>
                    <View
                      style={[
                        styles.optionIconCircle,
                        isSelected && styles.optionIconCircleSelected,
                      ]}>
                      <Ionicons
                        name={cat.icon}
                        size={20}
                        color={isSelected ? Colors.softCream : Colors.forestGreen}
                      />
                    </View>
                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionTitle,
                          isSelected && styles.optionTitleSelected,
                        ]}>
                        {cat.label}
                      </Text>
                      <Text style={styles.optionDesc}>{cat.desc}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Question 2: Budget Preference */}
          <View style={styles.questionBlock}>
            <View style={styles.questionHeader}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <View>
                <Text style={styles.questionTitle}>Approximate Budget Tier</Text>
                <Text style={styles.questionSub}>
                  How do you prefer to experience accommodations & dining?
                </Text>
              </View>
            </View>

            <View style={styles.optionsGrid}>
              {budgets.map((b) => {
                const isSelected = selectedBudget === b.label;
                return (
                  <Pressable
                    key={b.label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedBudget(b.label)}
                    style={({ pressed }) => [
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                      pressed && styles.pressed,
                    ]}>
                    <View
                      style={[
                        styles.optionIconCircle,
                        isSelected && styles.optionIconCircleSelected,
                      ]}>
                      <Text
                        style={[
                          styles.currencySymbol,
                          isSelected && styles.currencySymbolSelected,
                        ]}>
                        {b.icon}
                      </Text>
                    </View>
                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionTitle,
                          isSelected && styles.optionTitleSelected,
                        ]}>
                        {b.label}
                      </Text>
                      <Text style={styles.optionDesc}>{b.desc}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Question 3: Trip Duration */}
          <View style={styles.questionBlock}>
            <View style={styles.questionHeader}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <View>
                <Text style={styles.questionTitle}>Trip Duration</Text>
                <Text style={styles.questionSub}>
                  How much time do you wish to dedicate to this journey?
                </Text>
              </View>
            </View>

            <View style={styles.optionsGrid}>
              {durations.map((d) => {
                const isSelected = selectedDuration === d.label;
                return (
                  <Pressable
                    key={d.label}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => setSelectedDuration(d.label)}
                    style={({ pressed }) => [
                      styles.optionCard,
                      isSelected && styles.optionCardSelected,
                      pressed && styles.pressed,
                    ]}>
                    <View
                      style={[
                        styles.optionIconCircle,
                        isSelected && styles.optionIconCircleSelected,
                      ]}>
                      <Ionicons
                        name={d.icon}
                        size={20}
                        color={isSelected ? Colors.softCream : Colors.forestGreen}
                      />
                    </View>
                    <View style={styles.optionContent}>
                      <Text
                        style={[
                          styles.optionTitle,
                          isSelected && styles.optionTitleSelected,
                        ]}>
                        {d.label}
                      </Text>
                      <Text style={styles.optionDesc}>{d.desc}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Match Results Display */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsInner}>
            <View style={styles.resultsTitleRow}>
              <View>
                <View style={styles.recommendationTag}>
                  <Ionicons name="sparkles" size={14} color={Colors.terracotta} />
                  <Text style={styles.recommendationTagText}>
                    RECOMMENDED MATCHES
                  </Text>
                </View>
                <Text style={styles.resultsHeading}>
                  Sanctuaries Tailored to You
                </Text>
                <Text style={styles.resultsSubhead}>
                  Evaluated using transparent, explainable criteria for {selectedCategory} ({selectedBudget} budget, {selectedDuration}).
                </Text>
              </View>
            </View>

            {/* Match Cards with Explainable Rationale */}
            <View style={styles.matchCardsGrid}>
              {topMatches.map((res) => (
                <View key={res.destination.id} style={{ width: cardWidth }}>
                  <View style={styles.matchCardContainer}>
                    {/* Explainable Rationale Banner */}
                    <View style={styles.rationaleBanner}>
                      <View style={styles.scorePill}>
                        <Text style={styles.scoreNumber}>{res.score}%</Text>
                        <Text style={styles.scoreLabel}>MATCH</Text>
                      </View>
                      <View style={styles.reasonTextCol}>
                        <Text style={styles.reasonTitle}>Why this matches:</Text>
                        <Text style={styles.reasonBody}>{res.matchReason}</Text>
                      </View>
                    </View>

                    {/* Standard Destination Card */}
                    <DestinationCard destination={res.destination} />
                  </View>
                </View>
              ))}
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
    gap: Spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeText: {
    fontFamily: Fonts.sansBold,
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: Colors.terracotta,
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
    maxWidth: 620,
    lineHeight: 22,
  },

  // FORM
  formWrapper: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    gap: Spacing.xl,
  },
  questionBlock: {
    backgroundColor: Colors.paperLight,
    borderRadius: Layout.borderRadiusLg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.xl,
    gap: Spacing.md,
    ...Shadows.subtle,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.forestGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontFamily: Fonts.sansBold,
    fontSize: 14,
    color: Colors.softCream,
  },
  questionTitle: {
    fontFamily: Fonts.serifBold,
    fontSize: 22,
    color: Colors.forestGreen,
  },
  questionSub: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    color: Colors.mutedText,
    marginTop: 2,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Layout.borderRadiusMd,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    flex: 1,
    minWidth: 260,
  },
  optionCardSelected: {
    borderColor: Colors.terracotta,
    backgroundColor: Colors.softCream,
  },
  optionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.softCream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIconCircleSelected: {
    backgroundColor: Colors.forestGreen,
  },
  currencySymbol: {
    fontFamily: Fonts.serifBold,
    fontSize: 18,
    color: Colors.forestGreen,
  },
  currencySymbolSelected: {
    color: Colors.softCream,
  },
  optionContent: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 14,
    color: Colors.forestGreen,
  },
  optionTitleSelected: {
    color: Colors.terracotta,
  },
  optionDesc: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedText,
    lineHeight: 16,
  },

  // RESULTS
  resultsSection: {
    backgroundColor: Colors.softCream,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  resultsInner: {
    maxWidth: Layout.maxWidth,
    width: '100%',
    marginHorizontal: 'auto',
    gap: Spacing.xl,
  },
  resultsTitleRow: {
    gap: 6,
  },
  recommendationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  recommendationTagText: {
    fontFamily: Fonts.sansBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.terracotta,
  },
  resultsHeading: {
    fontFamily: Fonts.serifBold,
    fontSize: 34,
    color: Colors.forestGreen,
  },
  resultsSubhead: {
    fontFamily: Fonts.sansRegular,
    fontSize: 14.5,
    color: Colors.mutedText,
    maxWidth: 620,
  },
  matchCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
  },
  matchCardContainer: {
    gap: Spacing.sm,
  },
  rationaleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.paperLight,
    padding: Spacing.md,
    borderRadius: Layout.borderRadiusMd,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadows.subtle,
  },
  scorePill: {
    backgroundColor: Colors.forestGreen,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontFamily: Fonts.sansBold,
    fontSize: 18,
    color: Colors.softCream,
    lineHeight: 20,
  },
  scoreLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 8.5,
    color: Colors.terracotta,
    letterSpacing: 0.8,
  },
  reasonTextCol: {
    flex: 1,
    gap: 2,
  },
  reasonTitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 11.5,
    color: Colors.forestGreen,
    letterSpacing: 0.5,
  },
  reasonBody: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12.5,
    color: Colors.mutedText,
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.85,
  },
});
