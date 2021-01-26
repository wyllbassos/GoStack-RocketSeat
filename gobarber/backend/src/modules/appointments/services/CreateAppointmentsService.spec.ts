import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

const appointmentDate = new Date();
appointmentDate.setDate(appointmentDate.getDate() + 1);
appointmentDate.setHours(8);
appointmentDate.setMinutes(0);
appointmentDate.setMilliseconds(0);

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider-id',
      user_id: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointment on the same time and provider', async () => {
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id',
      user_id: 'user-id1',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id',
        user_id: 'user-id2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two appointment on the same time and user', async () => {
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id1',
      user_id: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-id2',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create two appointment on the same time with another user and provider', async () => {
    const appointment1 = await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id1',
      user_id: 'user-id1',
    });

    const appointment2 = await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-id2',
      user_id: 'user-id2',
    });

    expect(appointment1).toHaveProperty('id');
    expect(appointment2).toHaveProperty('id');
    expect(appointment1.provider_id).toBe('provider-id1');
    expect(appointment2.provider_id).toBe('provider-id2');
    expect(appointment1.user_id).toBe('user-id1');
    expect(appointment2.user_id).toBe('user-id2');
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: 'user-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
