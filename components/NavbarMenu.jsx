import React from 'react'
import { useRouter } from 'next/router'
import { Box, Fade, Stack, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
import { useKeyPress } from 'hooks/useKeyPress'
import { ModeSwitcher } from './ModeSwitcher'
import NavbarBrand from './NavbarBrand'

const MenuItem = ({ openMenu, customClassName, transitionDelay, navigateAndClose, isCurrentRoute, routeName }) => (
  <Zoom in={openMenu} style={{ transitionDelay: transitionDelay }}>
    <Box
      onClick={navigateAndClose}
      className={`nav-link ${customClassName} ${isCurrentRoute ? 'current-route' : ''}`}
      style={{ lineHeight: 0 }}
    >
      <Typography variant='h5' noWrap>
        {routeName}
      </Typography>
      <Typography variant='caption' fontSize={'x-small'} fontWeight={'300'} visibility={isCurrentRoute ? 'visible' : 'hidden'}>You are here</Typography>
    </Box>
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
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        className={`custom-navbar ${openMenu ? 'open' : 'close'}`}>
        <div onClick={() => navigateAndClose('/')} className="mx-2">
          <NavbarBrand />
        </div>
        <div
          className={`menu ${openMenu ? 'isOpen' : 'isClosed'}`}
          onClick={() => handleOpenMenu(!openMenu)}
        >
          <span className="menu-title me-2 open ">Menu</span>
          <span className="menu-title me-2 close">Close</span>
          <div className="menu-detail"></div>
        </div>
        <Slide direction="up" in={openMenu}>
          <Box className='menu-socials' m={3}>
            <span>conducto.photography#proton.me</span>
          </Box>
        </Slide>
        <Slide direction="up" in={openMenu}>
          <Box className='mode-switcher' m={3}>
            <ModeSwitcher />
          </Box>
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
      </Stack>
    </React.Fragment>
  )
}
export default NavbarMenu
