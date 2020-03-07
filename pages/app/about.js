import React from 'react'
import { Flex, Text, Link } from 'rebass'

import AppHeader from '../../components/app_header'



const About = () => {
  return (
    <div>

    <AppHeader header={[{name: 'Home', dest: '/'}, {name: 'About Us', dest: '/about'}]}/>
    <Text css={{width: '100%', padding: '5%', textAlign: 'center', veticalAlign: 'middle'}}>
     Developed for Oregon State University EECS Capstone by Peerist Development Group
    </Text>

    </div>


  )
}

export default About
