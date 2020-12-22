import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDateAndProvider = await this.appointmentsRepository.findByDateAndProvider(
      { date: appointmentDate, provider_id },
    );

    const findAppointmentInSameDateAndUser = await this.appointmentsRepository.findByDateAndUser(
      { date: appointmentDate, user_id },
    );

    if (user_id === provider_id) {
      throw new AppError("You can't create appointment with yourself");
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create appointment to a past date.");
    }

    if (findAppointmentInSameDateAndUser) {
      throw new AppError('You already have an appointment for this time');
    }

    if (findAppointmentInSameDateAndProvider) {
      throw new AppError('This appointment is already booked');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments betwee 8am and 5pm');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
