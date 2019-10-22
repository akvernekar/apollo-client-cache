import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';

const CREATE_TODO = gql`
  mutation createTodo($id: Int!, $task: String!, $completed: Boolean!) {
    createTodo(id: $id, task: $task, completed: $completed) @client
  }
`;

const GET_TODO = gql`
  {
    newTodo @client {
      id
      task
      completed
    }
  }
`;

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
