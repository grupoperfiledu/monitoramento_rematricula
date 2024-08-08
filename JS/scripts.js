let metas = {
    perfil: 1044,
    criar: 225,
    pla: 150,
    tiaDori: 100
};

let premios = [
    "Kit churrasco (Carnes 12 pessoas) (10)",
    "Kit Natalino (Perdigão ou Sadia) (4)",
    "Mi Band 8 Global (6)",
    "Alexa (8)",
    "Máquina de café expresso (4)",
    "Kindle (2)",
    "FDS casal na Pousada Villas (2)",
    "Air Fryer (2)",
    "Televisão de 43",
    "JBL BoomBox",
    "Televisão de 55",
    "Notebook",
    "Televisão de 65",
    "iPhone 13",
    "Pix de R$ 5000,00"
];

let percentuais = [
    30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
];

function atualizarDados(perfil, criar, pla, tiaDori, novaMetaPerfil, novaMetaCriar, novaMetaPla, novaMetaTiaDori, novosPremios, novosPercentuais) {
    if (novaMetaPerfil !== undefined && novaMetaCriar !== undefined && novaMetaPla !== undefined && novaMetaTiaDori !== undefined) {
        metas.perfil = novaMetaPerfil;
        metas.criar = novaMetaCriar;
        metas.pla = novaMetaPla;
        metas.tiaDori = novaMetaTiaDori;
    }

    if (novosPremios !== undefined && novosPercentuais !== undefined) {
        premios = novosPremios;
        percentuais = novosPercentuais;
    }

    const totalMeta = metas.perfil + metas.criar + metas.pla + metas.tiaDori;
    const total = perfil + criar + pla + tiaDori;

    const perfilPercent = (perfil / metas.perfil) * 100;
    const criarPercent = (criar / metas.criar) * 100;
    const plaPercent = (pla / metas.pla) * 100;
    const tiaDoriPercent = (tiaDori / metas.tiaDori) * 100;
    const totalPercent = (total / totalMeta) * 100;

    document.getElementById('perfil-info').textContent = `Perfil: ${perfil} / ${metas.perfil}`;
    document.getElementById('criar-info').textContent = `Villa Criar: ${criar} / ${metas.criar}`;
    document.getElementById('pla-info').textContent = `PLA: ${pla} / ${metas.pla}`;
    document.getElementById('tia-dori-info').textContent = `Tia Dori: ${tiaDori} / ${metas.tiaDori}`;

    document.getElementById('perfil-bar').style.height = `${(perfil / totalMeta) * 100}%`;
    document.getElementById('criar-bar').style.height = `${(perfil + criar) / totalMeta * 100}%`;
    document.getElementById('pla-bar').style.height = `${(perfil + criar + pla) / totalMeta * 100}%`;
    document.getElementById('tia-dori-bar').style.height = `${(perfil + criar + pla + tiaDori) / totalMeta * 100}%`;
    document.getElementById('total-bar').style.height = `${totalPercent}%`;

    document.getElementById('perfil-legend').textContent = perfil;
    document.getElementById('criar-legend').textContent = criar;
    document.getElementById('pla-legend').textContent = pla;
    document.getElementById('tia-dori-legend').textContent = tiaDori;
    document.getElementById('total-legend').textContent = `Total: ${total}`;

    document.getElementById('perfil-barra-horizontal').style.width = `${perfilPercent}%`;
    document.getElementById('criar-barra-horizontal').style.width = `${criarPercent}%`;
    document.getElementById('pla-barra-horizontal').style.width = `${plaPercent}%`;
    document.getElementById('tia-dori-barra-horizontal').style.width = `${tiaDoriPercent}%`;

    const premiacoes = premios.map((premio, index) => ({
        id: `premiacao-${index + 1}`,
        limit: totalMeta * (percentuais[index] / 100),
        premio: premio
    }));

    premiacoes.forEach(p => {
        if (total >= p.limit) {
            document.getElementById(p.id).classList.add('alcancada');
        } else {
            document.getElementById(p.id).classList.remove('alcancada');
        }
    });

    // Atualizar os prêmios e percentuais no HTML
    premiacoes.forEach((p, index) => {
        document.getElementById(p.id).textContent = `${p.premio} (${percentuais[index]}%)`;
    });
}

window.addEventListener('message', function(event) {
    if (event.data.type === 'update') {
        atualizarDados(
            event.data.perfil,
            event.data.criar,
            event.data.pla,
            event.data.tiaDori,
            event.data.metaPerfil,
            event.data.metaCriar,
            event.data.metaPla,
            event.data.metaTiaDori,
            event.data.premios,
            event.data.percentuais
        );
    }
});
