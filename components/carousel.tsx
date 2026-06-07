import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
// Standard aspect ratio for the banner (approx 3.2:1)
const CAROUSEL_HEIGHT = 160;

const SLIDES = [
  { id: '1', image: require('@/assets/images/slide1.jpg') },
  { id: '2', image: require('@/assets/images/slide2.jpg') },
  { id: '3', image: require('@/assets/images/slide3.jpg') },
];

export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % SLIDES.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    if (index !== activeIndex && index >= 0 && index < SLIDES.length) {
      setActiveIndex(index);
    }
  };

  const navigateToSlide = (index: number) => {
    stopAutoplay();
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + SLIDES.length) % SLIDES.length;
    navigateToSlide(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % SLIDES.length;
    navigateToSlide(nextIndex);
  };

  return (
    <View style={styles.container}>
      {/* Slides FlatList */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollBeginDrag={stopAutoplay}
        onScrollEndDrag={startAutoplay}
        getItemLayout={(_data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.slideImage} resizeMode="cover" />
        )}
      />

      {/* Government Seal (Bangladesh Logo Overlay) */}
      <View style={styles.logoContainer} pointerEvents="none">
        <Image
          source={require('@/assets/images/bd_seal.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Red Semi-Transparent Text Banner Overlay */}
      <View style={styles.textBannerContainer} pointerEvents="none">
        <Text style={styles.bannerText}>৮নং কসকনকপুর ইউনিয়ন পরিষদ</Text>
      </View>

      {/* Navigation Arrows */}
      <TouchableOpacity style={[styles.arrowButton, styles.leftArrow]} onPress={handlePrev}>
        <Text style={styles.arrowText}>‹</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.arrowButton, styles.rightArrow]} onPress={handleNext}>
        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>

      {/* Square Indicators at Bottom */}
      <View style={styles.indicatorsContainer}>
        {SLIDES.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicatorSquare,
              activeIndex === index ? styles.indicatorSquareActive : styles.indicatorSquareInactive,
            ]}
            onPress={() => navigateToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CAROUSEL_HEIGHT,
    width: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  slideImage: {
    width: screenWidth,
    height: CAROUSEL_HEIGHT,
  },
  logoContainer: {
    position: 'absolute',
    left: 15,
    top: (CAROUSEL_HEIGHT - 72) / 2, // Vertically center the 72px logo
    width: 72,
    height: 72,
    zIndex: 10,
    backgroundColor: '#ffffff',
    borderRadius: 36,
    padding: 2,
    // Shadow for logo highlight
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  textBannerContainer: {
    position: 'absolute',
    left: 65, // Starts behind the logo to look integrated
    right: 25,
    top: (CAROUSEL_HEIGHT - 48) / 2, // Vertically centered
    height: 48,
    backgroundColor: 'rgba(139, 0, 0, 0.75)', // Crimson red transparent overlay
    justifyContent: 'center',
    paddingLeft: 30, // Padded so text doesn't overlap the logo
    paddingRight: 15,
    zIndex: 5,
    borderRadius: 4,
  },
  bannerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: (CAROUSEL_HEIGHT - 40) / 2,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  leftArrow: {
    left: 4,
  },
  rightArrow: {
    right: 4,
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  indicatorSquare: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    marginHorizontal: 5,
    transform: [{ rotate: '45deg' }], // Diamond or square rotation
  },
  indicatorSquareActive: {
    backgroundColor: '#ffffff',
  },
  indicatorSquareInactive: {
    backgroundColor: 'transparent',
  },
});
