import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material'

interface DeleteConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  itemName?: string
  loading?: boolean
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar Exclusão',
  message = 'Tem certeza que deseja excluir este item?',
  itemName,
  loading = false
}: DeleteConfirmDialogProps) {
  const displayMessage = itemName
    ? `${message} "${itemName}"`
    : message

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box>
        <DialogTitle sx={{ paddingTop: 3 }}>
          <Box display="flex" alignItems="center" gap={1}>
            {title}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            {displayMessage}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '0 26px 26px 0' }}>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              'Excluir'
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
