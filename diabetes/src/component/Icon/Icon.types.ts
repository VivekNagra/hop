import { ResponsiveValue } from '@chakra-ui/react';

import { IconsList } from '@shangrila-cargo/constant';

export type IconProps = {
  name: IconNamesType;

  width?: ResponsiveValue<string | number>;
  height?: ResponsiveValue<string | number>;
  color?: string;
  cursor?: 'pointer' | 'not-allowed' | 'default';

  onClick?: () => void;
};

export type IconNamesType = keyof typeof IconsList;
