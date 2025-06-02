# User Management API

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
PORT=
MONGO_URL=
JWT_SECRET=
```

3. Seed admin user:
```bash
node seeder.js
```
This creates an admin user:
- Username: admin
- Password: admin123
- Email: admin@example.com

## API Endpoints

### Authentication
`POST /api/users/login`
```json
{
    "username": "admin",
    "password": "admin123"
}
```
Returns JWT token for authentication

### User Operations

All routes except login and create user require JWT token in Authorization header:
```
Authorization: Bearer your_jwt_token
```

#### Create User
`POST /api/users`
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}
```

#### Get All Users
`GET /api/users`
- Returns list of usernames
- Requires authentication

#### Get Specific User
`GET /api/users/:username`
- Returns user details (excluding password)
- Requires authentication

#### Update User
`PUT /api/users/:username`
```json
{
    "email": "newemail@example.com",
    "password": "newpassword"
}
```
- Requires authentication
- Users can update their own info
- Admins can update any user

#### Delete User
`DELETE /api/users/:username`
- Requires admin privileges
- Deletes specified user

## Testing
Use Postman or similar tool to test endpoints. Remember to:
1. Login first to get JWT token
2. Add token to Authorization header for protected routes
3. Admin operations require admin user token
