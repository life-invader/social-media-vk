import type { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectViewingProfile = (state: RootState) => state.user.viewingProfile;
export const selectPosts = (state: RootState) => state.user.posts;
export const selectFeed = (state: RootState) => state.user.feed;
export const selectFriends = (state: RootState) => state.user.user.friends;