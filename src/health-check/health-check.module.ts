import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check.controller';
import { HttpModule } from '@nestjs/axios';
import { DogHealthIndicator } from './dog-health-indicator';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [DogHealthIndicator],
})
export class HealthCheckModule {}
