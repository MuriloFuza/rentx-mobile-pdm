import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsImageRepository } from '@modules/cars/Repositories/interfaces/ICarsImageRepository';
import { ICarsRepository } from '@modules/cars/Repositories/interfaces/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

interface IResponse{
  rental: Rental;
  car: Car;
  url: string;
}
@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalRepository')
    private rentalRepository: IRentalRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('CarsImageRepository')
    private imageRepository: ICarsImageRepository,
  ) {}

  async execute(user_id: string): Promise<IResponse> {
    const rental = await this.rentalRepository.findByUser(user_id);
    const car = await this.carsRepository.findById(rental.car_id);
    const image = await this.imageRepository.findImage(rental.car_id);
    let url:string;

    if (image) {
      url = image.image_name;
    } else {
      url = '';
    }

    const response: IResponse = {
      rental,
      car,
      url,
    };

    return response;
  }
}

export { ListRentalByUserUseCase };
