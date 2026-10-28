import React, { useState } from 'react';
import { Check, Copy, Download, FileCode, Server, X } from 'lucide-react';
import {
  createZipArchive,
  getHostgatorPackageFiles,
} from '../utils/hostgatorPackage';

interface HostgatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HostgatorModal({ isOpen, onClose }: HostgatorModalProps) {
  const files = getHostgatorPackageFiles();
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [zipStatus, setZipStatus] = useState<string | null>(null);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeFile = files[selectedFileIndex] || files[0];

  const handleDownloadZip = () => {
    try {
      setZipStatus('Gerando pacote avila-servicos-hostgator.zip...');
      const zipBytes = createZipArchive(files);
      const blob = new Blob([zipBytes], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'avila-servicos-hostgator.zip';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      setZipStatus(
        'Pacote avila-servicos-hostgator.zip gerado e iniciado com sucesso!'
      );
    } catch (err) {
      console.error(err);
      setZipStatus('Erro ao gerar o pacote ZIP.');
    }
  };

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopiedFile(activeFile.filename);
      setTimeout(() => setCopiedFile(null), 2500);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hostgator-modal-title"
    >
      <div className="bg-[#0b131f] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal HostGator"
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#0284c7]/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2
              id="hostgator-modal-title"
              className="text-xl font-display font-bold uppercase tracking-wide text-white"
            >
              Pacote de Publicação HostGator (cPanel)
            </h2>
            <p className="text-xs text-slate-400">
              Arquivo compactado com index.html, .htaccess (HTTPS + Cache), robots.txt e guia de instalação.
            </p>
          </div>
        </div>

        {/* File Selector Tabs */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 border-b border-slate-800"
          role="tablist"
          aria-label="Arquivos do pacote HostGator"
        >
          {files.map((file, idx) => (
            <button
              key={file.filename}
              type="button"
              role="tab"
              aria-selected={selectedFileIndex === idx}
              onClick={() => setSelectedFileIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                selectedFileIndex === idx
                  ? 'bg-[#0284c7] text-white font-semibold'
                  : 'bg-[#060a11] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        {/* File Preview Box */}
        <div className="rounded-xl bg-[#060a11] border border-slate-800 p-4 mb-5">
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80 text-xs">
            <span className="text-slate-300 font-medium">
              {activeFile.description}
            </span>
            <button
              type="button"
              onClick={handleCopyContent}
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono text-xs whitespace-nowrap shrink-0"
            >
              {copiedFile === activeFile.filename ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar {activeFile.filename}</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
            {activeFile.content}
          </pre>
        </div>

        {/* Primary Download Action */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleDownloadZip}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-display font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Arquivo ZIP Agora (avila-servicos-hostgator.zip)</span>
          </button>

          {zipStatus && (
            <div
              className="text-center text-xs text-sky-400 font-medium py-1"
              role="status"
            >
              {zipStatus}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
          <strong className="text-slate-200">Publicação no cPanel:</strong> Abra o{' '}
          <em>Gerenciador de Arquivos</em> &rarr; acesse{' '}
          <code className="text-sky-400 font-mono">public_html</code> &rarr; clique em{' '}
          <em>Carregar</em> &rarr; envie o ZIP &rarr; clique com o botão direito e selecione{' '}
          <em>Extract</em>.
        </div>
      </div>
    </div>
  );
}
