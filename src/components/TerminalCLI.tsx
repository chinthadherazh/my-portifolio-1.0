import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '../data/portfolioData';

interface TerminalCLIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryEntry {
  command: string;
  output: string;
}

export const TerminalCLI: React.FC<TerminalCLIProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryEntry[]>([
    {
      command: 'welcome',
      output: `Welcome to Chintha Dherazh's interactive shell [v1.0.4-aiml]
Type "help" to see available commands, or click any prompt below.`,
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output = '';
    if (lower in TERMINAL_COMMANDS) {
      output = TERMINAL_COMMANDS[lower];
    } else if (lower === 'whoami') {
      output = `guest@dherazh-aiml [Role: Engineering Recruiter / Peer Researcher]`;
    } else if (lower.startsWith('sudo')) {
      output = `Permission denied: user "guest" is not in the sudoers file. This incident will be reported to Chintha Dherazh.`;
    } else if (lower.startsWith('cat')) {
      output = `=== BIO.TXT ===\n${PERSONAL_INFO.about}`;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else {
      output = `command not found: "${trimmed}". Type "help" for a list of available commands.`;
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      }
    }
  };

  const quickCommands = ['help', 'bio', 'skills', 'projects', 'grades', 'eval', 'contact', 'clear'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`w-full ${
          isMaximized ? 'max-w-6xl h-[85vh]' : 'max-w-2xl h-[520px]'
        } bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Titlebar */}
        <div className="h-10 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>dherazh@aiml-workstation:~</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white transition-colors"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white transition-colors"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Ribbon */}
        <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono shrink-0">
          <span className="text-slate-500 mr-1">Quick:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 bg-slate-800/70 hover:bg-slate-800 text-sky-300 rounded transition-colors whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div
          className="flex-1 p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-y-auto space-y-3"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-sky-400">
                <span className="text-emerald-400">guest@dherazh-aiml</span>
                <span className="text-slate-500">:</span>
                <span className="text-slate-300">~</span>
                <span className="text-slate-500">$</span>
                <span className="text-white font-semibold">{entry.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap pl-4 font-mono text-xs leading-relaxed">
                {entry.output}
              </pre>
            </div>
          ))}

          {/* Prompt line */}
          <div className="flex items-center gap-2 text-sky-400 pt-1">
            <span className="text-emerald-400">guest@dherazh-aiml</span>
            <span className="text-slate-500">:</span>
            <span className="text-slate-300">~</span>
            <span className="text-slate-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-sky-400"
              autoFocus
              placeholder="type command (e.g. bio, projects, eval)..."
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Footer info */}
        <div className="px-4 py-1.5 bg-slate-900/60 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex justify-between items-center shrink-0">
          <span>Bash emulation · Type "exit" to close</span>
          <span>Press Enter ↵ to submit</span>
        </div>
      </div>
    </div>
  );
};
