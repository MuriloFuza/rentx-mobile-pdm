import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
  ) {}

  async execute(user_id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findByUser(user_id);

    return rental;
  }
}

export { ListRentalByUserUseCase };
