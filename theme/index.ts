import preset from '@rebass/preset'

export default {
  ...preset,
  text: {
    heading: {
      fontFamily: 'inherit'
    },
    'app_segments_header': {
      color: 'black',
      fontSize: '32px'
    },
    'noCursorText': {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
    }
  },
  variants: {
    'link_btn_primary': {
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
    'link_btn_secondary_active': {
      appearance: 'none',
      border: '3px solid black',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      background: 'white',
      color: 'black',
      fontSize: '16px',
      px: '16px',
      py: '10px',
      fontWeight: 'bold',
      borderRadius: '7px',
      cursor: 'pointer',
      ':hover': {
        background: 'black',
        color: 'white'
      }
    },
    'link_primary': {
      fontWeight: 'bold',
      color: 'black',
      fontSize: '16px',
      textDecoration: 'none',
      margin: '0 3em 0 0',
      cursor: 'pointer'
    },
    'link_dashboard_btn': {
      background: '#9DDEB7',
      borderRadius: '20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      textAlign: 'center',
      textDecoration: 'none',
      color: 'black',
      padding: '20px'
    },
    'app_header_link': {
      marginRight: '30px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '20px',
      textDecoration: 'none'
    }
  }
}
