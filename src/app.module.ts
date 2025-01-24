import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './common/config/data.source';
import { DepartamentsModule } from './departaments/departaments.module';
import { ServicesModule } from './services/services.module';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.development`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    DepartamentsModule,
    ServicesModule,
    StocksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
