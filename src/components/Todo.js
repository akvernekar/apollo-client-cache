import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_TODO, UPDATE_TODO } from '../graphql/cache';
import { Paper, TextField, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const TodoButton = styled(Button)({
  marginRight: '1rem',
  marginTop: '1rem'
});

const StyledPaper = styled(Paper)({
  backgroundColor: props => props.isDisabled && '#ededed'
});

export default function Todo({ pprClass, btnClass, id, task, completed }) {
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [form, setForm] = React.useState({ upTask: task });

  return (
    <StyledPaper className={pprClass.root} isDisabled={completed} key={id}>
      <p>{`Task: ${task}`}</p>
      <p>{`Completed: ${completed}`}</p>
      {!completed && (
        <TextField
          name="update"
          placeholder="Update Todo Task"
          label="Update"
          value={form.upTask}
          onChange={e => setForm({ upTask: e.target.value })}
          margin="normal"
        />
      )}
      <Button
        variant="outlined"
        className={btnClass.outlinedSecondary}
        onClick={() => deleteTodo({ variables: { id } })}
      >
        DELETE
      </Button>
      {!completed && (
        <>
          <TodoButton
            variant="outlined"
            onClick={() =>
              updateTodo({
                variables: {
                  todo: { id, task: form.upTask, completed, __typename: 'Todo' }
                }
              })
            }
          >
            UPDATE
          </TodoButton>
          <TodoButton
            variant="outlined"
            onClick={() =>
              updateTodo({
                variables: {
                  todo: {
                    id,
                    task: form.upTask,
                    completed: true,
                    __typename: 'Todo'
                  }
                }
              })
            }
          >
            COMPLETE
          </TodoButton>
        </>
      )}
    </StyledPaper>
  );
}
