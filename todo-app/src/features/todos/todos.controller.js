const { v4: uuidv4 } = require('uuid');

todos = [
  {
    id: '42a745d4-be49-4e3f-9eaa-62cbe2c4edf9',
    userId: '001',
    title: 'Example Todo',
    description: 'This is an example todo item1.',
    timestamp: '2024-04-04T11:04:53.927Z',
  },
  {
    id: '6b36e1ae-6bd9-4f4b-aeca-195c14275819',
    userId: '001',
    title: 'Example Todo11',
    description: 'This is an example todo item1.',
    timestamp: '2024-04-04T11:05:20.021Z',
  },
  {
    id: '34956149-57af-4a4f-a112-8e27628a1f6e',
    userId: '002',
    title: 'Example Todo21',
    description: 'This is an example todo item2.',
    timestamp: '2024-04-04T11:05:23.832Z',
  },
  {
    id: 'a78c972f-eec8-4a70-8e0f-521f6cc233d7',
    userId: '002',
    title: 'Example Todo22',
    description: 'This is an example todo item2.',
    timestamp: '2024-04-04T11:05:27.636Z',
  },
];

const createResponse = (data, message) => {
  return {
    data,
    meta: {
      message,
    },
  };
};

// Route to add a new todo
exports.addToDo = (req, res) => {
  try {
    const { title, description } = req.body;
    const timestamp = new Date().toISOString();
    const newTodo = {
      id: uuidv4(),
      userId: req.userId,
      title,
      description,
      timestamp,
    };
    todos.push(newTodo);

    const response = createResponse(newTodo, 'Todo added successfully');

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to get all todos
exports.getall = (req, res) => {
  const usersTodo = todos.filter((result) => result.userId === req.userId);

  try {
    const response = createResponse(
      { usersTodo, totalRecords: usersTodo.length },
      usersTodo.length > 0 ? 'Todos list found' : 'No todos available'
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to get a specific todo by ID
exports.getToDo = (req, res) => {
  try {
    const { id } = req.params;
    const usersTodo = todos.filter((result) => result.userId === req.userId);
    const todo = usersTodo.find((todo) => todo.id === id);
    if (!todo) {
      const response = createResponse({}, 'No todo found with the given ID');
      res.status(410).json(response);
    }
    const response = createResponse(todo, 'Todo details found');
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to delete a specific todo by ID
exports.delete = (req, res) => {
  try {
    const { id } = req.params;
    const usersTodoTodelete = todos.filter(
      (result) => result.userId === req.userId && result.id === id
    );

    todos = todos.filter((todo) => todo.id !== id);
    if (usersTodoTodelete.length === 0) {
      const response = createResponse({}, 'No todo found with the given ID');
      return res.status(410).json(response);
    }

    const response = createResponse(null, 'Todo deleted successfully');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route to update a specific todo by ID
exports.put = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], title, description };
      const response = createResponse(
        todos[todoIndex],
        'Todo updated successfully'
      );
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'No todo found with the given ID' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
