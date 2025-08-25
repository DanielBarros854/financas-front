import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress
} from '@mui/material'

export interface FormField {
  name: string
  label: string
  type: 'text' | 'number' | 'date' | 'email' | 'password'
  required?: boolean
  step?: number
  min?: number
  multiline?: boolean
  rows?: number
}

interface FormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  submitText: string
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
}

export default function FormModal({
  open,
  onClose,
  onSubmit,
  title,
  submitText,
  loading = false,
  disabled = false,
  children
}: FormModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box pt={1}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={disabled || loading}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            submitText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
