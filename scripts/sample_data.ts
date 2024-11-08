// Create sample data for the database
import { sequelize } from "@/config/database";
import {
  User,
  UserPreference,
  ChatRoom,
  ChatMessage,
  BuddyMatch,
  Review,
} from "@/models";
import { BuddyStatus, ExperienceLevel, WorkoutStatus } from "@/types/enums";

interface IUser {
  username: string;
  passwordHash: string;
  emailAddress: string;
}

const users: IUser[] = [
  {
    username: "loya",
    passwordHash: "swolemate1234",
    emailAddress: "zn23@calvin.edu",
  },
  {
    username: "jeton",
    passwordHash: "swolemate1234",
    emailAddress: "jeb64@calvin.edu",
  },
  {
    username: "alim",
    passwordHash: "swolemate1234",
    emailAddress: "aad32@calvin.edu",
  },
  {
    username: "allison",
    passwordHash: "swolemate1234",
    emailAddress: "amd93@calvin.edu",
  },
  {
    username: "madi",
    passwordHash: "swolemate1234",
    emailAddress: "mam64@calvin.edu",
  },
];

interface IUserPreference {
  userId: number;
  preferredExperienceLevel: ExperienceLevel;
}

const userPreferences: IUserPreference[] = [
  {
    userId: 1,
    preferredExperienceLevel: ExperienceLevel.Beginner,
  },
  {
    userId: 2,
    preferredExperienceLevel: ExperienceLevel.Intermediate,
  },
  {
    userId: 3,
    preferredExperienceLevel: ExperienceLevel.Advanced,
  },
];

interface IChatRoom {
  userId1: number;
  userId2: number;
}

const chatRooms: IChatRoom[] = [
  {
    userId1: 1,
    userId2: 2,
  },
  {
    userId1: 2,
    userId2: 3,
  },
  {
    userId1: 3,
    userId2: 4,
  },
  {
    userId1: 1,
    userId2: 4,
  },
  {
    userId1: 1,
    userId2: 3,
  },
];

interface IChatMessage {
  chatRoomId: number;
  senderId: number;
  messageText: string;
}

const chatMessages: IChatMessage[] = [
  {
    chatRoomId: 1,
    senderId: 1,
    messageText: "Hey! Would you like to be my workout buddy?",
  },
  {
    chatRoomId: 1,
    senderId: 2,
    messageText: "Sure! I'd love to. What kind of workouts do you usually do?",
  },
  {
    chatRoomId: 1,
    senderId: 1,
    messageText:
      "I mostly do strength training but looking to get into cardio more.",
  },
  {
    chatRoomId: 1,
    senderId: 2,
    messageText:
      "Perfect! I can definitely help with cardio routines. When would you like to meet?",
  },
  {
    chatRoomId: 1,
    senderId: 1,
    messageText: "How about next Monday at 6pm?",
  },
  {
    chatRoomId: 1,
    senderId: 2,
    messageText: "Monday at 6pm works great for me! See you then! 💪",
  },
];

interface IReview {
  reviewerId: number;
  reviewedId: number;
  rating: number;
  reviewText: string;
}

const reviews: IReview[] = [
  {
    reviewerId: 2,
    reviewedId: 1,
    rating: 5,
    reviewText:
      "Great workout buddy! Very motivated and always on time. We've been meeting regularly for strength training and they've helped push me to new levels.",
  },
  {
    reviewerId: 1,
    reviewedId: 2,
    rating: 5,
    reviewText:
      "Excellent partner for cardio workouts. Very knowledgeable about proper form and technique. Made working out fun!",
  },
  {
    reviewerId: 3,
    reviewedId: 4,
    rating: 4,
    reviewText:
      "Good spotter and reliable workout partner. Helped me stay consistent with my routine.",
  },
  {
    reviewerId: 4,
    reviewedId: 3,
    rating: 4,
    reviewText:
      "Friendly and encouraging. Always brings positive energy to our workout sessions.",
  },
  {
    reviewerId: 5,
    reviewedId: 6,
    rating: 5,
    reviewText:
      "Amazing trainer! Really helped me improve my form and achieve my fitness goals. Highly recommend!",
  },
  {
    reviewerId: 7,
    reviewedId: 8,
    rating: 3,
    reviewText:
      "Decent workout partner but sometimes shows up late. Good person to train with when they're there.",
  },
];

interface IWorkout {
  creatorId: number;
  partnerId: number;
  workoutDate: Date;
  status: WorkoutStatus;
}

const workouts: IWorkout[] = [
  {
    creatorId: 1,
    partnerId: 2,
    workoutDate: new Date("2024-01-15"),
    status: WorkoutStatus.Completed,
  },
  {
    creatorId: 2,
    partnerId: 1,
    workoutDate: new Date("2024-01-17"),
    status: WorkoutStatus.Completed,
  },
];

interface IBuddyMatch {
  requesterId: number;
  receiverId: number;
  status: BuddyStatus;
}

const buddyMatches: IBuddyMatch[] = [
  {
    requesterId: 1,
    receiverId: 2,
    status: BuddyStatus.Accepted,
  },
  {
    requesterId: 2,
    receiverId: 1,
    status: BuddyStatus.Accepted,
  },
  {
    requesterId: 3,
    receiverId: 2,
    status: BuddyStatus.Accepted,
  },
];
