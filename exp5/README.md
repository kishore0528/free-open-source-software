Installation (WSL) :
sudo apt update
sudo apt install -y python3-pip ansible git
ansible --version
Run Commands in WSL:
mkdir ~/ansible-taskapi

cd ~/ansible-taskapi
nano inventory.ini
nano playbook.yml

## GraphQL API Usage (cURL)

Here are some example `curl` commands to interact with the GraphQL API.

### Get All Tasks

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"query": "{ tasks { id title description status } }"}' \
http://localhost:4000/graphql
```

### Get a Single Task

Replace `YOUR_TASK_ID` with the ID of the task you want to retrieve.

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"query": "{ task(id: \"YOUR_TASK_ID\") { id title description status dueDate createdBy } }"}' \
http://localhost:4000/graphql
```

### Create a New Task

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"query": "mutation { createTask(input: { title: \"New Task\", description: \"A new task description\", createdBy: \"user1\" }) { id title description status } }"}' \
http://localhost:4000/graphql
```

### Update a Task

Replace `YOUR_TASK_ID` with the ID of the task you want to update.

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"query": "mutation { updateTask(id: \"YOUR_TASK_ID\", input: { title: \"Updated Title\", description: \"Updated description\" }) { id title description } }"}' \
http://localhost:4000/graphql
```

### Update Task Status

Replace `YOUR_TASK_ID` with the ID of the task you want to update.

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"query": "mutation { patchTaskStatus(id: \"YOUR_TASK_ID\", status: \"IN_PROGRESS\") { id status } }"}' \
http://localhost:4000/graphql
```

### Delete a Task

Replace `YOUR_TASK_ID` with the ID of the task you want to delete.

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"query": "mutation { deleteTask(id: \"YOUR_TASK_ID\") }"}' \
http://localhost:4000/graphql
```