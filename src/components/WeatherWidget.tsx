import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Layout } from '@/constants/theme';
import { WeatherData } from '@/types';
import { fetchLiveWeather } from '@/utils/weather';

interface WeatherWidgetProps {
  latitude: number;
  longitude: number;
  locationName: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  latitude,
  longitude,
  locationName,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setFailed(false);
      const data = await fetchLiveWeather(latitude, longitude);

      if (mounted) {
        if (data) {
          setWeather(data);
        } else {
          setFailed(true);
        }
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [latitude, longitude]);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" color={Colors.terracotta} />
        <Text style={styles.loadingText}>Fetching live atmospheric conditions...</Text>
      </View>
    );
  }

  if (failed || !weather) {
    return (
      <View style={[styles.card, styles.offlineCard]}>
        <Ionicons name="cloud-offline-outline" size={20} color={Colors.mutedOlive} />
        <Text style={styles.offlineText}>
          Live weather currently unavailable. Core travel guide remains accessible.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.statusDot} />
        <Text style={styles.headerLabel}>LIVE CONDITIONS IN {locationName.toUpperCase()}</Text>
        <Text style={styles.updatedTime}>{weather.timeFetched}</Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.tempGroup}>
          <Ionicons
            name={weather.iconName as any}
            size={36}
            color={Colors.terracotta}
          />
          <View>
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
            <Text style={styles.conditionText}>{weather.condition}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.secondaryMetrics}>
          <View style={styles.metricItem}>
            <Ionicons name="water-outline" size={14} color={Colors.mutedOlive} />
            <Text style={styles.metricLabel}>Humidity:</Text>
            <Text style={styles.metricValue}>{weather.humidity}%</Text>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="leaf-outline" size={14} color={Colors.mutedOlive} />
            <Text style={styles.metricLabel}>Wind:</Text>
            <Text style={styles.metricValue}>{weather.windSpeed} km/h</Text>
          </View>
        </View>
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
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  offlineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(233, 224, 210, 0.4)',
  },
  loadingText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 13,
    color: Colors.mutedText,
    marginLeft: Spacing.sm,
  },
  offlineText: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12.5,
    color: Colors.mutedText,
    flex: 1,
    lineHeight: 17,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#388E3C',
  },
  headerLabel: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.mutedOlive,
    flex: 1,
  },
  updatedTime: {
    fontFamily: Fonts.sansRegular,
    fontSize: 10,
    color: Colors.subtleText,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  tempGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  temperature: {
    fontFamily: Fonts.serifBold,
    fontSize: 32,
    color: Colors.forestGreen,
    lineHeight: 34,
  },
  conditionText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    color: Colors.darkText,
  },
  divider: {
    width: 1,
    height: 38,
    backgroundColor: Colors.cardBorder,
  },
  secondaryMetrics: {
    gap: 4,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metricLabel: {
    fontFamily: Fonts.sansRegular,
    fontSize: 12,
    color: Colors.mutedText,
  },
  metricValue: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: Colors.forestGreen,
  },
});
