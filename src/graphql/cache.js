import gql from 'graphql-tag';

export const CREATE_TODO = gql`
  mutation createTodo($id: Int!, $task: String!, $completed: Boolean!) {
    createTodo(id: $id, task: $task, completed: $completed) @client
  }
`;

export const GET_TODO = gql`
  {
    newTodo @client {
      id
      task
      completed
    }
  }
`;

export const resolvers = {
  Mutation: {
    createTodo: (_, { id, task, completed }, { cache }) => {
      const newTodo = {
        __typename: 'Todo',
        id,
        task,
        completed
      };
      const data = { newTodo };
      cache.writeData({ data });
      return null;
    }
  }
};
