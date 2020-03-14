import React, { FC } from 'react'
import TextLoop from "react-text-loop";
import { Flex, Text, Box } from 'rebass'

const MainHeader: FC<{}> = props => (
  <Flex justifyContent='center' css={{alignItems: 'center', width: '100%', background: 'black', height: '20em' }}>
    <Box p={5} css={{ WebkitFlexBasis:'1140px', width: '100%'}}>
      <Text variant='main_header'>
            <div>
              <TextLoop interval={5000}>
                  <span>Papers</span>
                  <span>Peer Reviews</span>
                  <span>Experiments</span>
                  <span>Datasets</span>
                  <span>Citations</span>
                  <span>Science</span>
              </TextLoop>{" "}
            </div>
        For everyone.
      </Text>
    </Box>
  </Flex>

)

export default MainHeader
