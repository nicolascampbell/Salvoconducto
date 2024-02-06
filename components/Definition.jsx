import { Stack, Typography } from '@mui/material'
import React from 'react'

const Definition = ({
  title,
  subtitle,
  type,
  definitions,
  children,
  classes = '',
  action
}) => {
  return (
    <Stack
      className={`definition ${classes}`}
      alignItems={'end'}
      justifyContent={'space-between'}
      direction={'row'}
    >
      <Stack p={3}>
        <Typography variant="h3" >
          {title}
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          {subtitle}
        </Typography>
        <Typography variant="body2" className="type">
          {type}
        </Typography>
        <ol>
          {definitions.map((definition, index) => (
            <li key={index}> {definition}</li>
          ))}
          {children}
        </ol>
      </Stack>
      {action}
    </Stack>
  )
}

export default Definition
