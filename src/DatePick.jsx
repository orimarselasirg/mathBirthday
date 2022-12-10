import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import {
  Box,
  Center,
  Heading,
  Button,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import "./datepick.css";
import en from "date-fns/locale/en-US";
import { bodyModalText } from "./constans";
import swal from "sweetalert";
registerLocale("en", en);

function DatePick(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [number, setNumber] = useState(1);
  const [initialDate, setInitialDate] = useState(new Date());
  const [birth, setBirth] = useState(initialDate.toLocaleDateString());
  const [dateState, setDateState] = useState([]);

  const mathBirthday = (n) => {
    const date = 10 ** n;
    return date;
  };
  console.log(birth)

  const nextBirthday = (date, days) => {
    var nextBirthInDays = new Date(date).getDate() + days;
    if (nextBirthInDays === 100000001) {
      return swal({
        title: "warning",
        text: "I'm sorry, our calendar reach the world's end, we'll fix as soon as possible",
        icon: "Warning",
      });
    } else {
      var dateNextBirth = new Date().setDate(nextBirthInDays);
      return new Date(dateNextBirth).toLocaleDateString();
    }
  };

  const handleChange = (e) => {
    setInitialDate(e);
    const data = mathBirthday(number);
    setNumber(number + 1);
    setDateState([...dateState, nextBirthday(initialDate, data)]);
    setBirth(nextBirthday(initialDate, data));
  };
  return (
    <Box w="100%" minW="320px" h="100vh">
      <Stack direction="column" alignContent="center" alignItems="center">
        <Stack
          bg="#363636e0"
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          w="100%"
          h="110px"
        >
          <Heading as="h3" size="lg" color="white" textAlign="center">
            Please select a date to calculate your math birthday
          </Heading>
          <DatePicker
            className="react-datepicker__input-container"
            selected={initialDate}
            locale="en"
            onChange={(e) => handleChange(e)}
          />
        </Stack>
        {
          <div className="info-container">
            {dateState &&
              dateState.map((d) =>
                d === "Invalid Date" ? (
                  <Alert status="info">
                    <AlertIcon />
                    <AlertDescription>
                    I'm sorry, our calendar reach the world's end, we'll fix as soon as possible
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Card
                    margin={2}
                    boxShadow="0px 0px 15px -5px"
                    w="90%"
                    maxW="400px"
                    h="200px"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack spacing={3}>
                      <CardHeader>
                        <Center textAlign="center">
                          <Heading size="xs" textTransform="uppercase">
                            Your Math Birthday number {dateState.indexOf(d) + 1}
                            , will be
                            {<br />}
                            <Text color="red">{d}</Text>
                          </Heading>
                        </Center>
                      </CardHeader>
                      <CardBody>
                        <Text fontSize="xl" textAlign="center">
                          Is almost here, you must hurry up!!!
                        </Text>
                      </CardBody>
                    </Stack>
                  </Card>
                )
              )}
            <Stack w="100%" alignItems="flex-end">
              <Button
                onClick={onOpen}
                colorScheme="teal"
                borderRadius="100px"
                h="50px"
                w="50px"
              >
                Help
              </Button>
            </Stack>
          </div>
        }
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Math Birthday's Help</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign="justify">{bodyModalText}</Text>
            <br />
            <Text textAlign="center">Enjoy the App!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default DatePick;
