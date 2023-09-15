import * as cron from 'node-cron';
import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import axios from 'axios';
import fs from 'fs';

@Injectable()
export class CronService {
  constructor() {
    cron.schedule('*/2 * * * *', () => {
      this.importOpenFoodData();
    });
  }

  private importOpenFoodData() {
    this.downloadOpenFoodFiles();
  }

  async downloadOpenFoodFiles(): Promise<void> {
    // const fileUrls = [
    //   'https://challenges.coode.sh/food/data/json/index.txt',
    //   'https://challenges.coode.sh/food/data/json/file2.json',
    //   // Adicione mais URLs de arquivos conforme necessário
    // ];

    // for (const fileUrl of fileUrls) {
    // }
    //this.lerUrl('index.txt');
  }

  //   async lerArquivo(nomeArquivo: string) {
  //     return fs.readFile(nomeArquivo, (error, arquivo) => {
  //       arquivo.forEach((a) => this.lerUrl(a));
  //     });
  //   }

  async lerUrl(file: string) {
    const fileUrl = `https://challenges.coode.sh/food/data/json/${file}`;
    try {
      const response = await axios.get(fileUrl, { responseType: 'stream' });
      const fileName = fileUrl.split('/').pop();
      const fileStream = createWriteStream(fileName);
      response.data.pipe(fileStream);
      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });

      console.log(`Arquivo ${fileName} baixado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao baixar o arquivo ${fileUrl}: ${error.message}`);
    }
  }


//   async pegarArquivo(fileStream : string) {

//   }
}
