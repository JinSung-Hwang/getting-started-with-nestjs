import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  UseGuards,
  Inject,
  InternalServerErrorException,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email-dto';
import { UserLoginDto } from './dto/user-login-dto';
import { UserInfo } from './dto/user-info.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<void> {
    this.printLoggerServiceLog(dto);

    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  private printLoggerServiceLog(dto) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error ' + JSON.stringify(dto), e.stack);
    }
    this.logger.warn('warn: ' + JSON.stringify(dto));
    this.logger.log('log: ', JSON.stringify(dto));
    this.logger.verbose('verbose: ' + JSON.stringify(dto));
    this.logger.debug('debug: ' + JSON.stringify(dto));
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto) {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
