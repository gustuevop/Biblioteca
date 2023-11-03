import retornaLinks from './index.js';
import fs from 'fs';
const caminho = process.argv;

function imprimeLista(lista) {
    console.log(lista);
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await retornaLinks(caminho);
        imprimeLista(resultado);

    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (arquivo) => {
            const conteudo = await retornaLinks(`${caminho}/${arquivo}`);
            imprimeLista(conteudo);
        })
    }
}
processaTexto(caminho);