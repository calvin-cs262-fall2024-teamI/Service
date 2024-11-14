import {
  BuddyMatch,
  ChatMessage,
  ChatRoom,
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

const chatMessageRouter = createCrudRouter(ChatMessage, {
  routePrefix: "/chatmessages",
});

export {
  buddyMatchRouter,
  chatMessageRouter,
  chatRoomRouter,
  userPreferenceRouter,
  userRouter,
  workoutRouter,
};

const crudRoutes = [
  userRouter,
  userPreferenceRouter,
  workoutRouter,
  buddyMatchRouter,
  chatRoomRouter,
  chatMessageRouter,
];

export { authRouter, crudRoutes };
