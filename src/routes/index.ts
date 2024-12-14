/**
 * @fileoverview Route configuration and exports for the API.
 * Sets up CRUD routes for all models and exports authentication routes.
 */

import {
  BuddyMatch,
  ChatMessage,
  ChatRoom,
  Review,
  User,
  UserPreference,
  Workout,
} from "@/models";
import { createCrudRouter } from "@/utils/crudGenerator";
import authRouter from "./auth";

/**
 * User routes with password hash field excluded from responses
 */
const userRouter = createCrudRouter(User, {
  routePrefix: "/users",
  excludeFields: ["passwordHash"],
});

/**
 * User preferences CRUD routes
 */
const userPreferenceRouter = createCrudRouter(UserPreference, {
  routePrefix: "/userpreferences",
});

/**
 * Workout session CRUD routes
 */
const workoutRouter = createCrudRouter(Workout, {
  routePrefix: "/workouts",
});

/**
 * Buddy matching CRUD routes
 */
const buddyMatchRouter = createCrudRouter(BuddyMatch, {
  routePrefix: "/buddymatches",
});

/**
 * Chat room CRUD routes
 */
const chatRoomRouter = createCrudRouter(ChatRoom, {
  routePrefix: "/chatrooms",
});

/**
 * User review CRUD routes
 */
const reviewRouter = createCrudRouter(Review, {
  routePrefix: "/reviews",
});

/**
 * Chat message CRUD routes
 */
const chatMessageRouter = createCrudRouter(ChatMessage, {
  routePrefix: "/chatmessages",
});

// Export individual routers for specific use cases
export {
  buddyMatchRouter,
  chatMessageRouter,
  chatRoomRouter,
  userPreferenceRouter,
  userRouter,
  reviewRouter,
  workoutRouter,
};

/**
 * Combined array of all CRUD routes for bulk registration
 */
const crudRoutes = [
  userRouter,
  userPreferenceRouter,
  workoutRouter,
  reviewRouter,
  buddyMatchRouter,
  chatRoomRouter,
  chatMessageRouter,
];

export { authRouter, crudRoutes };
