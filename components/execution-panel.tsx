'use client';

import React from 'react';
import { MessageCircle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ExecutionMessage {
  id: string;
  role: string;
  content: string;
  node: string;
  timestamp: string;
  status: 'success' | 'running' | 'error' | 'waiting';
}

const getStatusIcon = (status: ExecutionMessage['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'running':
      return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'waiting':
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
};

export default function ExecutionPanel() {
  const messages: ExecutionMessage[] = [
    {
      id: '1',
      role: 'User Input',
      content: 'Tell me about machine learning',
      node: 'start',
      timestamp: '11:15:23',
      status: 'success',
    },
    {
      id: '2',
      role: 'Agent',
      content: 'Processing request...',
      node: 'agent',
      timestamp: '11:15:24',
      status: 'running',
    },
    {
      id: '3',
      role: 'Action',
      content: 'Fetching ML resources...',
      node: 'action',
      timestamp: '11:15:25',
      status: 'waiting',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#14141F] text-white border-l border-[#2a2b3a]">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2b3a]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Execution</h2>
          <span className="text-sm px-2 py-1 bg-[#1A192B] rounded">Running</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className="p-4 border-b border-[#2a2b3a] hover:bg-[#1A192B]"
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{message.role}</span>
                    <span className="text-sm text-gray-400">({message.node})</span>
                  </div>
                  {getStatusIcon(message.status)}
                </div>
                <p className="text-sm text-gray-300 break-words">
                  {message.content}
                </p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a2b3a]">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Duration: 00:00:02</span>
          <span>3/5 steps completed</span>
        </div>
      </div>
    </div>
  );
}