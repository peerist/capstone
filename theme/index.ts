import preset from '@rebass/preset'

export default {
  ...preset,
  text: {
    heading: {
      fontSize: '32px',
      fontWeight: 'bold'
    },
    'app_segments_header': {
      color: 'black',
      fontSize: '32px'
    }
  },
  buttons: {
    primary: {
      appearance: 'none',
      border: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      background: 'black',
      color: 'white',
      fontSize: '16px',
      px: '16px',
      py: '10px',
      fontWeight: 'bold',
      borderRadius: '7px',
      cursor: 'pointer'
    }
  },
  variants: {
    'segment_card': {
      p: 2,
      pl: 4,
      mt: 3,
      bg: 'background',
      boxShadow: 'card',
      borderRadius: 5,
      height: '80px',
      fontWeight: 'bold',
      fontSize: '20px',
      alignItems: 'center'

    },
    'paper_card': {
      p: 2,
      pl: 4,
      mt: 3,
      bg: 'background',
      boxShadow: 'card',
      borderRadius: 5,
      height: '80px',
      fontWeight: 'bold',
      fontSize: '20px',
      alignItems: 'center'
    }
  }
}
