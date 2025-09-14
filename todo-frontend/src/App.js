import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const todosData = await response.json();
        setTodos(todosData);
        setUser({ token });
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        fetchTodos(data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setTodos([]);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTodos([]);
  };

  const fetchTodos = async (token = localStorage.getItem('token')) => {
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const todosData = await response.json();
        setTodos(todosData);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (title, description) => {
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([newTodo, ...todos]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      {!user ? (
        <AuthForm onLogin={login} onRegister={register} />
      ) : (
        <Dashboard
          user={user}
          todos={todos}
          onLogout={logout}
          onAddTodo={addTodo}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

function AuthForm({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = isLogin
      ? await onLogin(formData.email, formData.password)
      : await onRegister(formData.name, formData.email, formData.password);

    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="link-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ user, todos, onLogout, onAddTodo, onUpdateTodo, onDeleteTodo }) {
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      onAddTodo(newTodo.title, newTodo.description);
      setNewTodo({ title: '', description: '' });
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo({ ...todo });
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();
    onUpdateTodo(editingTodo._id, {
      title: editingTodo.title,
      description: editingTodo.description,
      completed: editingTodo.completed
    });
    setEditingTodo(null);
  };

  const toggleComplete = (todo) => {
    onUpdateTodo(todo._id, { ...todo, completed: !todo.completed });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Todos</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <div className="add-todo-form">
        <h3>Add New Todo</h3>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Todo title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>

      {editingTodo && (
        <div className="edit-todo-form">
          <h3>Edit Todo</h3>
          <form onSubmit={handleUpdateTodo}>
            <input
              type="text"
              value={editingTodo.title}
              onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
              required
            />
            <textarea
              value={editingTodo.description}
              onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
            />
            <div className="form-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingTodo(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="todos-list">
        <h3>Your Todos ({todos.length})</h3>
        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <h4>{todo.title}</h4>
                {todo.description && <p>{todo.description}</p>}
                <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
              </div>
              <div className="todo-actions">
                <button
                  onClick={() => toggleComplete(todo)}
                  className={todo.completed ? 'uncomplete-btn' : 'complete-btn'}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEditTodo(todo)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => onDeleteTodo(todo._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;