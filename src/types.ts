export interface Post {
  id: string;
  title: string;
  body: string;
  author?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface SavedPost extends Post {
  savedAt: number;
}

export interface UseSavedPostsResult {
  savedPosts: SavedPost[];
  loading: boolean;
  error: Error | null;
  isSaved: (id: string) => boolean;
  savePost: (post: Post) => void;
  removePost: (id: string) => void;
  toggleSave: (post: Post) => void;
  clearAll: () => void;
}
