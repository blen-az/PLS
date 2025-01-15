import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';  // Import useAuth hook
import { Ionicons } from '@expo/vector-icons';  // Import icon library for log out icon

const DashboardScreen = ({ navigation }) => {
  const { user, logout, loadingUserData } = useAuth();  // Access user and logout from AuthContext
  const [loading, setLoading] = useState(false);  // State for handling loading
  const [userProgress, setUserProgress] = useState(0);  // Track user progress in courses
  const [personalizedCourses, setPersonalizedCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (loadingUserData) {
      setLoading(true);  // Set loading to true when user data is being fetched
    } else {
      setLoading(false);  // Set loading to false once user data is fetched
    }

    // Set user progress dynamically
    setUserProgress(user?.learningProgress || 0);  // Assuming user has learningProgress stored in their data

    // Fetch personalized courses based on user's preferences/interests
    if (user?.interests) {
      setPersonalizedCourses(user.interests);
    }

    // Fetch categories based on the user's preferences or system suggestion
    const predefinedCategories = ['Data Structures', 'Algorithms', 'Software Development', 'System Design', 'Database Management', 'Cloud Computing', 'AI & ML'];
    setCategories(predefinedCategories);  // We can later replace this with dynamic categories fetched from Firestore

  }, [loadingUserData, user]);

  const handleLogout = async () => {
    try {
      await logout();  // Log the user out
      navigation.navigate('SignInScreen');  // Navigate back to SignInScreen
    } catch (error) {
      alert('Something went wrong while logging out.');
    }
  };

  if (loading || loadingUserData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with Log Out Icon */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.username || 'Cyndy'}!</Text>
        <Text style={styles.subHeading}>Find the class or field you like here</Text>
        <View style={styles.searchBar}>
          <TextInput placeholder="Find class" style={styles.searchInput} />
        </View>
        {/* Log Out Icon */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* User Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <Text style={styles.progressText}>You are {userProgress}% through your learning journey</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${userProgress}%` }]} />
        </View>
      </View>

      {/* Explore Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Explore Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Personalized Course Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {personalizedCourses.map((course, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{course.courseName}</Text>
              <Text style={styles.cardInfo}>{course.details}</Text>
              <TouchableOpacity style={styles.startJourneyBtn}>
                <Text style={styles.startJourneyText}>Start Journey</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Freemium Classes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Freemium Class</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Mastering Data Structures</Text>
            <Text style={styles.cardInfo}>Free | 10 Lessons</Text>
            <TouchableOpacity style={styles.startJourneyBtn}>
              <Text style={styles.startJourneyText}>Start Learning</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Popular Classes Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Classes</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Become a Full Stack Developer</Text>
            <Text style={styles.cardInfo}>12 Lessons</Text>
            <TouchableOpacity style={styles.startJourneyBtn}>
              <Text style={styles.startJourneyText}>Start Learning</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: '#4c6ef5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    position: 'relative',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeading: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 5,
  },
  searchBar: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    fontSize: 16,
    paddingLeft: 5,
  },
  logoutIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4c6ef5',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // This will allow the items to wrap within the container
  },
  categoryCard: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
    width: 130,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  startJourneyBtn: {
    backgroundColor: '#4c6ef5',
    padding: 10,
    borderRadius: 5,
  },
  startJourneyText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
});

export default DashboardScreen;
