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
    },
    'main_header': {
      width: '100%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '4em',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    },
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
    },
    download: {
      appearance: 'none',
      border: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      background: 'black',
      color: '#9DDEB7',
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
