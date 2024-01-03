import { configureStore } from "@reduxjs/toolkit";

import { Middleware } from "redux";
import persistStore from "redux-persist/es/persistStore";
import { persistedReducer } from "./slices/projectSlice";

// Middleware to log actions
const logger: Middleware = (store) => (next) => (action) => {
  console.log("dispatching", action);
  return next(action);
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
