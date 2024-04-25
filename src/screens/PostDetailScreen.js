import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { theme } from '../core/theme'
import axios from 'axios';

const PostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
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
    <View style={styles.postView}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 30 }}>{post.title}</Text>
      <Text style={styles.postBody}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    postView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,

    },

    postBody: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    }
  });


export default PostDetailScreen;
