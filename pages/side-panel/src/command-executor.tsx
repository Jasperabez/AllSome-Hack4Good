import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface CommandExecutorProps {
  onClose: () => void;
}

export function CommandExecutor({ onClose }: CommandExecutorProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Here you would typically process the command
      console.log('Executing command:', input);
      setInput('');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="relative w-full">
      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
        placeholder="Type a command (e.g., 'add task: Meeting at 2pm')"
      />
    </div>
  );
}
