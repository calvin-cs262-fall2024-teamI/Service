import { BuddyMatch } from "./BuddyMatch";
import { ChatMessage } from "./ChatMessage";
import { ChatRoom } from "./ChatRoom";
import { Review } from "./Review";
import { User } from "./User";
import { UserPreference } from "./UserPreference";
import { Workout } from "./Workout";

// User - UserPreference (One-to-One)
User.hasOne(UserPreference, {
  foreignKey: "userId",
  as: "preferences",
});
UserPreference.belongsTo(User, {
  foreignKey: "userId",
});

// User - BuddyMatch (One-to-Many as requester and receiver)
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

// User - ChatRoom (Many-to-Many through ChatRoom)
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

// ChatRoom - ChatMessage (One-to-Many)
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

// User - Workout (One-to-Many as creator and partner)
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

// User - Review (One-to-Many as reviewer and reviewed)
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
