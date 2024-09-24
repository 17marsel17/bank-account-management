import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Replace with your DB type (mysql, sqlite, etc.)
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Auto-load entities
        synchronize: false, // Set to false in production
        migrations: [__dirname + '/../migrations/*{.ts,.js}'], // Path to migration files
        cli: {
          migrationsDir: 'src/migrations', // Where migration files are stored
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
