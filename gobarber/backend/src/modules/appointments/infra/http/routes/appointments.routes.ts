import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmenteService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticated);

// appointmentRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentRoutes;
