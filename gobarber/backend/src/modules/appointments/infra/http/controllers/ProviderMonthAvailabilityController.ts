import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.query;
    const { provider_id } = request.params;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailability.execute({
      year: Number(year),
      provider_id,
      month: Number(month),
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
