# Task Management GraphQL API

This is a simple task management API built with Node.js, Express, and GraphQL. It allows you to perform CRUD operations on tasks.

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the server: `npm start`

The API will be available at `http://localhost:4000/graphql`.

## GraphQL API Endpoints

### Create a Task

Creates a new task.

**Mutation:**

```graphql
mutation {
  createTask(input: {
    title: "My New Task"
    description: "This is a description for my new task."
    dueDate: "2025-12-31"
    createdBy: "User1"
    estimatedHours: 2.5
  }) {
    id
    title
    description
    status
    dueDate
    createdBy
    estimatedHours
    createdAt
  }
}
```

### Get All Tasks

Retrieves a list of all tasks. You can optionally filter by status or search by title and description.

**Query:**

```graphql
query {
  tasks(status: "TODO", search: "My") {
    id
    title
    description
    status
    dueDate
  }
}
```

### Get a Single Task

Retrieves a single task by its ID.

**Query:**

```graphql
query {
  task(id: "your_task_id") {
    id
    title
    description
    status
    dueDate
    createdBy
    estimatedHours
    createdAt
  }
}
```

### Update a Task

Updates an existing task.

**Mutation:**

```graphql
mutation {
  updateTask(id: "your_task_id", input: {
    title: "My Updated Task"
    description: "This is the updated description."
    status: "IN_PROGRESS"
  }) {
    id
    title
    description
    status
  }
}
```

### Patch Task Status

Updates only the status of a task.

**Mutation:**

```graphql
mutation {
  patchTaskStatus(id: "your_task_id", status: "DONE") {
    id
    status
  }
}
```

### Delete a Task

Deletes a task by its ID.

**Mutation:**

```graphql
mutation {
  deleteTask(id: "your_task_id")
}
```
