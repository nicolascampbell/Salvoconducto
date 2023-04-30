import React from 'react'

import { useRouter } from 'next/router'
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Box
} from '@mui/material'
import {
  North as ArrowUpwardIcon,
  KeyboardReturn as KeyboardReturnIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  BakeryDining as BakeryDiningIcon
} from '@mui/icons-material'
import useLocalStorage from 'use-local-storage'
import produce from 'immer'

export const FilmQuickActions = ({
  goBackAction,
  nextFilmKey,
  prevFilmKey
}) => {
  const router = useRouter()
  const [seenFilms, setSeenFilms] = useLocalStorage('configSeenFilms', [])
  function handleSetSeenFilms(key) {
    setSeenFilms(
      produce((draft) => {
        draft.push(key)
      })
    )
  }
  function handlePushToFilm(key) {
    router.push({
      pathname: '/films/[key]',
      query: {
        key: key
      }
    })
    handleSetSeenFilms(key)
  }
  function handleScrollTop() {
    if (window)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
  }
  const actions = [
    { icon: <ArrowUpwardIcon />, name: 'Top', onClick: handleScrollTop },
    { icon: <KeyboardReturnIcon />, name: 'Back', onClick: goBackAction },
    {
      icon: <ArrowLeftIcon />,
      name: 'Previous',
      onClick: () => handlePushToFilm(prevFilmKey)
    },
    {
      icon: <ArrowRightIcon />,
      name: 'Next',
      onClick: () => handlePushToFilm(nextFilmKey)
    }
  ]
  return (
    <Box
      sx={{
        height: 320,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        right: 0
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<BakeryDiningIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}
