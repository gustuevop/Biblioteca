import retornaLinks from './index.js';
import fs from 'fs';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(valida, lista, identificador = '') {
    if (valida) {
        console.log(await listaValidada(lista));
    } else {
        console.log(identificador, lista);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.error('Arquivo ou diretório inválidos.');
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await retornaLinks(caminho);
        imprimeLista(valida, resultado);

    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo) => {
            const conteudo = await retornaLinks(`${caminho}/${arquivo}`);
            imprimeLista(valida, conteudo, `${caminho}/${arquivo}`);
        })
    }
}
processaTexto(caminho);