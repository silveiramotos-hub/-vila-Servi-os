import { COMPANY_INFO, INDUSTRIAL_SERVICES } from './industrialData';

export interface HostgatorFileItem {
  filename: string;
  description: string;
  content: string;
}

export function getHostgatorPackageFiles(): HostgatorFileItem[] {
  const htaccessContent = `# Configuração Apache HostGator - Ávila Serviços Industriais
RewriteEngine On

# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Habilitar Compressão Gzip para performance máxima
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Cache de Navegador para ativos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Proteção de listagem de diretórios
Options -Indexes
`;

  const robotsContent = `User-agent: *
Allow: /
Sitemap: https://avilaservicos.com.br/sitemap.xml
`;

  const instructionsContent = `=============================================================
GUIA DE INSTALAÇÃO NA HOSTGATOR (cPanel)
Empresa: ${COMPANY_INFO.name}
CNPJ: ${COMPANY_INFO.cnpj} - ${COMPANY_INFO.city} - ${COMPANY_INFO.state}
=============================================================

1. Acesse o painel da HostGator (cPanel):
   https://seudominio.com.br/cpanel (ou pelo portal do cliente HostGator)

2. No cPanel, clique em "Gerenciador de Arquivos" (File Manager).

3. Entre na pasta raiz do site:
   public_html

4. No menu superior, clique em "Carregar" (Upload) e selecione este arquivo:
   avila-servicos-hostgator.zip

5. Ao terminar o carregamento (barra verde 100%), volte para a pasta public_html,
   clique com o botão direito no ZIP e selecione "Extract" (Extrair).

6. Verifique se os seguintes arquivos estão diretamente dentro de public_html:
   - index.html
   - .htaccess
   - robots.txt

7. Pronto! Seu site estará online com conexão HTTPS segura, navegação veloz e integração direta para o WhatsApp ${COMPANY_INFO.whatsappDisplay} e e-mail ${COMPANY_INFO.email}.
`;

  const servicesHtml = INDUSTRIAL_SERVICES.map(
    (s) => `
      <div class="p-8 rounded-xl bg-[#060a11] border border-slate-800">
        <div class="text-xs font-mono text-sky-400 mb-2">${s.number} · ${s.categoryLabel} · ${s.toleranceOrSpec}</div>
        <h3 class="text-xl font-bold uppercase text-white mb-3">${s.title}</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">${s.summary}</p>
        <div class="text-xs text-slate-400 border-t border-slate-800 pt-3">${s.normCompliance}</div>
      </div>`
  ).join('\n');

  const standaloneHtmlContent = `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ÁVILA SERVIÇOS INDUSTRIAIS | Usinagem, Caldeiraria e Manutenção Industrial | Alagoinhas - BA</title>
  <meta name="description" content="Soluções de alta precisão em usinagem mecânica, caldeiraria média e pesada, tubulações industriais e manutenção de plantas em Alagoinhas - BA.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Oswald:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #060a11; color: #f1f5f9; }
    h1, h2, h3, .font-display { font-family: 'Oswald', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#060a11] text-slate-100 antialiased">
  <header class="sticky top-0 z-50 bg-[#060a11]/95 backdrop-blur border-b border-slate-800 px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-8">
      <a href="#inicio" class="text-xl font-display font-bold tracking-wider text-white whitespace-nowrap">ÁVILA SERVIÇOS</a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <a href="#inicio" class="hover:text-white">Início</a>
        <a href="#empresa" class="hover:text-white">A Empresa</a>
        <a href="#servicos" class="hover:text-white">Serviços</a>
        <a href="#orcamento" class="hover:text-white">Cotação B2B</a>
        <a href="#contato" class="hover:text-white">Localização</a>
      </nav>
      <a href="https://wa.me/${COMPANY_INFO.whatsappRaw}" target="_blank" rel="noopener" class="px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold whitespace-nowrap">Solicitar Cotação</a>
    </div>
  </header>

  <main>
    <section id="inicio" class="py-20 px-6 max-w-7xl mx-auto">
      <div class="text-xs font-mono text-sky-400 mb-3">ALAGOINHAS · BAHIA · BR-101 · CNPJ ${COMPANY_INFO.cnpj}</div>
      <h1 class="text-4xl sm:text-6xl font-display font-bold uppercase text-white max-w-4xl leading-tight mb-6">
        Soluções de Alta Precisão em Usinagem, Caldeiraria e Manutenção Industrial
      </h1>
      <p class="text-slate-300 max-w-2xl text-lg mb-8">
        Parceira estratégica de indústrias petroquímicas, cervejeiras, de celulose, cerâmicas e agroindustriais na Bahia. Mais de 12 anos de excelência operacional.
      </p>
      <div class="flex flex-wrap gap-4">
        <a href="#orcamento" class="px-6 py-3.5 rounded-lg bg-[#0284c7] text-white font-semibold text-sm">Solicitar Cotação Técnica</a>
        <a href="tel:${COMPANY_INFO.phoneLandlineRaw}" class="px-6 py-3.5 rounded-lg border border-slate-700 text-slate-200 font-semibold text-sm">Central: ${COMPANY_INFO.phoneLandline}</a>
      </div>
    </section>

    <section id="servicos" class="py-20 px-6 bg-[#0b131f] border-y border-slate-800">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-display font-bold uppercase text-white mb-10">Escopo Técnico de Serviços</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${servicesHtml}
        </div>
      </div>
    </section>

    <section id="contato" class="py-20 px-6 max-w-7xl mx-auto">
      <h2 class="text-3xl font-display font-bold uppercase text-white mb-4">Localização e Contato</h2>
      <p class="text-slate-300 mb-2">${COMPANY_INFO.address} - ${COMPANY_INFO.district}, ${COMPANY_INFO.city} - ${COMPANY_INFO.state}, CEP ${COMPANY_INFO.cep}</p>
      <p class="text-slate-400 text-sm mb-6">Telefones: ${COMPANY_INFO.phoneLandline} · WhatsApp: ${COMPANY_INFO.whatsappDisplay} · E-mail: ${COMPANY_INFO.email}</p>
    </section>
  </main>

  <footer class="border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-400">
    ${COMPANY_INFO.name} · CNPJ ${COMPANY_INFO.cnpj} · ${COMPANY_INFO.city}/${COMPANY_INFO.state}
  </footer>
</body>
</html>`;

  return [
    {
      filename: 'index.html',
      description: 'Página principal autônoma pronta para hospedagem Apache/cPanel',
      content: standaloneHtmlContent,
    },
    {
      filename: '.htaccess',
      description: 'Regras Apache: Redirecionamento HTTPS 301, compressão Gzip e cache',
      content: htaccessContent,
    },
    {
      filename: 'robots.txt',
      description: 'Diretrizes de indexação para mecanismos de busca e sitemap',
      content: robotsContent,
    },
    {
      filename: 'INSTRUCOES-HOSTGATOR.txt',
      description: 'Passo a passo detalhado para publicação na pasta public_html do cPanel',
      content: instructionsContent,
    },
  ];
}

// Pure TypeScript CRC-32 implementation for standard ZIP creation
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

export function computeCrc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Generates a valid PKZIP (Store / Method 0) binary archive as a Uint8Array
 * without requiring external network libraries.
 */
export function createZipArchive(
  files: Array<{ filename: string; content: string }>
): Uint8Array {
  const encoder = new TextEncoder();
  const localHeadersAndData: Uint8Array[] = [];
  const centralDirectoryHeaders: Uint8Array[] = [];
  let currentOffset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.filename);
    const dataBytes = encoder.encode(file.content);
    const crc = computeCrc32(dataBytes);
    const size = dataBytes.length;

    // Local File Header (30 bytes + filename)
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true); // Signature PK\x03\x04
    localView.setUint16(4, 20, true); // Version needed to extract (2.0)
    localView.setUint16(6, 0x0800, true); // UTF-8 flag
    localView.setUint16(8, 0, true); // Compression method (0 = Store)
    localView.setUint16(10, 0, true); // Mod time
    localView.setUint16(12, 0x21, true); // Mod date
    localView.setUint32(14, crc, true); // CRC32
    localView.setUint32(18, size, true); // Compressed size
    localView.setUint32(22, size, true); // Uncompressed size
    localView.setUint16(26, nameBytes.length, true); // Filename length
    localView.setUint16(28, 0, true); // Extra field length
    localHeader.set(nameBytes, 30);

    localHeadersAndData.push(localHeader, dataBytes);

    // Central Directory File Header (46 bytes + filename)
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true); // Signature PK\x01\x02
    centralView.setUint16(4, 20, true); // Version made by
    centralView.setUint16(6, 20, true); // Version needed
    centralView.setUint16(8, 0x0800, true); // UTF-8 flag
    centralView.setUint16(10, 0, true); // Compression method (0 = Store)
    centralView.setUint16(12, 0, true); // Mod time
    centralView.setUint16(14, 0x21, true); // Mod date
    centralView.setUint32(16, crc, true); // CRC32
    centralView.setUint32(20, size, true); // Compressed size
    centralView.setUint32(24, size, true); // Uncompressed size
    centralView.setUint16(28, nameBytes.length, true); // Filename length
    centralView.setUint16(30, 0, true); // Extra field length
    centralView.setUint16(32, 0, true); // File comment length
    centralView.setUint16(34, 0, true); // Disk number start
    centralView.setUint16(36, 0, true); // Internal file attributes
    centralView.setUint32(38, 0, true); // External file attributes
    centralView.setUint32(42, currentOffset, true); // Relative offset of local header
    centralHeader.set(nameBytes, 46);

    centralDirectoryHeaders.push(centralHeader);
    currentOffset += localHeader.length + dataBytes.length;
  }

  let centralDirSize = 0;
  for (const cd of centralDirectoryHeaders) {
    centralDirSize += cd.length;
  }

  // End of Central Directory Record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true); // Signature PK\x05\x06
  eocdView.setUint16(4, 0, true); // Number of this disk
  eocdView.setUint16(6, 0, true); // Disk where central directory starts
  eocdView.setUint16(8, files.length, true); // Number of central directory records on this disk
  eocdView.setUint16(10, files.length, true); // Total number of central directory records
  eocdView.setUint32(12, centralDirSize, true); // Size of central directory
  eocdView.setUint32(16, currentOffset, true); // Offset of start of central directory
  eocdView.setUint16(20, 0, true); // Comment length

  const totalSize = currentOffset + centralDirSize + eocd.length;
  const output = new Uint8Array(totalSize);
  let pos = 0;

  for (const chunk of localHeadersAndData) {
    output.set(chunk, pos);
    pos += chunk.length;
  }
  for (const chunk of centralDirectoryHeaders) {
    output.set(chunk, pos);
    pos += chunk.length;
  }
  output.set(eocd, pos);

  return output;
}
