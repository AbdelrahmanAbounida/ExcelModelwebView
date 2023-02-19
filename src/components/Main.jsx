import { styled } from '@mui/material/styles';
import {Container} from '@mui/material'

const Main = styled(Container)(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(4),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor:theme.palette.secondary.main,
      }),
    }),
  );

export default Main