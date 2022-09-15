import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// const httpsOptions = {
//   key: fs.readFileSync('src/cert/private-key.pem'),
//   cert: fs.readFileSync('src/cert/public-certificate.pem'),
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const environement = process.env.ENVIRONEMENT;
  console.log(environement);

  // app.use(morgan('dev'));
  app.setGlobalPrefix('api.xml2Ts/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transformer les paramettre en type de données souhaité
      whitelist: true, //Ne récupérer que les paramettre définie dans les validateurs
      forbidNonWhitelisted: true, //déclancher l'érreur s'il y a des paramettres non siouhaité
      enableDebugMessages: true, // S’il est défini sur true, le validateur imprimera des messages d’avertissement supplémentaires sur la console lorsque quelque chose ne va pas.
      disableErrorMessages: environement === 'developpement' ? false : true,
    }),
  );

  // const config = new DocumentBuilder()
  //   .setTitle('API Super Donor')
  //   .setDescription('The cats API description')
  //   .setVersion('1.0')
  //   .addTag('SP')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api.xml2Ts/v1/doc', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port, () => {
    console.log('Environement : ', environement);
    console.log(
      'Server run 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥',
    );
  });
}

bootstrap();
