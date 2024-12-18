import { BuddyMatch } from "./BuddyMatch";
import { ChatMessage } from "./ChatMessage";
import { ChatRoom } from "./ChatRoom";
import { Review } from "./Review";
import { User } from "./User";
import { UserPreference } from "./UserPreference";
import { Workout } from "./Workout";

/**
 * User - UserPreference Association
 * One-to-One relationship between users and their preferences
 */
User.hasOne(UserPreference, {
  foreignKey: "userId",
  as: "preferences",
});
UserPreference.belongsTo(User, {
  foreignKey: "userId",
});

/**
 * User - BuddyMatch Associations
 * One-to-Many relationships for both sent and received buddy requests
 */
User.hasMany(BuddyMatch, {
  foreignKey: "requesterId",
  as: "sentBuddyRequests",
});
User.hasMany(BuddyMatch, {
  foreignKey: "receiverId",
  as: "receivedBuddyRequests",
});
BuddyMatch.belongsTo(User, {
  foreignKey: "requesterId",
  as: "requester",
});
BuddyMatch.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiver",
});

/**
 * User - ChatRoom Associations
 * Many-to-Many relationships through ChatRoom for both user1 and user2
 */
User.hasMany(ChatRoom, {
  foreignKey: "user1Id",
  as: "chatRoomsAsUser1",
});
User.hasMany(ChatRoom, {
  foreignKey: "user2Id",
  as: "chatRoomsAsUser2",
});
ChatRoom.belongsTo(User, {
  foreignKey: "user1Id",
  as: "user1",
});
ChatRoom.belongsTo(User, {
  foreignKey: "user2Id",
  as: "user2",
});

/**
 * ChatRoom - ChatMessage Association
 * One-to-Many relationship between ChatRoom and ChatMessage
 */
ChatRoom.hasMany(ChatMessage, {
  foreignKey: "chatRoomId",
  as: "messages",
});
ChatMessage.belongsTo(ChatRoom, {
  foreignKey: "chatRoomId",
});
ChatMessage.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});

/**
 * User - Workout Associations
 * One-to-Many relationships for both created and partner workouts
 */
User.hasMany(Workout, {
  foreignKey: "creatorId",
  as: "createdWorkouts",
});
User.hasMany(Workout, {
  foreignKey: "partnerId",
  as: "partnerWorkouts",
});
Workout.belongsTo(User, {
  foreignKey: "creatorId",
  as: "creator",
});
Workout.belongsTo(User, {
  foreignKey: "partnerId",
  as: "partner",
});

/**
 * User - Review Associations
 * One-to-Many relationships for both given and received reviews
 */
User.hasMany(Review, {
  foreignKey: "reviewerId",
  as: "givenReviews",
});
User.hasMany(Review, {
  foreignKey: "reviewedId",
  as: "receivedReviews",
});
Review.belongsTo(User, {
  foreignKey: "reviewerId",
  as: "reviewer",
});
Review.belongsTo(User, {
  foreignKey: "reviewedId",
  as: "reviewed",
});

export {
  User,
  UserPreference,
  ChatRoom,
  BuddyMatch,
  ChatMessage,
  Review,
  Workout,
};
