import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

const BENGALI_DAYS = [
  'রবিবার', // Sunday
  'সোমবার', // Monday
  'মঙ্গলবার', // Tuesday
  'বুধবার', // Wednesday
  'বৃহস্পতিবার', // Thursday
  'শুক্রবার', // Friday
  'শনিবার', // Saturday
];

const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBengaliNumerals(str: string | number): string {
  return str
    .toString()
    .split('')
    .map((char) => {
      const num = parseInt(char, 10);
      return isNaN(num) ? char : BENGALI_DIGITS[num];
    })
    .join('');
}

function getFormattedBengaliDateTime(date: Date): string {
  const dayName = BENGALI_DAYS[date.getDay()];
  const dayOfMonth = toBengaliNumerals(date.getDate().toString().padStart(2, '0'));
  const monthName = BENGALI_MONTHS[date.getMonth()];
  const year = toBengaliNumerals(date.getFullYear());

  const hours = toBengaliNumerals(date.getHours().toString().padStart(2, '0'));
  const minutes = toBengaliNumerals(date.getMinutes().toString().padStart(2, '0'));
  const seconds = toBengaliNumerals(date.getSeconds().toString().padStart(2, '0'));

  return `${dayName}, ${dayOfMonth} ${monthName}, ${year}  ${hours}:${minutes}:${seconds}`;
}

export function Header() {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    // Initial format
    setCurrentDateTime(getFormattedBengaliDateTime(new Date()));

    const timer = setInterval(() => {
      setCurrentDateTime(getFormattedBengaliDateTime(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.leftText} numberOfLines={1}>
        উন্নয়ন দৃশ্যমান এবার হবে কর্মসংস্থান
      </Text>
      <Text style={styles.rightText} numberOfLines={1}>
        {currentDateTime}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#8e5582',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#008000',
    minHeight: 45,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  leftText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  rightText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
