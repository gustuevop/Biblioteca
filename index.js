import chalk from 'chalk';
import fs from 'fs';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não foi possível ler o arquivo.'));
}

// function pegaArquivo(caminhoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoArquivo, encoding, (erro, conteudo) => {
//         if (erro) {
//             throw new Error(chalk.red(erro.code, 'Não foi possível ler o arquivo.'));
//         }
//         console.log(chalk.green(conteudo));
//     })
// }

function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8';
    fs.promises.readFile(caminhoArquivo, encoding)
    .then((conteudo) => console.log(chalk.green(conteudo)))
    .catch(trataErro);
}

pegaArquivo('C:\\Users\\gustavo.simao\\Documents\\Demos\\V1\\Log\\CAMPOLIMPOPAULISTASP_27349967000130\\2023-10-13-15-15-10-923-enviar_lote_rps_resposta.xml');