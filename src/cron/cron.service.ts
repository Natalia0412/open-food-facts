import * as cron from 'node-cron';
import { Injectable } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import axios from 'axios';
import * as fs from 'fs';
import { resolve } from 'dns';
import * as path from 'path';
import { gunzip } from 'gunzip-file';
import { log } from 'console';
import * as zlib from 'zlib';
import * as pako from 'pako';
import * as AdmZip from 'adm-zip';

@Injectable()
export class CronService {
  constructor() {
    cron.schedule('*/5 * * * * *', () => {
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
    // this.lerUrl('index.txt');
    await this.getFile('https://challenges.coode.sh/food/data/json/index.txt');
  }

  //   async lerArquivo(nomeArquivo: string) {
  //     return fs.readFile(nomeArquivo, (error, arquivo) => {
  //       arquivo.forEach((a) => this.lerUrl(a));
  //     });
  //   }

  async getFile(url: string) {
    const response = await axios.get(url, { responseType: 'text' });
    const files = response.data.split('\n').filter((s) => s != '');

    for (let i = 0; i < files.length; i++) {
      //await this.downloadFile(files[i]);
      await this.fetchGzipJSON(files[i]);
    }

    // console.log('passei aqui');
    // console.log(files);
    // console.log(files[0]);
  }

  fetchGzipJSON = async (file) => {
    let inflatedJSON = {};
    const fileUrl = `https://challenges.coode.sh/food/data/json/${file}`;
    
    const filePath = './src/teste.zip';
    try {
      // const { data } = await axios.get(fileUrl, {
      //   responseType: 'arraybuffer',
      //   decompress: true,
      // });

     // const data = fs.readFileSync(filePath);
      const zip = new AdmZip(filePath);
      const zipEntry = zip.getEntry('teste.json');
      if (!zipEntry) {
        throw new Error('Arquivo JSON não encontrado no arquivo ZIP.');
       }
      const jsonContent = zipEntry.getData().toString('utf8');

      // //inflatedJSON = JSON.parse(pako.inflate(data, { to: 'string' }));
      inflatedJSON = JSON.parse(pako.inflate(jsonContent, { to: 'string' }));
    } catch (error) {
      console.error('could not fetch gzip json', error);
    }
    return inflatedJSON;
  };

  async downloadFile(file: string) {
    const fileUrl = `https://challenges.coode.sh/food/data/json/${file}`;
    const downloadFolder = './downloads';
    let inflatedJSON = {};

    if (!existsSync(downloadFolder)) {
      mkdirSync(downloadFolder);
    }

    try {
      const response = await axios.get(fileUrl, {
        responseType: 'arraybuffer',
        decompress: true,
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Accept-Enconding': 'gzip, deflate, br',
        // },
      });
      console.log(response.data);
      inflatedJSON = JSON.parse(
        pako.inflate(response.data, {
          to: 'string',
        }),
      );
      // .then((resp) => {
      //   let out;
      //   console.log(resp.data)
      //   zlib.gunzip(resp.data, (err, output) => {
      //     out = output;
      //   });
      //   return out;
      // });

      console.log('entrei aqui', inflatedJSON);

      // zlib.gunzip(response.data, function (error, result) {
      //   console.log(result.toString());
      //   return result.toString();
      // });

      // const fileName = fileUrl.split('/').pop();
      // const filePath = path.resolve(downloadFolder, fileName); // Caminho completo do arquivo

      //   const fileStream = createWriteStream(filePath);
      //   response.data.pipe(fileStream);

      //   await new Promise((resolve, reject) => {
      //     fileStream.on('finish', resolve);
      //     fileStream.on('error', reject);
      //   });
      //   console.log(`Arquivo ${fileName} baixado com sucesso.`);
      //   //await this.unzipfile(filePath, downloadFolder);
    } catch (error) {
      console.error(`Erro ao baixar o arquivo ${fileUrl}: ${error.message}`);
    }
    console.log('antes do retorno', inflatedJSON);
    return inflatedJSON;
  }

  async unzipfile(zippedfileName: string, unzippedFilePath: string) {
    console.log(zippedfileName);
    console.log(unzippedFilePath);
    const entrada: fs.ReadStream = fs.createReadStream(zippedfileName);
    const saida = fs.createWriteStream(unzippedFilePath);
    // const descompactador = zlib.createGunzip();
    // entrada.pipe(descompactador).pipe(saida);

    // return new Promise((resolve, reject) => {
    //   saida.on('finish', () => {
    //     console.log(`Arquivo descompactado para ${unzippedFilePath}`);
    //     resolve;
    //   });

    //   descompactador.on('error', (error) => {
    //     console.error(`Erro ao descompactar o arquivo: ${error.message}`);
    //     reject(error);
    //   });
    // });

    // const downloads = 'downloads';
    // const partPath = path.split('\\');
    // const indexDownloads = partPath.indexOf(downloads);
    // const zippedfileName = partPath.slice(indexDownloads + 1)[0];
    // const name = zippedfileName.split('.')[0];
    // const unzippedFilePath = `.\\${downloads}\\${name}.json`; // Use path.join para criar o caminho
    // const a = `.\\${downloads}\\${zippedfileName}`;
    // const unzippedFilePath = path.join(
    //   __dirname,
    //   'downloads',
    //   unzippedFileName,
    // ); // Use path.join para criar o caminho
    // console.log('caminho completo', path);
    // console.log('origem ', a);
    // console.log('destino', unzippedFilePath);
    //  gunzip(a, unzippedFilePath, () => {
    //    console.log('gunzip done!');
    // });
  }

  // async lerUrl(file: string) {
  //   const fileUrl = `https://challenges.coode.sh/food/data/json/${file}`;
  //   try {
  //     const response = await axios.get(fileUrl, { responseType: 'stream' });
  //     const fileName = fileUrl.split('/').pop();
  //     const fileStream = createWriteStream(fileName);
  //     response.data.pipe(fileStream);
  //     await new Promise((resolve, reject) => {
  //       fileStream.on('finish', resolve);
  //       fileStream.on('error', reject);
  //     });

  //     console.log(`Arquivo ${fileName} baixado com sucesso.`);
  //   } catch (error) {
  //     console.error(`Erro ao baixar o arquivo ${fileUrl}: ${error.message}`);
  //   }
  // }

  //   async pegarArquivo(fileStream : string) {

  //   }
}
