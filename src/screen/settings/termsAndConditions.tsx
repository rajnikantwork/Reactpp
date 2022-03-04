import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: "#fff",
      padding: 20,
      '& h5':{
          margin: '0 0 15px 0',
          fontWeight: theme.typography.fontWeightBold
      },
      '& p':{
          marginBottom: '10px'
      }
    },
  })
);
function TermsAndConditions() {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography variant="h5">Terms & Conditions</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quasi
        sint odio tenetur esse totam ex modi? Voluptatem magni id autem,
        obcaecati repellat nemo dolores nisi cumque, qui est nobis ipsam placeat
        inventore itaque blanditiis voluptas assumenda doloremque vel rerum
        soluta corporis fugit quibusdam. Quo est deserunt deleniti, qui
        assumenda quod tenetur pariatur voluptatibus velit commodi officia
        excepturi corporis molestias distinctio saepe alias dolorem. Perferendis
        explicabo deleniti enim corporis dicta ab, eius neque modi beatae. Fugit
        nemo ab maxime. Officiis aliquid, in aperiam, hic nulla modi ipsum est
        illum maxime quo, excepturi cum deleniti dolorem nemo reiciendis minima
        eos similique!
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quasi
        sint odio tenetur esse totam ex modi? Voluptatem magni id autem,
        obcaecati repellat nemo dolores nisi cumque, qui est nobis ipsam placeat
        inventore itaque blanditiis voluptas assumenda doloremque vel rerum
        soluta corporis fugit quibusdam. Quo est deserunt deleniti, qui
        assumenda quod tenetur pariatur voluptatibus velit commodi officia
        excepturi corporis molestias distinctio saepe alias dolorem. Perferendis
        explicabo deleniti enim corporis dicta ab, eius neque modi beatae. Fugit
        nemo ab maxime. Officiis aliquid, in aperiam, hic nulla modi ipsum est
        illum maxime quo, excepturi cum deleniti dolorem nemo reiciendis minima
        eos similique!
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quasi
        sint odio tenetur esse totam ex modi? Voluptatem magni id autem,
        obcaecati repellat nemo dolores nisi cumque, qui est nobis ipsam placeat
        inventore itaque blanditiis voluptas assumenda doloremque vel rerum
        soluta corporis fugit quibusdam. Quo est deserunt deleniti, qui
        assumenda quod tenetur pariatur voluptatibus velit commodi officia
        excepturi corporis molestias distinctio saepe alias dolorem. Perferendis
        explicabo deleniti enim corporis dicta ab, eius neque modi beatae. Fugit
        nemo ab maxime. Officiis aliquid, in aperiam, hic nulla modi ipsum est
        illum maxime quo, excepturi cum deleniti dolorem nemo reiciendis minima
        eos similique!
      </Typography>
    </div>
  );
}

export default TermsAndConditions;
