import { request, response, Router } from 'express'
import { v4 } from 'uuid'
import { uuid } from 'uuidv4'

const appointmentRoutes = Router()

interface IAppointments {
  id: string;
  provider: string;
  date: Date;
}

const appointments:IAppointments[] = []

appointmentRoutes.get('/', (request, response) => {
  return response.json(appointments)
})

appointmentRoutes.post('/', (request, response) => {
  const { provider, date } = request.body

  const appointment = {
    id: uuid(),
    provider,
    date
  }

  appointments.push(appointment)

  return response.json(appointment)
})

export default appointmentRoutes
