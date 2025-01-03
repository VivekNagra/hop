import { Box } from '@chakra-ui/react';

import { IconsList } from '@shangrila-cargo/constant';

import { IconProps } from './Icon.types';

export const Icon = ({
  name,
  width,
  height,
  color = 'primary.800',
  cursor,
  onClick,
}: IconProps) => {
  const ActiveIcon = IconsList[name];

  if (!ActiveIcon) return null;

  return (
    <Box
      sx={{
        svg: {
          width,
          height,
        },
      }}
      color={color}
      onClick={onClick}
      cursor={cursor}
    >
      <ActiveIcon />
    </Box>
  );
};
