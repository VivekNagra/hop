import { VStack, Text } from '@chakra-ui/react';
import { PlaceholderProps } from './Dropzone.types';

const PlaceholderComponent: React.FC<PlaceholderProps> = ({ Heading }) => {
  return (
    <VStack rowGap={1}>
      <Text sx={{ fontSize: 'sm' }}>{Heading}</Text>
      <Text sx={{ fontSize: 'sm', fontWeight: 'semibold' }}>Or</Text>
      <Text
        sx={{ fontSize: 'sm', fontWeight: 'semibold' }}
        color={'secondary.400'}
      >
        Browse
      </Text>
    </VStack>
  );
};

export default PlaceholderComponent;
