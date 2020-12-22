import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

// let fakeUsersRepository: FakeUsersRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const eachHourInDayArray = Array.from(
      { length: 3 },
      (value, index) => index + 11,
    );

    const promise = eachHourInDayArray.map(hour => {
      return fakeAppointmentsRepository.create({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    const appointmentsCreate = await Promise.all(promise);

    const appointmentsFind = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointmentsCreate).toEqual(appointmentsFind);
  });
});
