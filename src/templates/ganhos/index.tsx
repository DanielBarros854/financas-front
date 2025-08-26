import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Alert,
  Chip
} from '@mui/material'
import { Add, Edit, Delete, AttachMoney } from '@mui/icons-material'
import { useGanhosService } from '@/services/ganhos'
import { Ganho } from '@/graphql/types/ganhos'
import { showConfirm } from '@/utils/notifications'
import { handleError } from '@/utils/errorHandler'
import { formatCurrency } from '@/utils/formatCurrency'
import { CircularProgressComponent } from '@/components/common/loading'
import CreateGanhoModal from '@/components/ganhos/CreateGanhoModal'
import EditGanhoModal from '@/components/ganhos/EditGanhoModal'

export default function GanhosTemplate() {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingGanho, setEditingGanho] = useState<Ganho | null>(null)

  const {
    ganhos,
    loading,
    error,
    handleDeleteGanho
  } = useGanhosService()

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false)
  }

  const handleOpenEditModal = (ganho: Ganho) => {
    setEditingGanho(ganho)
    setEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setEditingGanho(null)
  }

  const handleDeleteConfirm = async (ganho: Ganho) => {
    try {
      await handleDeleteGanho(ganho.id)
    } catch (error) {
      handleError(error)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return CircularProgressComponent()
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
          onClick={handleOpenCreateModal}
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
          <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }} key={ganho.id}>
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
                      onClick={() => handleOpenEditModal(ganho)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => showConfirm({
                        title: 'Tem certeza que deseja excluir este ganho?',
                        text: `Ganho: ${ganho.name}`,
                        icon: 'warning',
                        confirmButtonText: 'Sim',
                        cancelButtonText: 'Não',
                        onConfirm: () => handleDeleteConfirm(ganho)
                      })}
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

      <CreateGanhoModal
        open={createModalOpen}
        onClose={handleCloseCreateModal}
      />

      <EditGanhoModal
        open={editModalOpen}
        ganho={editingGanho}
        onClose={handleCloseEditModal}
      />
    </Box>
  )
}
