(() => {
  'use strict';

  const procedures = {
    'Spagna': [
      ['PASSAPORTO / FURTO', 'https://www.exteriores.gob.es/Consulados/milan/es/ServiciosConsulares/Paginas/index.aspx?scca=Pasaportes+y+otros+documentos&scco=Italia&scd=197&scs=Pasaportes+-+Requisitos+y+procedimiento+para+obtenerlo'],
      ['DNI SMARRITO', 'https://www.exteriores.gob.es/Consulados/milan/es/ServiciosConsulares/Paginas/index.aspx?scca=Pasaportes+y+otros+documentos&scco=Italia&scd=197&scs=Documento+Nacional+de+Identidad+(DNI)'],
      ['SALVOCONDUCTO', 'https://www.exteriores.gob.es/Consulados/milan/es/ServiciosConsulares/Paginas/index.aspx?scco=Italia&scd=197&scca=Pasaportes+y+otros+documentos&scs=Salvoconducto']
    ],
    'Perù': [
      ['PASSAPORTO', 'https://www.consulado.pe/es/milan/tramite/paginas/pasaporte.aspx'],
      ['SALVOCONDUCTO', 'https://www.consulado.pe/es/milan/tramite/Paginas/Pasaportes/Salvoconducto.aspx'],
      ['DNI DUPLICATO', 'https://www.consulado.pe/es/milan/tramite/Paginas/DNI/Duplicado-DNI.aspx']
    ],
    'Brasile': [
      ['PASSAPORTO SMARRITO', 'https://www.gov.br/mre/pt-br/consulado-amsterda/passaportes/passaporte-extraviado-furtado-ou-danificado']
    ],
    'Svizzera': [
      ['INFO DOCUMENTI', 'https://www.eda.admin.ch/countries/italy/it/home/rappresentanze/ambasciata-roma/consolato-generale-di-svizzera-a-milano.html']
    ]
  };

  function addLinks(){
    document.querySelectorAll('.se-consulate').forEach(card => {
      const country = card.querySelector('h4')?.textContent?.trim();
      const links = procedures[country];
      if(!links || card.querySelector('[data-passport-procedures]')) return;
      const row = document.createElement('div');
      row.dataset.passportProcedures = '1';
      row.className = 'se-actions';
      row.innerHTML = links.map(([label,url]) => `<a class="se-btn" target="_blank" rel="noopener" href="${url}">${label}</a>`).join('');
      const note = document.createElement('p');
      note.className = 'se-note';
      note.textContent = country === 'Brasile'
        ? 'Procedura ufficiale MRE brasiliano: verifica sempre nel portale del Consolato Generale del Brasile a Milano eventuali adattamenti locali e prenotazione e-consular.'
        : 'Link diretto a procedura/documentazione ufficiale verificata.';
      card.appendChild(note);
      card.appendChild(row);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addLinks);
  else setTimeout(addLinks, 0);
})();