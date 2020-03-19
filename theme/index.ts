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
    'noCursorText': {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none'
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
  'buttonSearch':{
    display: 'flex',
    WebkitAlignItems: 'center',
    WebkitBoxAlign: 'center',
    msFlexAlign: 'center',
    alignItems: 'center',
    WebkitBoxPack: 'center',
    WebkitJustifyContent: 'center',
    msFlexPack: 'center',
    justifyContent: 'center',
    padding: '0',
    fontSize: '20px',
    width: '3em',
    height: '3em',
    background: '#9DDEB7',
    border: 'none',
    boxShadow: '0px 0px 21px #9DDEB7FF',
    borderRadius: '100px',
    ':hover': {
      background: 'black',
      color: 'white'
    }
  },
    mainBody:{
      width: '100%',
      padding: '2em',
      display: 'flex',
      WebkitFlexBasis: '860px'
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
  },

  forms: {
    'mainSearch': {
      width: 'auto',
      WebkitBoxFlex: '1',
      WebkitFlexGrow: '1',
      msFlexPositive: '1',
      flexGrow: '1',
      padding: '1em 2em',
      fontSize: '18px',
      borderRadius: '100px',
      marginRight: '1em',
      border: 'none',
      boxShadow: '0px 0px 21px rgba(0,0,0,0.15)'
},
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
