import retornaLinks from './index.js';
import fs from 'fs';
const caminho = process.argv;

function imprimeLista(lista, identificador = '') {
    console.log(identificador, lista);
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];

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
        imprimeLista(resultado);

    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo) => {
            const conteudo = await retornaLinks(`${caminho}/${arquivo}`);
            imprimeLista(conteudo, `${caminho}/${arquivo}`);
        })
    }
}
processaTexto(caminho);