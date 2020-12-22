import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindByDateAndProviderDTO from '@modules/appointments/dtos/IFindByDateAndProviderDTO';
import IFindByDateAndUserDTO from '@modules/appointments/dtos/IFindByDateAndUserDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
  findByDateAndProvider(
    data: IFindByDateAndProviderDTO,
  ): Promise<Appointment | undefined>;
  findByDateAndUser(
    data: IFindByDateAndUserDTO,
  ): Promise<Appointment | undefined>;
}
