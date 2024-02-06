import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Box, Fade } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import useMediaQuery from '@mui/material/useMediaQuery'
import Slide from '@mui/material/Slide'
import Zoom from '@mui/material/Zoom'
import Masonry from '@mui/lab/Masonry'
import { useKeyPress } from 'hooks/useKeyPress'

import NavbarBrand from './NavbarBrand'
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
      <Navbar bg="light" className="custom-navbar">
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
              <span>conducto.photography_at_proton.me</span>
            </div>
          </div>
        </Slide>
        <Zoom in={openMenu} style={{ transitionDelay: '50ms' }}>
          <Box
            sx={{ width: matchesSmallDevices ? '100%' : '60%', maxWidth: 600 }}
            className="menu-items"
          >
            <Masonry columns={2} className="m-0">
              <Zoom in={openMenu} style={{ transitionDelay: '50ms' }}>
                <Nav.Link
                  onClick={() => navigateAndClose('/')}
                  style={{ height: '40%' }}
                  disabled={router.pathname.slice(1) === ''}
                >
                  {router.pathname.slice(1) === '' && (
                    <span className="navbar-route-whisperer">You are here</span>
                  )}
                  Home
                </Nav.Link>
              </Zoom>
              <Zoom in={openMenu}>
                <Nav.Link
                  onClick={() => navigateAndClose('/about')}
                  disabled={router.pathname.slice(1) === 'about'}
                >
                  {router.pathname.slice(1) === 'about' && (
                    <span className="navbar-route-whisperer">You are here</span>
                  )}
                  About
                </Nav.Link>
              </Zoom>
              {
                // <Zoom in={openMenu} style={{ transitionDelay: '100ms' }}>
                //   <Nav.Link
                //     onClick={() => navigateAndClose('/films')}
                //     disabled={router.pathname.slice(1) === 'films'}
                //     style={{ height: '60%' }}
                //   >
                //     {router.pathname.slice(1) === 'films' && (
                //       <span className="navbar-route-whisperer">You are here</span>
                //     )}
                //     Films
                //   </Nav.Link>
                // </Zoom>
              }
              <Zoom in={openMenu}>
                <Nav.Link
                  onClick={() => navigateAndClose('/collections')}
                  disabled={router.pathname.split('/')[1] === 'collections'}
                  style={{ height: '75%' }}
                >
                  {router.pathname.split('/')[1] === 'collections' && (
                    <span className="navbar-route-whisperer">You are here</span>
                  )}
                  Collections
                </Nav.Link>
              </Zoom>
              <Zoom in={openMenu} style={{ transitionDelay: '20ms' }}>
                <Nav.Link
                  onClick={() => navigateAndClose('/misc')}
                  disabled={router.pathname.slice(1) === 'misc'}
                  style={{ height: '52%' }}
                >
                  {router.pathname.slice(1) === 'misc' && (
                    <span className="navbar-route-whisperer">You are here</span>
                  )}
                  Miscellaneous
                </Nav.Link>
              </Zoom>
            </Masonry>
          </Box>
        </Zoom>
      </Navbar>
    </React.Fragment>
  )
}
export default NavbarMenu
