function extraiLinks(links) {
    return links.map((objeto) => Object.values(objeto).join());
}

export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaLink(links);
    console.log(status);
}

async function checaLink(lista) {
    const listaRetornos = await Promise.all(
        lista.map(async (link) =>{
            const response = await fetch(link);
            return response.status;
        })
    );
    return listaRetornos;
}
