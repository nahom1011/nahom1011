import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Zap, Code, Link as LinkIcon, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommandResponse {
    type: 'text' | 'component';
    content: string | React.ReactNode;
}

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<CommandResponse[]>([]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const initialMessage: CommandResponse = {
        type: 'component',
        content: (
            <div className="mb-4">
                <div className="text-2xl font-bold mb-2 glitch-text">SYSTEM INITIALIZED</div>
                <div className="text-dim">User: Nahom1011 | Identity: Vibe Coder ✨</div>
                <div className="text-dim">Type 'help' to see available commands.</div>
                <div className="mt-2 h-px bg-green-500/20 w-48" />
            </div>
        )
    };

    useEffect(() => {
        setHistory([initialMessage]);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.toLowerCase().trim();
        let response: CommandResponse;

        switch (cleanCmd) {
            case 'help':
                response = {
                    type: 'component',
                    content: (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="text-green-400">about</div>
                            <div className="text-dim">- Who is Nahom?</div>
                            <div className="text-green-400">skills</div>
                            <div className="text-dim">- Technical Arsenal</div>
                            <div className="text-green-400">projects</div>
                            <div className="text-dim">- Active Operations</div>
                            <div className="text-green-400">vibe</div>
                            <div className="text-dim">- Vibe Coder Essence</div>
                            <div className="text-green-400">contact</div>
                            <div className="text-dim">- Secure Channels</div>
                            <div className="text-green-400">clear</div>
                            <div className="text-dim">- Wipe Terminal</div>
                        </div>
                    )
                };
                break;

            case 'about':
                response = {
                    type: 'text',
                    content: "I am a CS student, Cybersecurity researcher, and Bot developer based in Ethiopia. I believe in writing code that not only works but resonates with the 'vibe' of innovation and security."
                };
                break;

            case 'skills':
                response = {
                    type: 'component',
                    content: (
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center gap-2 border border-green-500/30 px-3 py-1 bg-green-500/5">
                                <Shield size={16} /> Cybersecurity
                            </div>
                            <div className="flex items-center gap-2 border border-green-500/30 px-3 py-1 bg-green-500/5">
                                <Cpu size={16} /> Machine Learning
                            </div>
                            <div className="flex items-center gap-2 border border-green-500/30 px-3 py-1 bg-green-500/5">
                                <Zap size={16} /> Automation
                            </div>
                            <div className="flex items-center gap-2 border border-green-500/30 px-3 py-1 bg-green-500/5">
                                <Code size={16} /> React / Python / JS
                            </div>
                        </div>
                    )
                };
                break;

            case 'vibe':
                response = {
                    type: 'text',
                    content: "Vibe Coder (noun): A developer who synchronizes logical precision with creative flow. My code is clean, my systems are secure, and my energy is high. ✨💻"
                };
                break;

            case 'projects':
                response = {
                    type: 'text',
                    content: "[1] Campus-Talent-Bot: A powerful community engagement tool. [2] Phishing-Detection-ML: Identifying threats with neural networks. [3] This Portfolio: An interactive terminal experience."
                };
                break;

            case 'contact':
                response = {
                    type: 'component',
                    content: (
                        <div className="space-y-1 mt-2">
                            <div className="flex items-center gap-2"><Send size={14} /> Telegram: @Nahom1011</div>
                            <div className="flex items-center gap-2"><Mail size={14} /> Email: nahom@vibe.dev</div>
                            <div className="flex items-center gap-2"><LinkIcon size={14} /> GitHub: nahom1011</div>
                        </div>
                    )
                };
                break;

            case 'clear':
                setHistory([]);
                return;

            default:
                response = {
                    type: 'text',
                    content: `Command not found: ${cleanCmd}. Type 'help' for assist.`
                };
        }

        setHistory(prev => [...prev, { type: 'text', content: `> ${cmd}` }, response]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div
            className="terminal-container flicker"
            onClick={() => inputRef.current?.focus()}
            ref={scrollRef}
        >
            <div className="history">
                {history.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mb-2"
                    >
                        {item.type === 'text' ? (
                            <div className={item.content?.toString().startsWith('>') ? "text-green-300 opacity-60" : ""}>
                                {item.content}
                            </div>
                        ) : (
                            item.content
                        )}
                    </motion.div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="command-input-container">
                <span className="prompt">nahom@terminal:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    className="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    spellCheck={false}
                />
            </form>
        </div>
    );
};

export default Terminal;
