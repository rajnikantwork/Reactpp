import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        marginTop:40,
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);
interface Props {
    limit: number; 
    page: number;
    updatePage:Function
}
export default function PaginationControlled({limit, page, updatePage}: Props) {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      updatePage(event, value)
  };

  return (
    <div className={classes.root}>
      <Pagination count={limit} page={page} onChange={handleChange} />
    </div>
  );
}
