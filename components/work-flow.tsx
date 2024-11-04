'use client';

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
  ColorMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, Pause, Settings, Database, Bot, Clock } from 'lucide-react';

// N8N 스타일의 노드 타입별 스타일 정의
const getNodeStyle = (type: string) => {
  const baseStyle = {
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    width: 180,
  };

  switch (type) {
    case 'start':
      return {
        ...baseStyle,
        background: '#1A192B',
        border: '2px solid #6E6B85',
      };
    case 'agent':
      return {
        ...baseStyle,
        background: '#23344B',
        border: '2px solid #3C5A82',
      };
    case 'action':
      return {
        ...baseStyle,
        background: '#3A2846',
        border: '2px solid #644576',
      };
    case 'end':
      return {
        ...baseStyle,
        background: '#2D2B3C',
        border: '2px solid #504E6D',
      };
    default:
      return baseStyle;
  }
};

// 초기 노드 설정
const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    position: { x: 250, y: 0 },
    data: { 
      label: 'start',
      icon: <Clock className="w-4 h-4" />,
    },
    style: getNodeStyle('start'),
  },
  {
    id: 'agent',
    position: { x: 250, y: 100 },
    data: { 
      label: 'agent',
      icon: <Bot className="w-4 h-4" />,
    },
    style: getNodeStyle('agent'),
  },
  {
    id: 'action',
    position: { x: 100, y: 200 },
    data: { 
      label: 'action',
      icon: <Database className="w-4 h-4" />,
    },
    style: getNodeStyle('action'),
  },
  {
    id: 'end',
    type: 'output',
    position: { x: 400, y: 200 },
    data: { 
      label: '__end__',
      icon: <Clock className="w-4 h-4" />,
    },
    style: getNodeStyle('end'),
  },
];

// 초기 엣지 설정
const initialEdges: Edge[] = [
  { 
    id: 'start-agent', 
    source: 'start', 
    target: 'agent',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6E6B85' },
  },
  { 
    id: 'agent-action', 
    source: 'agent', 
    target: 'action',
    type: 'smoothstep',
    animated: true,
    label: 'continue',
    style: { stroke: '#6E6B85' },
  },
  { 
    id: 'agent-end', 
    source: 'agent', 
    target: 'end',
    type: 'smoothstep',
    label: 'end',
    style: { stroke: '#6E6B85' },
  },
  { 
    id: 'action-agent', 
    source: 'action', 
    target: 'agent',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6E6B85' },
  },
];

// 커스텀 노드 컴포넌트
const CustomNode = ({ data }: { data: { label: string; icon: React.ReactNode } }) => (
  <div className="flex items-center gap-2 text-white">
    {data.icon}
    <span>{data.label}</span>
  </div>
);

export default function WorkFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isExecuting, setIsExecuting] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({
      ...connection,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6E6B85' },
    }, eds)),
    [setEdges]
  );

  const toggleExecution = () => {
    setIsExecuting(!isExecuting);
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={{ Custom : CustomNode }}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        colorMode={colorMode}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#6E6B85' },
        }}
      >
        {/* <Background color="#2a2b3a" gap={16} /> */}
        <Controls 
          className="bg-[#1A192B] border-[#2a2b3a] fill-white"
          showInteractive={false}
        />
        
        {/* N8N 스타일 툴바 */}
        <Panel position="top-right" className="flex gap-2">
          <button
            onClick={toggleExecution}
            className="flex items-center gap-2 px-3 py-1.5 rounded border transition-colors"
          >
            {isExecuting ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>실행</span>
              </>
            )}
          </button>
          <button className="p-1.5 rounded border transition-colors" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}