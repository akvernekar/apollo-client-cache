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
    createPerson: (_, { id, name }, { cache }) => {
      const newPerson = {
        __typename: 'Person',
        id,
        name
      };
      const data = { newPerson };
      cache.writeData({ data });
      return null;
    }
  }
};
