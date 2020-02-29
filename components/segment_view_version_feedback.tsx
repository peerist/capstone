import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Box, Text } from 'rebass'

const CardContainer = styled(Box)`
  font-style: italic;
  font-size: 14px;
  color: #545454;
`;

interface SegmentViewVersionFeedbackProps {
  text: string
}

const SegmentViewVersionFeedback: FC<SegmentViewVersionFeedbackProps> = props => {

  return (
    <CardContainer>
      <Text p={3}>
        {props.text}
      </Text>
      <hr/>
    </CardContainer>
  )
}

export default SegmentViewVersionFeedback
