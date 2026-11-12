import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, FastForward, Sliders, Info, Cpu, Grid3X3, Compass } from 'lucide-react';

type LabTab = 'classifier' | 'convolution' | 'embeddings';

interface DataPoint {
  x: number;
  y: number;
  label: 0 | 1;
}

export const NeuralPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('classifier');

  /* -------------------------------------------------------------
     LAB 1: 2D NEURAL NETWORK CLASSIFIER STATE & MATH
  ------------------------------------------------------------- */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [selectedClass, setSelectedClass] = useState<0 | 1>(0);
  const [hiddenSize, setHiddenSize] = useState<number>(6);
  const [learningRate, setLearningRate] = useState<number>(0.1);
  const [activation, setActivation] = useState<'tanh' | 'relu' | 'sigmoid'>('tanh');
  const [epochsTrained, setEpochsTrained] = useState<number>(0);
  const [currentLoss, setCurrentLoss] = useState<number>(0.45);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [isTraining, setIsTraining] = useState<boolean>(false);

  // Neural weights ref
  const weightsRef = useRef<{
    W1: number[][]; // [2, H]
    b1: number[];   // [H]
    W2: number[];   // [H]
    b2: number;     // scalar
  }>({
    W1: [],
    b1: [],
    W2: [],
    b2: 0,
  });

  // Initialize weights
  const resetWeights = useCallback((hSize: number) => {
    const W1: number[][] = [];
    const b1: number[] = [];
    const W2: number[] = [];
    for (let i = 0; i < 2; i++) {
      const row: number[] = [];
      for (let j = 0; j < hSize; j++) {
        row.push((Math.random() - 0.5) * 1.5);
      }
      W1.push(row);
    }
    for (let j = 0; j < hSize; j++) {
      b1.push((Math.random() - 0.5) * 0.2);
      W2.push((Math.random() - 0.5) * 1.5);
    }
    weightsRef.current = {
      W1,
      b1,
      W2,
      b2: (Math.random() - 0.5) * 0.2,
    };
    setEpochsTrained(0);
    setLossHistory([]);
  }, []);

  // Activation & derivative functions
  const actFn = useCallback((x: number, act: 'tanh' | 'relu' | 'sigmoid') => {
    if (act === 'tanh') return Math.tanh(x);
    if (act === 'relu') return Math.max(0, x);
    return 1 / (1 + Math.exp(-x));
  }, []);

  const actDeriv = useCallback((x: number, act: 'tanh' | 'relu' | 'sigmoid') => {
    if (act === 'tanh') {
      const t = Math.tanh(x);
      return 1 - t * t;
    }
    if (act === 'relu') return x > 0 ? 1 : 0;
    const s = 1 / (1 + Math.exp(-x));
    return s * (1 - s);
  }, []);

  // Forward pass scalar prediction
  const predictSingle = useCallback(
    (x1: number, x2: number) => {
      const { W1, b1, W2, b2 } = weightsRef.current;
      if (!W1.length) return 0.5;
      let sumOut = b2;
      for (let j = 0; j < b1.length; j++) {
        const z1 = x1 * W1[0][j] + x2 * W1[1][j] + b1[j];
        const a1 = actFn(z1, activation);
        sumOut += a1 * W2[j];
      }
      // Sigmoid output for binary classification probability
      return 1 / (1 + Math.exp(-Math.max(-10, Math.min(10, sumOut))));
    },
    [actFn, activation]
  );

  // Train one step with gradient descent & backprop
  const trainStep = useCallback(() => {
    if (points.length < 2) return;
    const { W1, b1, W2 } = weightsRef.current;
    const H = b1.length;

    const dW1: number[][] = [[], []];
    const db1: number[] = new Array(H).fill(0);
    const dW2: number[] = new Array(H).fill(0);
    let db2 = 0;
    for (let j = 0; j < H; j++) {
      dW1[0].push(0);
      dW1[1].push(0);
    }

    let totalLoss = 0;
    const N = points.length;

    for (let i = 0; i < N; i++) {
      const pt = points[i];
      const x1 = pt.x;
      const x2 = pt.y;
      const y = pt.label;

      // Forward pass
      const z1Arr: number[] = [];
      const a1Arr: number[] = [];
      let z2 = weightsRef.current.b2;

      for (let j = 0; j < H; j++) {
        const z1 = x1 * W1[0][j] + x2 * W1[1][j] + b1[j];
        const a1 = actFn(z1, activation);
        z1Arr.push(z1);
        a1Arr.push(a1);
        z2 += a1 * W2[j];
      }

      const yHat = 1 / (1 + Math.exp(-Math.max(-10, Math.min(10, z2))));
      // Binary Cross-Entropy Loss
      const bce = -(y * Math.log(Math.max(1e-7, yHat)) + (1 - y) * Math.log(Math.max(1e-7, 1 - yHat)));
      totalLoss += bce;

      // Backward pass
      // dL/dz2 = yHat - y
      const dZ2 = yHat - y;
      db2 += dZ2;

      for (let j = 0; j < H; j++) {
        dW2[j] += dZ2 * a1Arr[j];
        // Backprop into hidden layer
        const dHidden = dZ2 * W2[j] * actDeriv(z1Arr[j], activation);
        db1[j] += dHidden;
        dW1[0][j] += dHidden * x1;
        dW1[1][j] += dHidden * x2;
      }
    }

    // Apply weight updates
    const lr = learningRate / N;
    weightsRef.current.b2 -= lr * db2;
    for (let j = 0; j < H; j++) {
      weightsRef.current.W2[j] -= lr * dW2[j];
      weightsRef.current.b1[j] -= lr * db1[j];
      weightsRef.current.W1[0][j] -= lr * dW1[0][j];
      weightsRef.current.W1[1][j] -= lr * dW1[1][j];
    }

    const avgLoss = totalLoss / N;
    setCurrentLoss(avgLoss);
    setEpochsTrained((prev) => prev + 1);
    setLossHistory((prev) => [...prev.slice(-40), avgLoss]);
  }, [points, actFn, actDeriv, activation, learningRate]);

  // Load preset datasets
  const loadPreset = (type: 'circles' | 'moons' | 'xor') => {
    const newPts: DataPoint[] = [];
    if (type === 'circles') {
      // Inner circle class 0
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const r = 0.25 + (Math.random() - 0.5) * 0.12;
        newPts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, label: 0 });
      }
      // Outer circle class 1
      for (let i = 0; i < 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        const r = 0.75 + (Math.random() - 0.5) * 0.12;
        newPts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, label: 1 });
      }
    } else if (type === 'moons') {
      for (let i = 0; i < 25; i++) {
        const theta = (i / 25) * Math.PI;
        newPts.push({
          x: Math.cos(theta) * 0.6 - 0.25 + (Math.random() - 0.5) * 0.08,
          y: Math.sin(theta) * 0.6 + (Math.random() - 0.5) * 0.08,
          label: 0,
        });
      }
      for (let i = 0; i < 25; i++) {
        const theta = (i / 25) * Math.PI;
        newPts.push({
          x: 0.25 - Math.cos(theta) * 0.6 + (Math.random() - 0.5) * 0.08,
          y: -Math.sin(theta) * 0.6 + 0.15 + (Math.random() - 0.5) * 0.08,
          label: 1,
        });
      }
    } else if (type === 'xor') {
      const centers = [
        { cx: -0.5, cy: -0.5, l: 0 as const },
        { cx: 0.5, cy: 0.5, l: 0 as const },
        { cx: -0.5, cy: 0.5, l: 1 as const },
        { cx: 0.5, cy: -0.5, l: 1 as const },
      ];
      centers.forEach(({ cx, cy, l }) => {
        for (let i = 0; i < 12; i++) {
          newPts.push({
            x: cx + (Math.random() - 0.5) * 0.35,
            y: cy + (Math.random() - 0.5) * 0.35,
            label: l,
          });
        }
      });
    }
    setPoints(newPts);
    resetWeights(hiddenSize);
  };

  // Initial load
  useEffect(() => {
    loadPreset('moons');
  }, []);

  // Re-init weights when hidden size changes
  useEffect(() => {
    resetWeights(hiddenSize);
  }, [hiddenSize, resetWeights]);

  // Canvas render of decision boundary
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw decision boundary field
    const res = 24; // grid resolution
    const cellW = width / res;
    const cellH = height / res;

    for (let i = 0; i < res; i++) {
      for (let j = 0; j < res; j++) {
        // Map pixel cell to [-1, 1] normalized coordinate space
        const nx = ((i + 0.5) / res) * 2 - 1;
        const ny = -(((j + 0.5) / res) * 2 - 1);
        const prob = predictSingle(nx, ny);

        // Interpolate cyan (0x38bdf8) to amber (0xf59e0b)
        const alpha = Math.abs(prob - 0.5) * 0.7 + 0.1;
        if (prob < 0.5) {
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
        }
        ctx.fillRect(i * cellW, j * cellH, cellW + 1, cellH + 1);
      }
    }

    // Grid center axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Draw data points
    points.forEach((pt) => {
      const px = ((pt.x + 1) / 2) * width;
      const py = ((-pt.y + 1) / 2) * height;

      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = pt.label === 0 ? '#38bdf8' : '#fbbf24';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#07090e';
      ctx.stroke();
    });
  }, [points, predictSingle, epochsTrained]);

  // Click on canvas to add custom point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = (px / rect.width) * 2 - 1;
    const y = -((py / rect.height) * 2 - 1);
    setPoints((prev) => [...prev, { x, y, label: selectedClass }]);
  };

  // Training loop execution
  const runBatchTraining = (epochs: number) => {
    setIsTraining(true);
    let count = 0;
    const interval = setInterval(() => {
      for (let s = 0; s < 5; s++) {
        trainStep();
      }
      count += 5;
      if (count >= epochs) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 20);
  };

  /* -------------------------------------------------------------
     LAB 2: CONVOLUTION & KERNEL FEATURE MAP STATE & MATH
  ------------------------------------------------------------- */
  // 8x8 input grid
  const initial8x8: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [inputGrid, setInputGrid] = useState<number[][]>(initial8x8);
  const [activeKernelType, setActiveKernelType] = useState<'sobelX' | 'sobelY' | 'ridge' | 'sharpen'>('sobelX');
  const [hoveredOutCell, setHoveredOutCell] = useState<{ r: number; c: number } | null>({ r: 2, c: 2 });

  const kernels = {
    sobelX: {
      name: 'Sobel-X (Vertical Edge)',
      matrix: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
      ],
      divisor: 1,
    },
    sobelY: {
      name: 'Sobel-Y (Horizontal Edge)',
      matrix: [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1],
      ],
      divisor: 1,
    },
    ridge: {
      name: 'Laplacian Ridge Detector',
      matrix: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1],
      ],
      divisor: 1,
    },
    sharpen: {
      name: 'Convolutional Sharpen',
      matrix: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ],
      divisor: 1,
    },
  };

  // Compute 6x6 valid output feature map
  const activeKernel = kernels[activeKernelType];
  const outputFeatureMap: number[][] = [];
  for (let r = 0; r < 6; r++) {
    const row: number[] = [];
    for (let c = 0; c < 6; c++) {
      let sum = 0;
      for (let kr = 0; kr < 3; kr++) {
        for (let kc = 0; kc < 3; kc++) {
          sum += inputGrid[r + kr][c + kc] * activeKernel.matrix[kr][kc];
        }
      }
      row.push(sum / activeKernel.divisor);
    }
    outputFeatureMap.push(row);
  }

  // Toggle cell on input grid
  const toggleInputCell = (r: number, c: number) => {
    const next = inputGrid.map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? (val ? 0 : 1) : val))
    );
    setInputGrid(next);
  };

  /* -------------------------------------------------------------
     LAB 3: EMBEDDING VECTOR COSINE SIMILARITY STATE & MATH
  ------------------------------------------------------------- */
  interface ConceptVector {
    name: string;
    sub: string;
    vec: number[]; // 5D normalized vector
  }

  const concepts: ConceptVector[] = [
    { name: 'Self-Attention', sub: 'Transformer Mechanism', vec: [0.92, 0.88, 0.12, 0.25, 0.74] },
    { name: 'Transformer Block', sub: 'Foundation Architecture', vec: [0.89, 0.85, 0.15, 0.32, 0.78] },
    { name: 'Convolutional Layer', sub: 'Spatial Feature Extractor', vec: [0.18, 0.24, 0.95, 0.72, 0.15] },
    { name: 'Sobel Filter', sub: 'Edge Kernel', vec: [0.12, 0.15, 0.91, 0.82, 0.10] },
    { name: 'Backpropagation', sub: 'Reverse-Mode Autograd', vec: [0.45, 0.52, 0.38, 0.88, 0.94] },
    { name: 'Gradient Descent', sub: 'First-Order Optimizer', vec: [0.41, 0.48, 0.35, 0.84, 0.96] },
    { name: 'Eigenvector', sub: 'Linear Transformation', vec: [0.35, 0.30, 0.42, 0.65, 0.55] },
  ];

  const [conceptA, setConceptA] = useState<ConceptVector>(concepts[0]);
  const [conceptB, setConceptB] = useState<ConceptVector>(concepts[1]);

  // Vector Math
  const dotProduct = (v1: number[], v2: number[]) => v1.reduce((sum, val, i) => sum + val * v2[i], 0);
  const norm = (v: number[]) => Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
  const cosineSim = (v1: number[], v2: number[]) => dotProduct(v1, v2) / (norm(v1) * norm(v2));
  const euclideanDist = (v1: number[], v2: number[]) =>
    Math.sqrt(v1.reduce((sum, val, i) => sum + Math.pow(val - v2[i], 2), 0));

  const simValue = cosineSim(conceptA.vec, conceptB.vec);
  const distValue = euclideanDist(conceptA.vec, conceptB.vec);
  const angleDeg = (Math.acos(Math.max(-1, Math.min(1, simValue))) * 180) / Math.PI;

  return (
    <section id="ai-labs" className="py-20 bg-[#080B16] border-t border-purple-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 font-mono tracking-wider">
            INTERACTIVE ALGORITHMIC BENCHMARK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
            AI Labs & Empirical Neural Playground
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Machine learning concepts demonstrated in pure, client-side TypeScript. Train live backpropagation networks, inspect convolution dot-products, and calculate tensor embeddings in real time.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 flex items-center gap-1.5 p-1.5 glass-card rounded-xl w-full max-w-lg">
          <button
            onClick={() => setActiveTab('classifier')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'classifier'
                ? 'bg-gradient-to-r from-purple-500/30 to-sky-500/30 text-white shadow-sm border border-purple-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>2D Classifier</span>
          </button>
          <button
            onClick={() => setActiveTab('convolution')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'convolution'
                ? 'bg-gradient-to-r from-purple-500/30 to-sky-500/30 text-white shadow-sm border border-purple-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid3X3 className="w-4 h-4 text-sky-400" />
            <span>Convolution</span>
          </button>
          <button
            onClick={() => setActiveTab('embeddings')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'embeddings'
                ? 'bg-gradient-to-r from-purple-500/30 to-sky-500/30 text-white shadow-sm border border-purple-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Embeddings</span>
          </button>
        </div>

        {/* LAB 1: 2D NEURAL CLASSIFIER */}
        {activeTab === 'classifier' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: 2D Canvas & Point Placement */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="text-xs font-mono text-slate-300">
                  <span className="text-white font-semibold">Classification Canvas</span> · Click anywhere to place points
                </div>
                {/* Class selector */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setSelectedClass(0)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedClass === 0 ? 'bg-sky-500/30 text-sky-300 border border-sky-500/50' : 'text-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span>Class 0</span>
                  </button>
                  <button
                    onClick={() => setSelectedClass(1)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedClass === 1 ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' : 'text-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Class 1</span>
                  </button>
                </div>
              </div>

              {/* 2D Canvas Container */}
              <div className="relative w-full aspect-square max-w-[480px] mx-auto rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-crosshair shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={480}
                  onClick={handleCanvasClick}
                  className="w-full h-full"
                />
              </div>

              {/* Presets and Clear */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Datasets:</span>
                  <button
                    onClick={() => loadPreset('moons')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                  >
                    Two Moons
                  </button>
                  <button
                    onClick={() => loadPreset('circles')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                  >
                    Concentric
                  </button>
                  <button
                    onClick={() => loadPreset('xor')}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                  >
                    XOR Problem
                  </button>
                </div>
                <button
                  onClick={() => {
                    setPoints([]);
                    resetWeights(hiddenSize);
                  }}
                  className="text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Clear Points
                </button>
              </div>
            </div>

            {/* Right: Hyperparameters, Training Engine & Loss Curve */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Controls Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-sky-400" />
                    <span>Hyperparameters</span>
                  </h4>
                  <span className="text-xs font-mono text-slate-400">
                    2 → {hiddenSize} → 1
                  </span>
                </div>

                {/* Hidden Neurons */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono">
                    <span>Hidden Layer Neurons</span>
                    <span className="text-sky-400 font-bold">{hiddenSize}</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={2}
                    value={hiddenSize}
                    onChange={(e) => setHiddenSize(Number(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Learning Rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono">
                    <span>Learning Rate (η)</span>
                    <span className="text-sky-400 font-bold">{learningRate}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0.02, 0.05, 0.1, 0.2].map((lr) => (
                      <button
                        key={lr}
                        onClick={() => setLearningRate(lr)}
                        className={`py-1 text-xs font-mono rounded transition-colors ${
                          learningRate === lr
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                            : 'bg-slate-800/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        {lr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activation Function */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono">
                    <span>Activation Function</span>
                    <span className="text-sky-400 uppercase font-bold">{activation}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['tanh', 'relu', 'sigmoid'] as const).map((fn) => (
                      <button
                        key={fn}
                        onClick={() => setActivation(fn)}
                        className={`py-1 text-xs uppercase font-mono rounded transition-colors ${
                          activation === fn
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                            : 'bg-slate-800/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => runBatchTraining(100)}
                    disabled={isTraining || points.length === 0}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors font-sans"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isTraining ? 'Optimizing...' : 'Train 100 Epochs'}</span>
                  </button>
                  <button
                    onClick={() => {
                      for (let i = 0; i < 10; i++) trainStep();
                    }}
                    disabled={isTraining || points.length === 0}
                    className="p-2.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Step 10 Epochs"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => resetWeights(hiddenSize)}
                    className="p-2.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Reset Weights"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Loss Curve Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="text-sm font-semibold text-white">Loss Convergence</h5>
                    <p className="text-xs text-slate-400">Binary Cross-Entropy Loss vs. Epochs</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">Epoch: {epochsTrained}</span>
                    <div className="text-sm font-mono font-bold text-sky-400 tabular-nums">
                      Loss: {currentLoss.toFixed(4)}
                    </div>
                  </div>
                </div>

                {/* SVG Mini Chart */}
                <div className="h-28 w-full bg-slate-950 rounded-lg border border-slate-800/80 p-2 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="15" x2="200" y2="15" stroke="#1e293b" strokeDasharray="3,3" />
                    <line x1="0" y1="35" x2="200" y2="35" stroke="#1e293b" strokeDasharray="3,3" />
                    {lossHistory.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        points={lossHistory
                          .map((val, idx) => {
                            const x = (idx / (lossHistory.length - 1)) * 200;
                            // clamp between 0 and 1
                            const normVal = Math.min(1.2, Math.max(0, val));
                            const y = 55 - (normVal / 1.2) * 50;
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    )}
                  </svg>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* LAB 2: CONVOLUTION KERNELS */}
        {activeTab === 'convolution' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Grid (8x8) */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Input Tensor (8×8)</h4>
                  <p className="text-xs text-slate-400">Click any pixel to toggle activation</p>
                </div>
                <button
                  onClick={() => setInputGrid(initial8x8)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-mono"
                >
                  Reset Pattern
                </button>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-8 gap-1 bg-slate-950 p-2 rounded-xl border border-slate-800 aspect-square max-w-[340px] mx-auto">
                {inputGrid.map((row, r) =>
                  row.map((val, c) => {
                    const isInsideReceptiveField =
                      hoveredOutCell &&
                      r >= hoveredOutCell.r &&
                      r < hoveredOutCell.r + 3 &&
                      c >= hoveredOutCell.c &&
                      c < hoveredOutCell.c + 3;

                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => toggleInputCell(r, c)}
                        className={`w-full h-full rounded transition-all duration-150 flex items-center justify-center font-mono text-[10px] ${
                          val ? 'bg-sky-400 text-slate-950 font-bold' : 'bg-slate-900 text-slate-600'
                        } ${
                          isInsideReceptiveField
                            ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-slate-950'
                            : ''
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })
                )}
              </div>
              <p className="text-xs text-slate-400 text-center font-mono">
                Amber outline indicates the 3×3 receptive field currently convolved.
              </p>
            </div>

            {/* Kernel Selector & Math Calculation */}
            <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-semibold text-white">3×3 Kernel Filter</h4>
              
              <div className="space-y-1.5">
                {(Object.keys(kernels) as Array<keyof typeof kernels>).map((kKey) => (
                  <button
                    key={kKey}
                    onClick={() => setActiveKernelType(kKey)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${
                      activeKernelType === kKey
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-medium'
                        : 'bg-slate-800/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {kernels[kKey].name}
                  </button>
                ))}
              </div>

              {/* Kernel Matrix Display */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 mb-1.5 block">Kernel Weights:</span>
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-2 rounded-lg border border-slate-800 text-center font-mono text-xs text-sky-400">
                  {activeKernel.matrix.flat().map((kVal, idx) => (
                    <div key={idx} className="p-1.5 bg-slate-900 rounded font-semibold">
                      {kVal}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="text-white font-medium block">Operation Formula:</span>
                <code className="text-amber-400 font-mono text-[11px] block">
                  Y[r,c] = Σ Σ X[r+i, c+j] · K[i,j]
                </code>
              </div>
            </div>

            {/* Output Feature Map (6x6) */}
            <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Feature Map (6×6)</h4>
                <p className="text-xs text-slate-400">Hover over any cell to inspect the dot product</p>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-6 gap-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800 aspect-square max-w-[280px] mx-auto">
                {outputFeatureMap.map((row, r) =>
                  row.map((val, c) => {
                    const isHovered = hoveredOutCell?.r === r && hoveredOutCell?.c === c;
                    // Normalize value for color intensity
                    const intensity = Math.min(1, Math.abs(val) / 6);
                    return (
                      <div
                        key={`${r}-${c}`}
                        onMouseEnter={() => setHoveredOutCell({ r, c })}
                        className={`w-full h-full rounded transition-all cursor-pointer flex items-center justify-center font-mono text-xs font-bold ${
                          isHovered ? 'ring-2 ring-sky-400 z-10' : ''
                        }`}
                        style={{
                          backgroundColor:
                            val > 0
                              ? `rgba(56, 189, 248, ${intensity * 0.8 + 0.15})`
                              : val < 0
                              ? `rgba(244, 63, 94, ${intensity * 0.8 + 0.15})`
                              : '#0f172a',
                          color: Math.abs(val) > 2 ? '#ffffff' : '#94a3b8',
                        }}
                      >
                        {val}
                      </div>
                    );
                  })
                )}
              </div>

              {hoveredOutCell && (
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
                  <div className="text-sky-400 font-semibold mb-0.5">
                    Activation at [{hoveredOutCell.r}, {hoveredOutCell.c}]:
                  </div>
                  <span>Summed Dot Product: </span>
                  <span className="text-white font-bold font-mono">
                    {outputFeatureMap[hoveredOutCell.r][hoveredOutCell.c]}
                  </span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* LAB 3: EMBEDDING VECTOR SIMILARITY */}
        {activeTab === 'embeddings' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Concept Vector Selector */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-semibold text-white">Select Concepts to Compare</h4>
              <p className="text-xs text-slate-400">
                Choose any two semantic concepts in high-dimensional latent space to calculate their cosine angle.
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-sky-400 block">Concept A:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {concepts.map((c) => (
                    <button
                      key={`a-${c.name}`}
                      onClick={() => setConceptA(c)}
                      className={`text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        conceptA.name === c.name
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-medium'
                          : 'bg-slate-800/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[11px] text-slate-500">{c.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-amber-400 block">Concept B:</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {concepts.map((c) => (
                    <button
                      key={`b-${c.name}`}
                      onClick={() => setConceptB(c)}
                      className={`text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        conceptB.name === c.name
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium'
                          : 'bg-slate-800/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[11px] text-slate-500">{c.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Geometric Angle & Analytical Metric Breakdown */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-white">Geometric Distance & Projection</h4>
                  <p className="text-xs text-slate-400">High-dimensional dot product projection onto 2D plane</p>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Dim: ℝ⁵ Normalized
                </div>
              </div>

              {/* Angle Visualizer SVG */}
              <div className="h-48 w-full bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center p-4">
                <svg className="w-full h-full max-w-[280px]" viewBox="-120 -120 240 240">
                  {/* Origin Circle */}
                  <circle cx="0" cy="0" r="100" fill="none" stroke="#1e293b" strokeDasharray="3,3" />
                  <line x1="-110" y1="0" x2="110" y2="0" stroke="#1e293b" />
                  <line x1="0" y1="-110" x2="0" y2="110" stroke="#1e293b" />

                  {/* Vector A (Angle 0) */}
                  <line x1="0" y1="0" x2="90" y2="0" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-cyan)" />
                  <circle cx="90" cy="0" r="4" fill="#38bdf8" />
                  <text x="96" y="5" fill="#38bdf8" fontSize="10" fontFamily="monospace">A</text>

                  {/* Vector B (Angle theta) */}
                  {(() => {
                    const rad = (angleDeg * Math.PI) / 180;
                    const bx = Math.cos(rad) * 90;
                    const by = -Math.sin(rad) * 90;
                    return (
                      <>
                        <line x1="0" y1="0" x2={bx} y2={by} stroke="#fbbf24" strokeWidth="3" />
                        <circle cx={bx} cy={by} r="4" fill="#fbbf24" />
                        <text x={bx + 6} y={by} fill="#fbbf24" fontSize="10" fontFamily="monospace">B</text>
                        {/* Arc for angle */}
                        <path
                          d={`M 35 0 A 35 35 0 0 0 ${Math.cos(rad) * 35} ${-Math.sin(rad) * 35}`}
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1.5"
                          strokeDasharray="2,2"
                        />
                      </>
                    );
                  })()}
                </svg>

                <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400">
                  θ = <span className="text-white font-bold">{angleDeg.toFixed(1)}°</span>
                </div>
              </div>

              {/* Quantitative Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-mono">Cosine Similarity (cos θ)</span>
                  <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
                    {simValue.toFixed(4)}
                  </div>
                  <p className="text-xs text-slate-400">
                    {simValue > 0.85
                      ? 'High semantic correlation in latent space'
                      : simValue > 0.5
                      ? 'Moderate functional relationship'
                      : 'Orthogonal / distinct domains'}
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-mono">Euclidean Distance (L2)</span>
                  <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {distValue.toFixed(4)}
                  </div>
                  <p className="text-xs text-slate-400">
                    Metric distance ||A - B||₂ in 5-dimensional coordinate space
                  </p>
                </div>
              </div>

              {/* Raw Coordinates Table */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="text-sky-400 font-semibold">{conceptA.name}:</span>
                  <span>[{conceptA.vec.map((v) => v.toFixed(2)).join(', ')}]</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-amber-400 font-semibold">{conceptB.name}:</span>
                  <span>[{conceptB.vec.map((v) => v.toFixed(2)).join(', ')}]</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
