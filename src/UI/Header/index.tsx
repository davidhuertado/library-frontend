import React from 'react';
import User from '../../App';
import { Box, Flex, Heading } from '@chakra-ui/react';
import App from '../../App';

interface HeaderProps {
  title: string;
  rightSlot?: React.ReactNode;
}

const Header = ({ title, rightSlot }: HeaderProps) => {
  return (
    <Flex
      px="5"
      py="3"
      w="100%"
      background="rgba(0,0,0,0.7)"
      alignItems="center"
    >
      <Box>
        <Heading color="#fff">{title}</Heading>
      </Box>
      <Box m="0 0 0 auto">{rightSlot}</Box>
    </Flex>
  );
};

export default Header;
