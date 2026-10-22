import { DESTINATIONS } from '@/data/destinations';
import { MatcherAnswer, MatchResult } from '@/types';

/**
 * Deterministic, rule-based destination matcher.
 * Evaluates user preferences against destination attributes and returns
 * sorted recommendations with transparent explanations.
 */
export function matchDestinations(answers: MatcherAnswer): MatchResult[] {
  const results: MatchResult[] = DESTINATIONS.map((destination) => {
    let score = 0;
    const reasons: string[] = [];

    // Category weighting (50% max)
    if (answers.category) {
      if (destination.category === answers.category) {
        score += 50;
        reasons.push(`Direct match for your desired ${destination.category} escape`);
      } else {
        score += 10;
      }
    } else {
      score += 30;
    }

    // Budget weighting (30% max)
    if (answers.budget) {
      if (destination.budget === answers.budget) {
        score += 30;
        reasons.push(`Aligns seamlessly with your ${answers.budget.toLowerCase()} budget preference`);
      } else if (
        (answers.budget === 'Moderate' && (destination.budget === 'Budget' || destination.budget === 'Luxury')) ||
        (answers.budget === 'Luxury' && destination.budget === 'Moderate')
      ) {
        score += 15;
      } else {
        score += 5;
      }
    } else {
      score += 20;
    }

    // Duration weighting (20% max)
    if (answers.duration) {
      if (destination.duration === answers.duration) {
        score += 20;
        reasons.push(`Tailor-made for a ${answers.duration.toLowerCase()} journey`);
      } else {
        score += 8;
      }
    } else {
      score += 15;
    }

    // Generate cohesive explanation sentence
    const mainReason =
      reasons.length > 0
        ? reasons.join('. ') + '.'
        : `A wonderful ${destination.category.toLowerCase()} journey with exceptional natural and cultural heritage.`;

    return {
      destination,
      score: Math.min(100, Math.max(25, score)),
      matchReason: mainReason,
      highlights: destination.highlights,
    };
  });

  // Sort by highest match score first
  return results.sort((a, b) => b.score - a.score);
}
