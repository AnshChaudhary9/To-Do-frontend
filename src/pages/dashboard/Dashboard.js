import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authcontext/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateTodo from '../../todo/CreateToDo';
import TodoList from '../../todo/ToDoList';
import EditTodo from '../../todo/EditToDo';
import { Container } from 'react-bootstrap';

export default function Dashboard() {
    const { token } = useAuth();
  const navigate = useNavigate();
  const [editingTodo, setEditingTodo] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>Todo Dashboard</h2>
      </div>
      {!token ? (
        <p style={{ fontSize: '18px', color: '#444', marginTop: '20px' }}>
          Please <strong>Register</strong> or <strong>Login</strong> to view your dashboard.
        </p>
      ) : (
        <>
          <CreateTodo onSuccess={() => setRefresh(prev => prev + 1)} />
          {editingTodo && (
            <EditTodo
              todo={editingTodo}
              onDone={() => {
                setEditingTodo(null);
                setRefresh(prev => prev + 1);
              }}
            />
          )}
          <TodoList refresh={refresh} onEdit={setEditingTodo} />
        </>
      )}
    </Container>
  );
}
