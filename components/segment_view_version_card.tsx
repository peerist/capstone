import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Text } from 'rebass'

const CardContainer = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid black;
  cursor: pointer;
  padding: 10px;
`;

interface SegmentViewVersionCardProps {
  version: number
  text: string
  current_version: number
  updateFn(any): null
}

const SegmentViewVersionCard: FC<SegmentViewVersionCardProps> = props => {

  return (
    <CardContainer onClick={() => props.updateFn(props.version)} style={{backgroundColor: `${props.version === props.current_version ? '#ccedda' : '#fafafa'}` }}>
      <Text style={{ color: '#545454' }}>
        Version: {props.version}.0
      </Text>
      <hr/>
      <Text style={{ fontSize: '14px', height: '140px', overflow: 'hidden' }}>
        {props.text}
      </Text>
    </CardContainer>
  )
}

export default SegmentViewVersionCard
