import retornaLinks from './index.js';

const caminho = process.argv;

async function processaTexto(argumentos) {
    const resultado = await retornaLinks(argumentos[2]);
    console.log(resultado);
}
processaTexto(caminho);