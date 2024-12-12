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

const userRouter = createCrudRouter(User, {
  routePrefix: "/users",
  excludeFields: ["passwordHash"],
});

const userPreferenceRouter = createCrudRouter(UserPreference, {
  routePrefix: "/userpreferences",
});

const workoutRouter = createCrudRouter(Workout, {
  routePrefix: "/workouts",
});

const buddyMatchRouter = createCrudRouter(BuddyMatch, {
  routePrefix: "/buddymatches",
});

const chatRoomRouter = createCrudRouter(ChatRoom, {
  routePrefix: "/chatrooms",
});

const reviewRouter = createCrudRouter(Review, {
  routePrefix: "/reviews",
});
const chatMessageRouter = createCrudRouter(ChatMessage, {
  routePrefix: "/chatmessages",
});
export {
  buddyMatchRouter,
  chatMessageRouter,
  chatRoomRouter,
  userPreferenceRouter,
  userRouter,
  reviewRouter,
  workoutRouter,
};

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
