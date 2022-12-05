import { Text } from "@chakra-ui/react";
import { Fragment } from "react";
import Demo from "../Demo";

const Hero: React.FC = () => {
  return (
    <Fragment>
      <Text as={"h1"}>Making the internet a safer place</Text>

      <Demo />
    </Fragment>
  );
};

export default Hero;
