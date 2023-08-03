import { Stack, Typography } from '@mui/material'
import React, { Children } from 'react'

const Definition = ({
  title,
  subtitle,
  type,
  definitions,
  children,
  classes,
  whiteBg=false
}) => {
  return (
    <Stack className={`definition ${classes}`} sx={{background:'white'}}> 
      <Typography variant="h3" className="title responsive-title">
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
  )
}

export default Definition
