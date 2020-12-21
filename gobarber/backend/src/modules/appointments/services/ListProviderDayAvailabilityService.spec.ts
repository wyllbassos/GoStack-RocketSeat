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
      { length: 3 },
      (value, index) => index + 15,
    );

    const promise = eachHourInDayArray.map(hour => {
      return fakeAppointmentsRepository.create({
        user_id: 'user',
        provider_id: 'provider',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    await Promise.all(promise);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: true },
        { hour: 15, available: false },
        { hour: 16, available: false },
        { hour: 17, available: false },
      ]),
    );
  });
});
