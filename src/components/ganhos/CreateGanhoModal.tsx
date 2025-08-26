import React, { useState } from 'react'
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
import { GanhoInput } from '@/graphql/types/ganhos'
import { showSuccess } from '@/utils/notifications'
import { handleError } from '@/utils/errorHandler'

interface CreateGanhoModalProps {
  open: boolean
  onClose: () => void
}

interface FormData {
  name: string
  value: string
  date: string
}

const initialFormData: FormData = {
  name: '',
  value: '',
  date: new Date().toISOString().split('T')[0]
}

export default function CreateGanhoModal({ open, onClose }: CreateGanhoModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const { handleCreateGanho, creating } = useGanhosService()

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async () => {
    try {
      const ganhoData: GanhoInput = {
        name: formData.name,
        value: parseFloat(formData.value),
        date: formData.date
      }

      await handleCreateGanho(ganhoData)
      showSuccess('Ganho criado com sucesso!')
      handleClose()
    } catch (error) {
      handleError(error)
    }
  }

  const handleClose = () => {
    setFormData(initialFormData)
    onClose()
  }

  const isValid = formData.name.trim() !== '' && formData.value.trim() !== ''

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ padding: '24px 0 16px 24px' }}>Novo Ganho</DialogTitle>
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
          disabled={creating || !isValid}
        >
          {creating ? (
            <CircularProgress size={20} />
          ) : (
            'Criar'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
