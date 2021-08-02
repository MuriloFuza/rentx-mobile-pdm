import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/Repositories/interfaces/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class FindCarByIdUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    id,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(id);

    if (!carAlreadyExists) {
      throw new AppError('Car not exists!');
    }

    return carAlreadyExists;
  }
}

export { FindCarByIdUseCase };
