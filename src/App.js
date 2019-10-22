import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TODOS, CREATE_TODO, DELETE_TODO } from './graphql/cache';
import Button from '@material-ui/core/Button';

function App() {
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const { loading, error, data } = useQuery(GET_TODOS);

  const RenderTodos = todos =>
    todos.map(todo => (
      <li key={todo.id}>
        <div>
          <p>{`Task: ${todo.task}`}</p>
          <p>{`Completed: ${todo.completed}`}</p>
          <Button onClick={() => deleteTodo({ variables: { id: todo.id } })}>
            X
          </Button>
        </div>
      </li>
    ));

  return (
    <div>
      <Button
        onClick={() => createTodo({ variables: { task: 'walk the dog' } })}
      >
        ADD
      </Button>
      {!error && loading ? (
        <div>Loading...</div>
      ) : data && data.todos ? (
        <ul>{RenderTodos(data.todos)}</ul>
      ) : (
        <div>NADA</div>
      )}
    </div>
  );
}

export default App;
