import {
  Button,
  CheckboxIcon,
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { Fragment, KeyboardEvent, useEffect, useState } from "react";
import SafeLogin from "../../api/SafeLogin";
import { Data } from "../../api/types";
import Plot from "./Plot";

const N_TRIES = 3;

type KeyDistance = { distance: number; timePressed: number };

type KeyDistances = Array<KeyDistance>;

const Demo: React.FC = () => {
  const [keyDistance, setKeyDistance] = useState<KeyDistances>([]);
  const [tries, setTries] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [safeLogin, setSafeLogin] = useState(new SafeLogin());
  const [testingData, setTestingData] = useState<Data>([]);
  const [demoDescription, setDemoDescription] = useState(
    "Type your password 3 times"
  );
  const [buttonLabel, setButtonLabel] = useState("Submit");
  const [probability, setProbability] = useState<number | undefined>(undefined);

  useEffect(() => {
    console.log(safeLogin.getHistoricalData());
  });
  const handlePasswordChange = (e: React.ChangeEvent<any>) => {
    const lastTimePressed =
      keyDistance[keyDistance.length - 1]?.timePressed || Date.now();

    const newKey: KeyDistance = {
      distance: Date.now() - lastTimePressed,
      timePressed: Date.now(),
    };

    setKeyDistance([...keyDistance, newKey]);
    setPassword(e.currentTarget.value);
  };

  const submitPassword = () => {
    keyDistance.shift();

    if (tries >= N_TRIES) {
      setProbability(
        safeLogin.verifyUser(keyDistance.map((key) => key.distance))
      );
      setTestingData(keyDistance.map((key) => key.distance));
    } else {
      safeLogin.addHistoricalData(keyDistance.map((key) => key.distance));
      // decrement tries
    }

    setTries(tries + 1);

    // clear password
    setPassword("");
    // clear key distance data
    setKeyDistance([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitPassword();
    }
  };
  useEffect(() => {
    const triesText = [
      { description: "Type your password 3 times", button: "Submit" },
      { description: "Awesome, now 2 more times", button: "Submit" },
      { description: "Last one...", button: "Submit" },
      {
        description:
          "Now let's test! Type your password as if you were reading it off a post-it note for the first time",
        button: "Test",
      },
    ];

    if (tries >= 4) {
      setDemoDescription("Great! You can try multiple times if you want!");
      setButtonLabel("Test Again");
      return;
    }

    setDemoDescription(triesText[tries].description);
    setButtonLabel(triesText[tries].button);
  }, [tries]);

  const renderProbability = () => {
    if (!probability) return null;
    let imageSrc = "";

    if (probability >= 0.7) {
      imageSrc = "/images/true.svg";
    } else if (probability < 0.7 && probability >= 0.5) {
      imageSrc = "/images/unsure.svg";
    } else {
      imageSrc = "images/false.svg";
    }

    const percentage = (probability * 100).toFixed(2) + "%";
    return (
      <Grid templateColumns={"2fr 9fr"}>
        <Image src={imageSrc}></Image>
        <Stack>
          <Text fontFamily={"Montserrat"} fontWeight="bold" margin="0">
            Probability you are the account's owner:
          </Text>
          <Text
            fontFamily={"Montserrat"}
            fontWeight="extrabold"
            fontSize={30}
            margin="0"
            position={"relative"}
            top="-12px"
          >
            {percentage}
          </Text>
        </Stack>
      </Grid>
    );
  };

  return (
    <Grid placeItems={"center"}>
      <Stack maxW={"700px"} alignItems="center" spacing={4}>
        <Stack textAlign={"center"} alignItems="center" margin="30px">
          <Image src="/images/lock.png" w="80px"></Image>
          <Text fontFamily={"Montserrat"} fontWeight="700" color="#eee">
            CS 109 Challenge | Artur B. Carneiro
          </Text>
          <Text
            as={"h1"}
            fontFamily={"Montserrat"}
            fontWeight="800"
            fontSize={"36px"}
          >
            Making the Internet a safer place
          </Text>
        </Stack>

        <Stack noOfLines={2} width="80%" textAlign={"center"}>
          <Text
            fontFamily={"Montserrat"}
            fontWeight="600"
            fontSize={17}
            textAlign="center"
          >
            {demoDescription}
          </Text>
        </Stack>
        <Grid templateColumns={"4fr 1fr"} gap={3} width="100%">
          <FormControl>
            <Input
              placeholder="Type in your password..."
              onChange={handlePasswordChange}
              value={password}
              type="password"
              backgroundColor={"#262626"}
              color="white"
              border="none"
              _focus={{ boxShadow: "none", backgroundColor: "#484848" }}
              size="lg"
              borderRadius="10px"
              onKeyDown={handleKeyDown}
            />
            <FormHelperText>
              Don't worry, your password won't be saved in any way
            </FormHelperText>
          </FormControl>
          <Button
            leftIcon={<CheckboxIcon />}
            onClick={submitPassword}
            size="lg"
            color="black"
            textTransform={"uppercase"}
            borderRadius="10px"
            fontSize={"16px"}
            fontWeight={"800"}
            background={"#fff"}
          >
            {buttonLabel}
          </Button>
        </Grid>

        {probability && renderProbability()}

        {safeLogin.getHistoricalData().length && (
          <Plot
            data={safeLogin.getHistoricalData()}
            testing_data={testingData}
          />
        )}
      </Stack>
    </Grid>
  );
};

export default Demo;
