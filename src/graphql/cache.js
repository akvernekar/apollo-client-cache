import gql from 'graphql-tag';
const shortid = require('shortid');

export const typeDefs = gql`
  type Todo {
    id: Int!
    task: String!
    completed: Boolean!
  }
  type Todos {
    todos: [Todo]
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($id: Int!, $task: String!, $completed: Boolean!) {
    createTodo(id: $id, task: $task, completed: $completed) @client
  }
`;
export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) @client
  }
`;
export const UPDATE_TODO = gql`
  mutation updateTodo($todo: Todo!) {
    updateTodo(todo: $todo) @client
  }
`;

export const GET_TODOS = gql`
  {
    todos @client {
      id
      task
      completed
    }
  }
`;

const query = gql`
  query GetTodos {
    todos @client {
      id
      task
      completed
    }
  }
`;

export const resolvers = {
  Mutation: {
    createTodo: (_, { task }, { cache }) => {
      const newTodo = {
        __typename: 'Todo',
        id: shortid.generate(),
        task,
        completed: false
      };

      try {
        const { todos } = cache.readQuery({ query });
        const data = { todos: [...todos, newTodo] };
        cache.writeData({ data });
        return null;
      } catch {
        const data = { todos: [newTodo] };
        cache.writeData({ data });
        return null;
      }
    },
    deleteTodo: (_, { id }, { cache }) => {
      const { todos } = cache.readQuery({ query });
      const data = { todos: todos.filter(todo => todo.id !== id) };
      cache.writeData({ data });
      return null;
    },
    updateTodo: (_, { todo }, { cache }) => {
      const { todos } = cache.readQuery({ query });
      const data = {
        todos: todos.map(cachedTodo =>
          cachedTodo.id === todo.id ? todo : cachedTodo
        )
      };
      cache.writeData({ data });
      return null;
    }
  }
};
