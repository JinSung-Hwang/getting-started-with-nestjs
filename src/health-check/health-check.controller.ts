import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { DogHealthIndicator } from './dog-health-indicator';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private dog: DogHealthIndicator,
  ) {}

  @HealthCheck()
  @Get()
  check() {
    return this.health.check([
      // () => this.http.pingCheck('nestjs-docs', 'https://www.naver.com'),
      () => this.db.pingCheck('database'),
      // () => this.dog.isHealthy('dog'),
    ]);
  }
}
