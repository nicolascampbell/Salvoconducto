import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Box, Fade, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import useMediaQuery from '@mui/material/useMediaQuery'
import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
import Masonry from '@mui/lab/Masonry'
import { useKeyPress } from 'hooks/useKeyPress'

import NavbarBrand from './NavbarBrand'

const MenuItem = ({ openMenu, customClassName, transitionDelay, navigateAndClose, isCurrentRoute, routeName }) => (
  <Zoom in={openMenu} style={{ transitionDelay: transitionDelay }}>
    <Nav.Link
      onClick={navigateAndClose}
      className={`${customClassName} ${isCurrentRoute ? 'current-route' : ''}`}
      style={{lineHeight:0}}
    >
      <Typography variant='h5' noWrap>
        {routeName}
      </Typography>
      <Typography variant='caption' fontSize={'x-small'} fontWeight={'300'} visibility={isCurrentRoute ? 'visible' : 'hidden'}>You are here</Typography>
    </Nav.Link>
  </Zoom>
)
export const NavbarMenu = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const escPress = useKeyPress('Escape')
  const router = useRouter()
  const matchesSmallDevices = useMediaQuery('(max-width:768px)')
  const getLink = (path) => `${router.basePath}${path}`
  function handleOpenMenu(shouldOpen) {
    if (shouldOpen) document.body.classList.add('scroll-lock')
    else document.body.classList.remove('scroll-lock')
    setOpenMenu(shouldOpen)
  }
  React.useEffect(() => {
    if (openMenu) handleOpenMenu(false)
  }, [escPress])
  function navigateAndClose(route) {
    router.push(getLink(route)).then(() => handleOpenMenu(false))
  }
  return (
    <React.Fragment>
      <Fade in={openMenu}>
        <div className="background"></div>
      </Fade>
      <Navbar bg="light"
        className={`custom-navbar ${openMenu ? 'open' : 'close'}`}>
        <Navbar.Brand onClick={() => navigateAndClose('/')} className="mx-2">
          <NavbarBrand />
        </Navbar.Brand>
        <div
          className={`menu ${openMenu ? 'isOpen' : 'isClosed'}`}
          onClick={() => handleOpenMenu(!openMenu)}
        >
          <span className="menu-title me-2 open ">Menu</span>
          <span className="menu-title me-2 close">Close</span>
          <div className="menu-detail"></div>
        </div>
        <Slide direction="up" in={openMenu}>
          <div className="menu-socials mb-3 me-3 ">
            <div >
              <span>conducto.photography#proton.me</span>
            </div>
          </div>
        </Slide>
        <Fade in={openMenu} unmountOnExit>
          <Box
            sx={{ width: matchesSmallDevices ? '100%' : '60%', maxWidth: 600 }}
            className={'menu-items'}
          >
            <MenuItem
              openMenu={openMenu}
              customClassName='home'
              transitionDelay={'25ms'}
              navigateAndClose={() => navigateAndClose('/')}
              isCurrentRoute={router.pathname.slice(1) === ''}
              routeName={'Home'} />
            <MenuItem
              openMenu={openMenu}
              customClassName='about'
              transitionDelay={'0ms'}
              navigateAndClose={() => navigateAndClose('/about')}
              isCurrentRoute={router.pathname.slice(1) === 'about'}
              routeName={'About'} />
            <MenuItem
              openMenu={openMenu}
              customClassName='collections'
              transitionDelay={'50ms'}
              navigateAndClose={() => navigateAndClose('/collections')}
              isCurrentRoute={router.pathname.includes('collections')}
              routeName={'Collections'} />
            <MenuItem
              openMenu={openMenu}
              customClassName='miscellaneous'
              transitionDelay={'75ms'}
              navigateAndClose={() => navigateAndClose('/miscellaneous')}
              isCurrentRoute={router.pathname.slice(1) === 'miscellaneous'}
              routeName={'Miscellaneous'} />
          </Box>
        </Fade>
      </Navbar>
    </React.Fragment>
  )
}
export default NavbarMenu
