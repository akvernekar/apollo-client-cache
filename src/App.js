import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TODO, CREATE_TODO } from './graphql/cache';
import Button from '@material-ui/core/Button';

function App() {
  const [createTodo] = useMutation(CREATE_TODO);
  const { loading, error, data } = useQuery(GET_TODO);

  console.log('data', data);

  return (
    <div>
      <Button
        onClick={() =>
          createTodo({
            variables: { id: 1, task: 'walk the dog', completed: false }
          })
        }
      >
        ADD
      </Button>
      {!error && loading ? (
        <div>Loading...</div>
      ) : data && data.newTodo ? (
        <div>{`${data.newTodo.id}: ${data.newTodo.task} - completed: ${data.newTodo.completed}`}</div>
      ) : (
        <div>NADA</div>
      )}
    </div>
  );
}

export default App;
