import fs from 'fs';

async function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8';
    const conteudo = await fs.promises.readFile(caminhoArquivo, encoding);
    return conteudo;
}

async function retornaLinks(caminho) {
    const texto = await pegaArquivo(caminho);
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    let capturas = [...texto.matchAll(regex)];
    let links = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return links;
}


 

export default retornaLinks;