import { Flex } from '@chakra-ui/react';
import { UserIcon } from '@shangrila-cargo/assets/svgs';
import { AnalyticsReportEnum } from '@shangrila-cargo/enums';

const BaseIconContainer = ({
  bgColor,
  borderColor,
  children,
}: BaseIconContainerPropsTypes) => {
  return (
    <Flex
      rounded={'lg'}
      border={'1px solid'}
      borderColor={borderColor}
      bg={bgColor}
      placeItems={'center'}
      p={3}
    >
      {children}
    </Flex>
  );
};

export const SwitchIcon = ({ caseValue }: SwitchIconPropsTypes) => {
  switch (caseValue) {
    case AnalyticsReportEnum?.CUSTOMER?.toLowerCase():
      return (
        <BaseIconContainer borderColor="purpleDark" bgColor="purpleLight">
          <UserIcon
            style={{
              fill: 'purpleDark',
              stroke: 'purpleDark',
            }}
          />
        </BaseIconContainer>
      );

    default:
      return <p>No greeting available</p>;
  }
};

type BaseIconContainerPropsTypes = {
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
};

type SwitchIconPropsTypes = { caseValue: string };
