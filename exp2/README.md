# Blog API

This is a simple blog API with user registration, login, and CRUD operations for blog posts.

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication

#### `POST /auth/register`

Register a new user.

**Request Body:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Example using cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "testuser",
  "password": "password123"
}' http://localhost:3000/api/auth/register
```

#### `POST /auth/login`

Login with an existing user.

**Request Body:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response Body:**

```json
{
  "token": "your_jwt_token"
}
```

**Example using cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "testuser",
  "password": "password123"
}' http://localhost:3000/api/auth/login
```

### Blogs

#### `GET /blogs`

Get all blog posts. No authentication required.

**Example using cURL:**

```bash
curl http://localhost:3000/api/blogs
```

#### `GET /blogs/:id`

Get a single blog post by its ID. No authentication required.

**Example using cURL:**

```bash
curl http://localhost:3000/api/blogs/1
```

#### `POST /blogs`

Create a new blog post. Authentication required.

**Headers:**

*   `Authorization`: `Bearer <your_jwt_token>`

**Request Body:**

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post."
}
```

**Example using cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post."
}' http://localhost:3000/api/blogs
```

#### `PUT /blogs/:id`

Update an existing blog post. Authentication required.

**Headers:**

*   `Authorization`: `Bearer <your_jwt_token>`

**Request Body:**

```json
{
  "title": "Updated Blog Post Title",
  "content": "Updated content."
}
```

**Example using cURL:**

```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>" -d '{
  "title": "Updated Blog Post Title",
  "content": "Updated content."
}' http://localhost:3000/api/blogs/1
```

#### `DELETE /blogs/:id`

Delete a blog post. Authentication required.

**Headers:**

*   `Authorization`: `Bearer <your_jwt_token>`

**Example using cURL:**

```bash
curl -X DELETE -H "Authorization: Bearer <your_jwt_token>" http://localhost:3000/api/blogs/1
```
