import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';

const CREATE_PERSON = gql`
  mutation createPerson($id: Int!, $name: String!) {
    createPerson(id: $id, name: $name) @client
  }
`;

const GET_PERSON = gql`
  {
    newPerson @client {
      id
      name
    }
  }
`;

function App() {
  const [createPerson] = useMutation(CREATE_PERSON);
  const { loading, error, data } = useQuery(GET_PERSON);

  console.log('data', data);

  return (
    <div>
      <Button
        onClick={() => createPerson({ variables: { id: 1, name: 'Gabe' } })}
      >
        ADD
      </Button>
      {!error && loading ? (
        <div>Loading...</div>
      ) : data && data.newPerson ? (
        <div>{`${data.newPerson.id}: ${data.newPerson.name}`}</div>
      ) : (
        <div>NADA</div>
      )}
    </div>
  );
}

export default App;
