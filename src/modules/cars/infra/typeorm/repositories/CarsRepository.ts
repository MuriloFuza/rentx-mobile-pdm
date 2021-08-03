import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/Repositories/interfaces/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id,
    image,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
      image,
    });

    await this.repository.save(car);

    return car;
  }
  findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOne({ license_plate });
    return car;
  }

  async listAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const cars = await this.repository.find({
      where:{
        available: true
      },
      relations: ['category', 'specifications'],
    })

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(
      {
        where: {
          id,
        },
        relations: ['category', 'specifications'],  
      },
    );
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
