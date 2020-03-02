import React, { FC } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Box } from 'rebass'
import { Manager, Reference, Popper } from 'react-popper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock, faPen, faUserEdit } from '@fortawesome/free-solid-svg-icons'

interface SegmentCardActivePopoverProps {
  icon_status: number
  current_status: number
  icon: string
  text: string
}

const PopoverIconHolder = styled.div`
  div:last-child {
    visibility: hidden;
    height: 25px;
    background-color: black;
    color: white;
    border-radius: 10px;
    font-size: 12px;
    padding: 5px 10px 5px 10px;
    margin-bottom: 15px;
    display: flex;
    flex-wrap: nowrap;
  }

  div:last-child:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-top: solid 10px black;
    border-left: solid 10px transparent;
    border-right: solid 10px transparent;
    border-radius: 2px;
  }

  :hover div:last-child {
    visibility: visible;
  }
`;

const IconTable = {
  'clock': faUserClock,
  'pen': faPen,
  'edit': faUserEdit
};

const SegmentCardActivePopover: FC<SegmentCardActivePopoverProps> = props => {
  return (
    <Box width={0.1} style={{ textAlign: 'center' }}>
      {props.current_status === props.icon_status
        ? <PopoverIconHolder>
            <Manager>
              <Reference>
                {({ ref }) => (
                  <div ref={ref}>
                    <FontAwesomeIcon style={{ fontSize: '24px', color: '#9DDEB7' }} icon={IconTable[props.icon]} />
                  </div>
                )}
              </Reference>
              <Popper placement="top">
                {({ ref, style, placement }) => (
                  <div ref={ref} style={style} data-placement={placement}>
                    {props.text}
                  </div>
                )}
              </Popper>
            </Manager>
          </PopoverIconHolder>
        : <FontAwesomeIcon style={{ fontSize: '24px', color: '#d9d9d9' }} icon={IconTable[props.icon]} />
      }
    </Box>
  )
}

export default SegmentCardActivePopover
