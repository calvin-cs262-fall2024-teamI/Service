-- Create enum types
CREATE TYPE experienceLevel AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE workoutStatus AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE buddyStatus AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE gender AS ENUM ('male', 'female');
CREATE TYPE dayOfWeek AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- User table
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    emailAddress VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    gender gender,
    profilePictureUrl VARCHAR(255),
    experienceLevel experienceLevel,
    bio TEXT,
    -- Personal Trainer specific fields
    isTrainer BOOLEAN DEFAULT FALSE,
    cost DECIMAL(5, 2) DEFAULT 0,
    -- Only applicable if isTrainer is true
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- UserPreference table
CREATE TABLE "UserPreference" (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    preferredGender gender,
    preferredExperienceLevel experienceLevel,
    preferredWorkoutTime TIME [],
    -- Array of preferred times
    preferredDays dayOfWeek [],
    -- Array of preferred days (Monday, Tuesday, etc.)
    maxBudget DECIMAL(10, 2),
    -- Maximum budget for trainer
    goals TEXT [],
    -- Array of fitness goals
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- BuddyMatch table
CREATE TABLE "BuddyMatch" (
    id SERIAL PRIMARY KEY,
    requesterId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    receiverId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    status buddyStatus NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniqueBuddyPair UNIQUE (requesterId, receiverId)
);

-- ChatRoom table
CREATE TABLE "ChatRoom" (
    id SERIAL PRIMARY KEY,
    user1Id INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    user2Id INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Ensure user1Id is always the smaller ID
    CONSTRAINT userIdOrder CHECK (user1Id < user2Id),
    -- Ensure chat room uniqueness
    CONSTRAINT uniqueChatRoom UNIQUE (user1Id, user2Id)
);

-- ChatMessage table
CREATE TABLE "ChatMessage" (
    id SERIAL PRIMARY KEY,
    chatRoomId INTEGER NOT NULL REFERENCES "ChatRoom"(id) ON DELETE CASCADE,
    senderId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    messageText TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workout table
CREATE TABLE "Workout" (
    id SERIAL PRIMARY KEY,
    creatorId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    partnerId INTEGER REFERENCES "User"(id) ON DELETE SET NULL,
    workoutTime TIMESTAMP NOT NULL,
    location VARCHAR(255),
    status workoutStatus DEFAULT 'scheduled',
    notes TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Review table
CREATE TABLE "Review" (
    id SERIAL PRIMARY KEY,
    reviewerId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    reviewedId INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    reviewText TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT oneReviewPerPair UNIQUE (reviewerId, reviewedId)
);

-- Trigger function for updating updatedAt timestamp
CREATE OR REPLACE FUNCTION updateUpdatedAtColumn()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER updateUserUpdatedAt
    BEFORE UPDATE ON "User"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

CREATE TRIGGER updateUserPreferenceUpdatedAt
    BEFORE UPDATE ON "UserPreference"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

CREATE TRIGGER updateBuddyMatchUpdatedAt
    BEFORE UPDATE ON "BuddyMatch"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

CREATE TRIGGER updateChatRoomUpdatedAt
    BEFORE UPDATE ON "ChatRoom"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

CREATE TRIGGER updateChatMessageUpdatedAt
    BEFORE UPDATE ON "ChatMessage"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

CREATE TRIGGER updateWorkoutUpdatedAt
    BEFORE UPDATE ON "Workout"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

CREATE TRIGGER updateReviewUpdatedAt
    BEFORE UPDATE ON "Review"
    FOR EACH ROW
    EXECUTE FUNCTION updateUpdatedAtColumn();

-- Create indexes for better query performance
CREATE INDEX idxUserEmail ON "User"(emailAddress);
CREATE INDEX idxUserUsername ON "User"(username);
CREATE INDEX idxChatMessageChatRoom ON "ChatMessage"(chatRoomId);
CREATE INDEX idxChatMessageSender ON "ChatMessage"(senderId);
CREATE INDEX idxWorkoutCreator ON "Workout"(creatorId);
CREATE INDEX idxWorkoutPartner ON "Workout"(partnerId);
CREATE INDEX idxReviewReviewed ON "Review"(reviewedId);
