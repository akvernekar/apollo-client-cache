import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_TODOS, CREATE_TODO } from '../graphql/cache';
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import Todo from './Todo';

// A style sheet
const buttonStyles = makeStyles({
  outlinedPrimary: {
    marginTop: 29,
    marginLeft: 10,
    color: '#00CC00',
    borderColor: '#00CC00'
  },
  outlinedSecondary: {
    color: '#CC0000',
    borderColor: '#CC0000',
    marginTop: 28,
    marginLeft: '1rem'
  }
});
const paperStyles = makeStyles({
  root: {
    width: '20rem',
    padding: '1rem',
    marginTop: '1rem',
    '&$disabled': {
      color: 'red'
    }
  }
});

function App() {
  const [createTodo] = useMutation(CREATE_TODO);
  const { loading, error, data } = useQuery(GET_TODOS);
  const [form, setForm] = React.useState({ task: '' });
  const [submitFlag, submit] = React.useState(false);
  const btnClass = buttonStyles();
  const pprClass = paperStyles();

  const RenderTodos = todos =>
    todos.map(todo => (
      <Todo pprClass={pprClass} btnClass={btnClass} {...todo} />
    ));

  React.useEffect(() => {
    setForm({ task: '' });
  }, [submitFlag]);

  const submitHandler = async () => {
    if (form.task) {
      await createTodo({ variables: { task: form.task } });
      submit(!submitFlag);
    }
  };

  return (
    <Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          <TextField
            name="task"
            placeholder="Add Todo Task"
            label="Task"
            value={form.task}
            onChange={e => setForm({ task: e.target.value })}
            margin="normal"
          />
          <Button
            variant="outlined"
            className={btnClass.outlinedPrimary}
            onClick={submitHandler}
          >
            ADD
          </Button>
        </Grid>
        {!error && loading ? (
          <div>Loading...</div>
        ) : data && data.todos ? (
          <div>{RenderTodos(data.todos)}</div>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default App;
