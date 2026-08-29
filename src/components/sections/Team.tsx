'use client';

import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  type NodeProps,
  type Node,
  type Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Image from 'next/image';

// --- Custom Node Component ---
const TeamNode = ({
  data,
}: NodeProps<
  Node<{ label: string; role: string; img: string; isHead?: boolean; isDark?: boolean }>
>) => {
  if (!data) return null;

  // Fallback image
  const imgSrc =
    data.img || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 w-56
            ${data.isHead ? 'scale-110 z-20' : 'hover:scale-105 z-10'}`}
    >
      {/* Node Background with clip-path for hex shape or just rounded */}
      <div
        className={`absolute inset-0 rounded-xl border border-stone-800 bg-[#1c1917] opacity-90 shadow-2xl ${data.isHead ? 'shadow-amber-900/40 border-amber-800' : ''}`}
        style={{
          clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)',
        }}
      />

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-stone-600 !w-2 !h-2 !border-none"
      />

      {/* Content content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Image Frame - Hexagon-ish */}
        <div
          className={`overflow-hidden mb-3 border-2 transform rotate-45 overflow-hidden shadow-lg
                    ${data.isHead ? 'border-amber-600 w-20 h-20' : 'border-stone-700 w-16 h-16 group-hover:border-stone-500'}`}
          style={{ borderRadius: '12px' }}
        >
          <div className="w-full h-full transform -rotate-45 scale-125 overflow-hidden">
            <Image
              src={imgSrc}
              alt={data.label as string}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="text-center">
          <h3
            className={`font-cinzel text-stone-100 leading-tight tracking-wide ${data.isHead ? 'text-xl text-amber-500 font-bold' : 'text-lg'}`}
          >
            {data.label as string}
          </h3>
          <p
            className={`font-serif italic text-stone-500 mt-1 ${data.isHead ? 'text-sm text-amber-500/80 font-bold' : 'text-xs'}`}
          >
            {data.role as string}
          </p>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-stone-600 !w-2 !h-2 !border-none"
      />
    </div>
  );
};

// --- Data Setup ---
const HEADS = [
  { name: 'Organizing Head 1', role: 'Chief Architect' },
  { name: 'Organizing Head 2', role: 'Operations Lead' },
  { name: 'Organizing Head 3', role: 'Technical Director' },
];

const COMMITTEES = Array.from({ length: 17 }, (_, i) => ({
  name: `Committee ${i + 1}`,
  role: 'Core Committee',
}));

const generateNodesAndEdges = () => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  // ... (rest logic same, just re-writing for clarity/completeness or can assume same logic)
  // To safe complexity, I will paste the logic exactly as it was.

  // 1. Place Heads centered at top
  const headSpacing = 450;
  const headsTotalWidth = (HEADS.length - 1) * headSpacing;
  const headsStartX = -headsTotalWidth / 2;
  const headsY = 50;

  HEADS.forEach((head, i) => {
    const headId = `head-${i}`;
    const x = headsStartX + i * headSpacing;

    nodes.push({
      id: headId,
      type: 'teamNode',
      position: { x, y: headsY },
      data: {
        label: head.name,
        role: head.role,
        img: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&q=60`,
        isHead: true,
      },
    });
  });

  // 2. Place Committees in a grid below
  const row1Count = 9;
  const row2Count = 8;
  const committeeSpacingX = 280;
  const committeeRow1Y = 450;
  const committeeRow2Y = 750;
  const row1Width = (row1Count - 1) * committeeSpacingX;
  const row1StartX = -row1Width / 2;
  const row2Width = (row2Count - 1) * committeeSpacingX;
  const row2StartX = -row2Width / 2;

  COMMITTEES.forEach((committee, i) => {
    const committeeId = `committee-${i}`;
    let x, y;

    if (i < row1Count) {
      x = row1StartX + i * committeeSpacingX;
      y = committeeRow1Y;
    } else {
      const j = i - row1Count;
      x = row2StartX + j * committeeSpacingX;
      y = committeeRow2Y;
    }

    nodes.push({
      id: committeeId,
      type: 'teamNode',
      position: { x, y },
      data: {
        label: committee.name,
        role: committee.role,
        img: `https://images.unsplash.com/photo-${1550000000000 + i}?w=400&q=60`,
      },
    });

    HEADS.forEach((_, hIndex) => {
      const headId = `head-${hIndex}`;
      edges.push({
        id: `edge-${headId}-${committeeId}`,
        source: headId,
        target: committeeId,
        type: 'step',
        animated: false,
        style: {
          stroke: '#78716c',
          strokeWidth: 1,
          opacity: 0.15,
        },
      });
    });
  });

  return { initialNodes: nodes, initialEdges: edges };
};

const result = generateNodesAndEdges();

export function Team() {
  const nodeTypes = useMemo(() => ({ teamNode: TeamNode }), []);
  const [nodes, , onNodesChange] = useNodesState(result.initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(result.initialEdges);

  return (
    <section
      id="team"
      className="h-[120vh] w-full bg-[#0c0a09] relative mythic-texture overflow-hidden"
    >
      <div className="absolute top-12 left-0 right-0 z-10 text-center pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-cinzel text-amber-500/90 tracking-wider drop-shadow-[0_4px_10px_rgba(245,158,11,0.3)] font-bold">
          The Order
        </h2>
        <p className="text-stone-500 font-serif italic mt-4 text-xl tracking-wide">
          Guardians of the TECHUTOPIA 2026 Legacy
        </p>
      </div>

      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
          minZoom={0.2}
          maxZoom={1.5}
          defaultEdgeOptions={{ type: 'step' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            color="#292524"
            gap={50}
            size={1}
            variant={BackgroundVariant.Dots}
            className="opacity-20"
          />
          <Controls className="!bg-[#1c1917] !border-stone-800 !fill-stone-400" />

          {/* Decorative Background Sigil */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
            <svg
              width="800"
              height="800"
              viewBox="0 0 100 100"
              className="text-amber-500 fill-current animate-spin-slow"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 2"
              />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </ReactFlow>
      </div>
    </section>
  );
}
