import React, { FC } from 'react'
import { Box } from 'rebass'

interface DividerProps {
  mt?: number,
  mb?: number,
  mr?: number,
  ml?: number
}

const Divider: FC<DividerProps> = props => {
  Divider.defaultProps = {
    mt: 0,
    mb: 0,
    mr: 0,
    ml: 0
  };

  return (
    <Box as='hr' mt={props.mt} mb={props.mb} mr={props.mr} ml={props.ml} width={1} sx={{bg: 'gray', border: 0, height: 2}} />
  )
}

export default Divider
