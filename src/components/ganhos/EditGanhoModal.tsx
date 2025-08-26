import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  CircularProgress
} from '@mui/material'
import { useGanhosService } from '@/services/ganhos'
import { GanhoInput, Ganho } from '@/graphql/types/ganhos'
import { showSuccess } from '@/utils/notifications'
import { handleError } from '@/utils/errorHandler'

interface EditGanhoModalProps {
  open: boolean
  ganho: Ganho | null
  onClose: () => void
}

interface FormData {
  name: string
  value: string
  date: string
}

export default function EditGanhoModal({ open, ganho, onClose }: EditGanhoModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    value: '',
    date: ''
  })
  const { handleUpdateGanho, updating } = useGanhosService()

  useEffect(() => {
    if (ganho) {
      setFormData({
        name: ganho.name,
        value: ganho.value.toString(),
        date: ganho.date.split('T')[0]
      })
    }
  }, [ganho])

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async () => {
    if (!ganho) return

    try {
      const ganhoData: GanhoInput = {
        name: formData.name,
        value: parseFloat(formData.value),
        date: formData.date
      }

      await handleUpdateGanho(ganho.id, ganhoData)
      showSuccess('Ganho atualizado com sucesso!')
      handleClose()
    } catch (error) {
      handleError(error)
    }
  }

  const handleClose = () => {
    onClose()
  }

  const isValid = formData.name.trim() !== '' && formData.value.trim() !== ''

  if (!ganho) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: '24px 0 16px 24px' }}>Editar Ganho</DialogTitle>
      <DialogContent>
        <Box pt={1}>
          <TextField
            fullWidth
            label="Nome"
            value={formData.name}
            onChange={handleInputChange('name')}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Valor"
            type="number"
            value={formData.value}
            onChange={handleInputChange('value')}
            margin="normal"
            required
            inputProps={{ step: 0.01, min: 0 }}
          />
          <TextField
            fullWidth
            label="Data"
            type="date"
            value={formData.date}
            onChange={handleInputChange('date')}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 0' }}>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={updating || !isValid}
        >
          {updating ? (
            <CircularProgress size={20} />
          ) : (
            'Atualizar'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
