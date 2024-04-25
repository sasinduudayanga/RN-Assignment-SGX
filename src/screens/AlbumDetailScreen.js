import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AlbumDetailScreen = ({ route }) => {
  const { albumId } = route.params;
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
      setAlbum(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching album:', error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Title: {album.title}</Text>
      <Text>User ID: {album.userId}</Text>
      <Text>ID: {album.id}</Text>
    </View>
  );
};

export default AlbumDetailScreen;
