import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

// let fakeUsersRepository: FakeUsersRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2020, 4, 19, 10, 0, 0),
    });

    const eachHourInDayArray = Array.from(
      { length: 10 },
      (value, index) => index + 8,
    );

    const promise = eachHourInDayArray.map(hour => {
      return fakeAppointmentsRepository.create({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    await Promise.all(promise);

    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: 'user',
      provider_id: 'provider',
      date: new Date(2020, 5, 20, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'provider',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
