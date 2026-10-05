import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post, SavedPost, UseSavedPostsResult } from '../types';

const STORAGE_KEY = 'saved_posts';

export function useSavedPosts(): UseSavedPostsResult {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (active && raw) {
          setSavedPosts(JSON.parse(raw) as SavedPost[]);
        }
      } catch (e) {
        if (active) setError(e as Error);
      } finally {
        if (active) {
          setHydrated(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPosts)).catch((e) =>
      setError(e as Error)
    );
  }, [savedPosts, hydrated]);

  const savedIds = useMemo(
    () => new Set(savedPosts.map((p) => p.id)),
    [savedPosts]
  );

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  const savePost = useCallback((post: Post) => {
    setSavedPosts((prev) =>
      prev.some((p) => p.id === post.id)
        ? prev
        : [{ ...post, savedAt: Date.now() }, ...prev]
    );
  }, []);

  const removePost = useCallback((id: string) => {
    setSavedPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleSave = useCallback((post: Post) => {
    setSavedPosts((prev) =>
      prev.some((p) => p.id === post.id)
        ? prev.filter((p) => p.id !== post.id)
        : [{ ...post, savedAt: Date.now() }, ...prev]
    );
  }, []);

  const clearAll = useCallback(() => {
    setSavedPosts([]);
  }, []);

  return {
    savedPosts,
    loading,
    error,
    isSaved,
    savePost,
    removePost,
    toggleSave,
    clearAll,
  };
}
