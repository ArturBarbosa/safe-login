import { Code, Divider, Image, Stack, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { CopyBlock } from "react-code-blocks";

const Demo: React.FC = () => {
  return (
    <Stack alignItems={"center"} margin="50px 0">
      <Stack width={700}>
        <Divider></Divider>
        <Text
          as={"h3"}
          fontFamily="Montserrat"
          fontWeight="bold"
          fontSize={"21px"}
        >
          About the API
        </Text>
        <Text as={"p"}>
          Safe Login is an <i>concept</i>, open-source project designed for CS
          109: Probability for Computer Scientists, the coolest class at
          Stanford University. The aim of the API is to allow website developers
          to improve the security of their signin systems. The aim of the API is
          not to replace already established protocols. Instead, it serves as an{" "}
          <i>additional</i> layer to the authentication flow.
        </Text>
        <Text as={"p"}>
          The API registers the user's keystroke distance values when they type
          their password and saves this historical data. Later, when the user
          types their password again, the API checks the new datapoints against
          the historical data and returns the probability that the person behind
          the computer is who they say they are. With this information, the
          developer can choose to trigger an additional authentication step
          (e.g., MFA), send an e-mail about suspecious activity, etc.
        </Text>
        <Text
          as={"h3"}
          fontFamily="Montserrat"
          fontWeight="bold"
          fontSize={"21px"}
        >
          Get Started | Basic Usage
        </Text>
        <Text as={"p"}>
          First, import the library and initilize the <Code>SafeLogin</Code>{" "}
          class:
        </Text>
        <Image src="/images/getting-started.png" w={500}></Image>
        <Text as={"p"}>
          Next, capture the they keystroke length distance values when the user
          types in their password:
        </Text>
        <Image src="/images/add-historical-data.png" w={500}></Image>
        <Text as={"p"}>
          When a user tries to login, verify that they are the true account
          owner by calling the <Code>verifyUser</Code> function. This function
          should return a probability (a number between 0 and 1):
        </Text>
        <Image src="/images/get-probability.png" w={500}></Image>
        <br /> <br />
        <Text as={"p"}>
          We with ❤️ by Artur B. Carneiro. Lock logo made using{" "}
          <a href="https://openai.com/dall-e-2/">DALL-E 2</a>.
        </Text>
      </Stack>
    </Stack>
  );
};

export default Demo;
