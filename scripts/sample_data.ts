import {
  BuddyMatch,
  ChatMessage,
  ChatRoom,
  Review,
  User,
  UserPreference,
  Workout,
} from "@/models";
import { BuddyStatus, ExperienceLevel, WorkoutStatus } from "@/types/enums";
import { faker } from "@faker-js/faker";

export const users = User.bulkBuild([
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
  ...Array(10)
    .fill(null)
    .map(() => {
      const username = faker.internet.username();
      return {
        username,
        passwordHash: username,
        emailAddress: faker.internet.email(),
      };
    }),
]);

export const userPreferences = UserPreference.bulkBuild([
  {
    userId: 1,
    preferredExperienceLevel: ExperienceLevel.Beginner,
  },
  {
    userId: 2,
    preferredExperienceLevel: ExperienceLevel.Advanced,
  },
  {
    userId: 3,
    preferredExperienceLevel: ExperienceLevel.Advanced,
  },
  {
    userId: 4,
    preferredExperienceLevel: ExperienceLevel.Intermediate,
  },
  {
    userId: 5,
    preferredExperienceLevel: ExperienceLevel.Intermediate,
  },
  ...Array(10)
    .fill(null)
    .map((_, i) => ({
      userId: i + 6,
      preferredExperienceLevel: faker.helpers.arrayElement(
        Object.values(ExperienceLevel)
      ),
    })),
]);

export const chatRooms = ChatRoom.bulkBuild([
  {
    user1Id: 1,
    user2Id: 2,
  },
  {
    user1Id: 1,
    user2Id: 3,
  },
  {
    user1Id: 1,
    user2Id: 4,
  },
  {
    user1Id: 1,
    user2Id: 5,
  },
  ...Array(5)
    .fill(null)
    .map((_, i) => ({
      user1Id: 2,
      user2Id: 3 + i,
    })),
  ...Array(5)
    .fill(null)
    .map((_, i) => ({
      user1Id: 3,
      user2Id: 4 + i,
    })),
]);

export const chatMessages = ChatMessage.bulkBuild([
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
]);

export const reviews = Review.bulkBuild([
  {
    reviewerId: 2,
    reviewedId: 1,
    rating: 5,
  },
  {
    reviewerId: 1,
    reviewedId: 2,
    rating: 5,
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
  ...Array(20)
    .fill(null)
    .map(() => {
      let reviewerId = faker.number.int({ min: 1, max: 14 });
      let reviewedId = faker.number.int({ min: 1, max: 15 });
      if (reviewedId === reviewerId) reviewedId++;
      return {
        reviewerId,
        reviewedId,
        rating: faker.number.int({ min: 1, max: 5 }),
        reviewText: faker.lorem.sentence(),
      };
    }),
]);

export const workouts = Workout.bulkBuild([
  {
    creatorId: 1,
    partnerId: 2,
    workoutTime: new Date("2024-01-15"),
    status: WorkoutStatus.Completed,
  },
  {
    creatorId: 2,
    partnerId: 1,
    workoutTime: new Date("2024-01-17"),
    status: WorkoutStatus.Completed,
  },
  ...Array(20)
    .fill(null)
    .map(() => {
      let creatorId = faker.number.int({ min: 1, max: 14 });
      let partnerId = faker.number.int({ min: 1, max: 15 });
      if (creatorId === partnerId) partnerId++;
      return {
        creatorId,
        partnerId,
        workoutTime: faker.date.soon(),
        status: faker.helpers.arrayElement(Object.values(WorkoutStatus)),
      };
    }),
]);

export const buddyMatches = BuddyMatch.bulkBuild([
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
]);
