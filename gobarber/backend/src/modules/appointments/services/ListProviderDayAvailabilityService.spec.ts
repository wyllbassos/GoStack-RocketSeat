import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

// let fakeUsersRepository: FakeUsersRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    const eachHourInDayArray = Array.from(
      { length: 5 },
      (value, index) => index + 10,
    );

    const promise = eachHourInDayArray.map(hour => {
      return fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    await Promise.all(promise);

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: true },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 15, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
