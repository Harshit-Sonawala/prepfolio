import { IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type DeleteIconButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'small' | 'medium' | 'large';
};

function DeleteIconButton({ onClick, size = 'medium' }: DeleteIconButtonProps) {
  return (
    <IconButton
      size={size}
      onClick={onClick}
      sx={{
        color: 'text.secondary',
        transition: 'all 0.1s ease',
        '&:hover': {
          color: 'error.main',
        },
        '&:active': {
          bgcolor: 'error.main',
          color: 'white',
        },
      }}
    >
      <CloseRounded fontSize={size === 'small' ? 'small' : 'medium'} />
    </IconButton>
  );
}

export default DeleteIconButton;
