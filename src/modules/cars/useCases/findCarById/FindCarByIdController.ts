import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCarByIdUseCase } from './FindCarByIdUseCase';

class FindCarByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const findCar = container.resolve(FindCarByIdUseCase);

    const car = await findCar.execute({
      id,
    });

    return response.status(201).json(car);
  }
}

export { FindCarByIdController };
