import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../core/theme'
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
    touchableItems: {
        padding: 15,
        backgroundColor: theme.colors.touchableOpacityBackground,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

const HomeScreen = ({ navigation }) => {
  const [albums, setAlbums] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
    fetchPosts();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity
    style={styles.touchableItems}
      onPress={() => navigation.navigate('AlbumDetailScreen', { albumId: item.id })}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      style={styles.touchableItems}
      onPress={() => navigation.navigate('PostDetailScreen', { postId: item.id })}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Tab.Navigator
    screenOptions={{
        tabBarLabelStyle: { fontSize: 18, marginTop: 25, color: theme.colors.secondary },
        tabBarStyle: { height: 90, marginBottom: 10, },
      }}
    >
      <Tab.Screen name="Albums">
        {() => (
          <FlatList
            data={albums}
            renderItem={renderAlbumItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Posts">
        {() => (
          <FlatList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};



export default HomeScreen;
