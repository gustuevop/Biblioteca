function extraiLinks(links) {
    return links.map((objeto) => Object.values(objeto).join());
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaLink(links);
    
    return listaDeLinks.map((obj, i) => ({
        ...obj,
        status: status[i]
    }))
}

function trataErro(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado';
    } else {
        return 'Ocorreu algum erro';
    }
}

async function checaLink(lista) {
    const listaRetornos = await Promise.all(
        lista.map(async (link) =>{
            try {
                const response = await fetch(link);
                return response.status   
            } catch (error) {
                return trataErro(error);
            };
        })
    );
    return listaRetornos;
}
