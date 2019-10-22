// import gql from 'graphql-tag';

// export const typeDefs = gql`
//   type Person {
//     id: Int!
//     name: String!
//   }
//   type Query {
//     getPerson: Person
//   }
//   type Mutation {
//     createPerson(id: int!, name: String!): Person
//   }
// `;

// const query = gql`
//   query getPerson {
//     Person @client {
//       id
//       name
//     }
//   }
// `;

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
