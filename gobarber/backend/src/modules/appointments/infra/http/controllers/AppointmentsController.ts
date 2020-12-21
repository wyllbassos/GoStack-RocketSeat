import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
