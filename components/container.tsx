import React, { FC } from 'react'
import { Flex } from 'rebass'


interface ContainerProps {
  justifyContent?: string
  pt?: number,
  pb?: number,
  pr?: number,
  pl?: number
}

const Container: FC<ContainerProps> = props => {
  Container.defaultProps = {
    justifyContent: '',
    pt: 0,
    pb: 0,
    pr: 0,
    pl: 0
  };

  return (
    <Flex justifyContent="center" css={{ width: '100%' }}>
      <Flex pt={props.pt} pb={props.pb} pr={props.pr} pl={props.pl} justifyContent={props.justifyContent} flexWrap='wrap' css={{ width: '1250px' }}>
        {props.children}
      </Flex>
    </Flex>
  )
}

export default Container
