# SwoleMate Backend API

### Access the API

<https://swolemate-service.azurewebsites.net/api/>

### Routes of the API

#### User Routes

- **GET /users**: Retrieve all users
- **POST /users**: Create a new user
- **GET /users/:id**: Retrieve a user by ID
- **PUT /users/:id**: Update a user by ID
- **DELETE /users/:id**: Delete a user by ID

#### User Preference Routes

- **GET /userpreferences**: Retrieve all user preferences
- **POST /userpreferences**: Create new user preferences
- **GET /userpreferences/:id**: Retrieve preferences by user ID
- **PUT /userpreferences/:id**: Update user preferences
- **DELETE /userpreferences/:id**: Delete user preferences

#### Workout Routes

- **GET /workouts**: Retrieve all workouts
- \*\* The rest is the same as UserRoutes

#### Buddy Match Routes

- **GET /buddymatches**: Retrieve all buddy matches
- \*\* The rest is the same as UserRoutes

#### Chat Room Routes

- **GET /chatrooms**: Retrieve all chat rooms
- \*\* The rest is the same as UserRoutes

#### Chat Message Routes

- **GET /chatmessages**: Retrieve all chat messages
- \*\* The rest is the same as UserRoutes

## Request format

- All requests are sent as JSON.
- Authorization header is required for all requests. e.g. `Authorization: Bearer <token>`
- Token is generated when user logs in.

## Response Format

```json
{
  "success": true,
  "data": {
    // Response data goes here
  },
  "meta": {
    // Meta data goes here like pagination.
  },
  "msg": "relevant message, error message, etc."
}
```
