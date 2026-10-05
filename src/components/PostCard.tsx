import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  saved: boolean;
  onToggleSave: (post: Post) => void;
}

function PostCardComponent({ post, saved, onToggleSave }: PostCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      {post.author ? <Text style={styles.author}>{post.author}</Text> : null}
      <Text style={styles.body}>{post.body}</Text>
      <Pressable
        onPress={() => onToggleSave(post)}
        style={[styles.button, saved && styles.buttonActive]}
      >
        <Text style={[styles.buttonText, saved && styles.buttonTextActive]}>
          {saved ? 'Сохранено' : 'Сохранить'}
        </Text>
      </Pressable>
    </View>
  );
}

export const PostCard = memo(PostCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#111827' },
  author: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  body: { fontSize: 15, color: '#374151', marginTop: 8, lineHeight: 21 },
  button: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  buttonActive: { backgroundColor: '#2563eb' },
  buttonText: { color: '#2563eb', fontWeight: '600' },
  buttonTextActive: { color: '#ffffff' },
});
