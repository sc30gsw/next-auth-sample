'use client'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import type { FormEvent } from 'react'
import React from 'react'

const LoginPage = () => {
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const email = data.get('email')
    const password = data.get('password')

    await signIn('credentials', {
      redirect: false,
      email: email,
      password,
    })
      .then((res) => {
        if (res?.error) {
          alert(res.error)
        }
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            label="password"
            name="password"
            autoComplete="current-password"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
                <Link href="#">Forgot password?</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link href="/register">{"Don't have an account? Sign Up"}</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
