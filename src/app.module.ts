import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { ServiceModule } from './service/service.module';
import { Service } from './service/entities/service.entity';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [Service],
        synchronize: true,
      }),
    }),
    ServiceModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }







// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { PassportModule } from '@nestjs/passport';
// import { APP_GUARD } from '@nestjs/core';
// import { ServiceModule } from './service/service.module';
// import { Service } from './service/entities/service.entity';
// import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
// import { JwtStrategy } from './common/strategies/jwt.strategy';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: configService.get<number>('DB_PORT'),
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_NAME'),

//         autoLoadEntities: true,
//         entities: [Service],

//         // === FIX SSL ===
//         ssl: configService.get('DB_SSL') === 'true'
//           ? { rejectUnauthorized: false }
//           : false,

//         synchronize: process.env.NODE_ENV !== 'production', // false en prod
//         migrationsRun: true,
//       }),
//     }),
//     ServiceModule,
//   ],
//   providers: [
//     JwtStrategy,
//     {
//       provide: APP_GUARD,
//       useClass: JwtAuthGuard,
//     },
//   ],
// })
// export class AppModule { }
