import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, year, month } = request.query;
    const { provider_id } = request.params;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailability.execute({
      day: Number(day),
      year: Number(year),
      provider_id,
      month: Number(month),
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
