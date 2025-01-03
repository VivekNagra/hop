import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Progress,
  Box,
  VStack,
} from '@chakra-ui/react';
import { useModalSearchParams } from '@shangrila-cargo/hooks/useModalSearchParams';
import { IPredictPatientResponse } from '@shangrila-cargo/feature/Patient/services/create-pateint';

const PredictionModal = ({ data }: { data: IPredictPatientResponse }) => {
  const { modalClose, shouldOpen } = useModalSearchParams();

  return (
    <>
      <Modal isOpen={shouldOpen('showPrediction')} onClose={modalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Diabetes Prediction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>Prediction Score: {data.score}</Text>
              <Text>Category: {data.category}</Text>
              <Box width="100%">
                <Progress
                  value={data.score}
                  size="lg"
                  colorScheme={
                    data.score < 30
                      ? 'green'
                      : data.score < 60
                        ? 'yellow'
                        : 'red'
                  }
                />
              </Box>
              <Text color="gray.500">
                A score below 30 indicates a normal prediction, between 30-59
                indicates pre-diabetes, and above 59 indicates a higher risk.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PredictionModal;
