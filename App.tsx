import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PostCard } from './src/components/PostCard';
import { POSTS } from './src/data/posts';
import { useSavedPosts } from './src/hooks/useSavedPosts';

type Tab = 'feed' | 'saved';

export default function App() {
  const [tab, setTab] = useState<Tab>('feed');
  const { savedPosts, loading, isSaved, toggleSave, clearAll } =
    useSavedPosts();

  const data = tab === 'feed' ? POSTS : savedPosts;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, tab === 'feed' && styles.tabActive]}
            onPress={() => setTab('feed')}
          >
            <Text style={[styles.tabText, tab === 'feed' && styles.tabTextActive]}>
              Лента
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, tab === 'saved' && styles.tabActive]}
            onPress={() => setTab('saved')}
          >
            <Text style={[styles.tabText, tab === 'saved' && styles.tabTextActive]}>
              Сохранённые ({savedPosts.length})
            </Text>
          </Pressable>
        </View>

        {tab === 'saved' && savedPosts.length > 0 ? (
          <Pressable onPress={clearAll} style={styles.clear}>
            <Text style={styles.clearText}>Очистить всё</Text>
          </Pressable>
        ) : null}

        {loading ? (
          <ActivityIndicator style={styles.loader} size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <PostCard
                post={item}
                saved={isSaved(item.id)}
                onToggleSave={toggleSave}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>Пока ничего не сохранено</Text>
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  tabs: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#ffffff' },
  tabText: { color: '#6b7280', fontWeight: '500' },
  tabTextActive: { color: '#111827', fontWeight: '600' },
  clear: { alignSelf: 'flex-end', marginRight: 16, marginBottom: 4 },
  clearText: { color: '#dc2626', fontWeight: '500' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  loader: { marginTop: 40 },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 40 },
});
