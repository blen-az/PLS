import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerformanceAnalysisScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Course Overview</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PerformanceAnalysisScreen;
