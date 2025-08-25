import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material'
import { Add, Edit, Delete, AttachMoney } from '@mui/icons-material'
import { useGanhosService } from '@/services/ganhos'
import { GanhoInput, Ganho } from '@/graphql/types/ganhos'

interface GanhoFormData {
  name: string
  value: string
  date: string
}

const initialFormData: GanhoFormData = {
  name: '',
  value: '',
  date: new Date().toISOString().split('T')[0]
}

export default function GanhosTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGanho, setEditingGanho] = useState<string | null>(null)
  const [formData, setFormData] = useState<GanhoFormData>(initialFormData)

  const {
    ganhos,
    loading,
    creating,
    updating,
    error,
    handleCreateGanho,
    handleUpdateGanho,
    handleDeleteGanho
  } = useGanhosService()

  const handleOpenModal = (ganho?: Ganho) => {
    if (ganho) {
      setEditingGanho(ganho.id)
      setFormData({
        name: ganho.name,
        value: ganho.value.toString(),
        date: ganho.date
      })
    } else {
      setEditingGanho(null)
      setFormData(initialFormData)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingGanho(null)
    setFormData(initialFormData)
  }

  const handleInputChange = (field: keyof GanhoFormData) => (
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

      if (editingGanho) {
        await handleUpdateGanho(editingGanho, ganhoData)
      } else {
        await handleCreateGanho(ganhoData)
      }

      handleCloseModal()
    } catch (error) {
      console.error('Erro ao salvar ganho:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este ganho?')) {
      try {
        await handleDeleteGanho(id)
      } catch (error) {
        console.error('Erro ao deletar ganho:', error)
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Ganhos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Novo Ganho
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar ganhos: {error.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {ganhos.map((ganho: Ganho) => (
          <Box sx={{ xs: 12, sm: 6, md: 4 }} key={ganho.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box flex={1}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {ganho.name}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {formatCurrency(ganho.value)}
                    </Typography>
                    <Chip
                      label={formatDate(ganho.date)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenModal(ganho)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(ganho.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>

      {ganhos.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <AttachMoney sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum ganho encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clique em &quot;Novo Ganho&quot; para adicionar seu primeiro ganho
          </Typography>
        </Box>
      )}

      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingGanho ? 'Editar Ganho' : 'Novo Ganho'}
        </DialogTitle>
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
        <DialogActions>
          <Button onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={creating || updating || !formData.name || !formData.value}
          >
            {creating || updating ? (
              <CircularProgress size={20} />
            ) : editingGanho ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
