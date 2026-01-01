import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BookOpen, Calculator, Lightbulb, ChevronRight, Sparkles } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center justify-center gap-3">
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 animate-pulse">
        <span className="text-white font-bold text-2xl transform -rotate-12">x²</span>
      </div>
      <Sparkles className="absolute -top-1 -right-1 text-yellow-400" size={20} />
    </div>
  </div>
);

export default function QuadraticTutor() {
  const [activeTab, setActiveTab] = useState('learn');
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);
  const [solution, setSolution] = useState(null);

  const generateGraphData = () => {
    const data = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const y = a * x * x + b * x + c;
      data.push({ x, y });
    }
    return data;
  };

  const solveQuadratic = () => {
    const discriminant = b * b - 4 * a * c;
    
    if (a === 0) {
      setSolution({
        error: "Coefficient 'a' cannot be zero for a quadratic equation"
      });
      return;
    }

    const steps = [];
    steps.push(`Given equation: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`);
    steps.push(`Step 1: Identify coefficients: a = ${a}, b = ${b}, c = ${c}`);
    steps.push(`Step 2: Calculate discriminant: b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`);

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      steps.push(`Step 3: Discriminant is positive, so there are TWO real solutions`);
      steps.push(`Step 4: Apply quadratic formula: x = (-b ± √discriminant) / 2a`);
      steps.push(`x₁ = (${-b} + √${discriminant}) / ${2 * a} = ${x1.toFixed(3)}`);
      steps.push(`x₂ = (${-b} - √${discriminant}) / ${2 * a} = ${x2.toFixed(3)}`);
      
      setSolution({
        discriminant,
        roots: [x1, x2],
        steps,
        type: 'two real roots'
      });
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      steps.push(`Step 3: Discriminant is zero, so there is ONE real solution (repeated root)`);
      steps.push(`Step 4: Apply quadratic formula: x = -b / 2a`);
      steps.push(`x = ${-b} / ${2 * a} = ${x.toFixed(3)}`);
      
      setSolution({
        discriminant,
        roots: [x],
        steps,
        type: 'one real root'
      });
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-discriminant) / (2 * a);
      steps.push(`Step 3: Discriminant is negative, so there are TWO complex solutions`);
      steps.push(`Step 4: Apply quadratic formula with imaginary numbers`);
      steps.push(`x₁ = ${realPart.toFixed(3)} + ${imagPart.toFixed(3)}i`);
      steps.push(`x₂ = ${realPart.toFixed(3)} - ${imagPart.toFixed(3)}i`);
      
      setSolution({
        discriminant,
        roots: [`${realPart.toFixed(3)} + ${imagPart.toFixed(3)}i`, `${realPart.toFixed(3)} - ${imagPart.toFixed(3)}i`],
        steps,
        type: 'complex roots'
      });
    }
  };

  const examples = [
    { a: 1, b: -5, c: 6, desc: "x² - 5x + 6 = 0 (Two positive roots)" },
    { a: 1, b: 0, c: -4, desc: "x² - 4 = 0 (Difference of squares)" },
    { a: 2, b: 4, c: 2, desc: "2x² + 4x + 2 = 0 (One repeated root)" },
    { a: 1, b: 2, c: 5, desc: "x² + 2x + 5 = 0 (Complex roots)" }
  ];

  const loadExample = (example) => {
    setA(example.a);
    setB(example.b);
    setC(example.c);
    setSolution(null);
    setActiveTab('solve');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-8">
          <Logo />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-3 mt-4">
            QuadMaster
          </h1>
          <p className="text-purple-200 text-lg">Master quadratic equations with interactive learning</p>
          <div className="mt-2 inline-block">
            <span className="text-pink-300 font-mono text-sm bg-purple-900/50 px-4 py-1 rounded-full">
              ax² + bx + c = 0
            </span>
          </div>
        </header>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl mb-6 border border-purple-500/20">
          <div className="flex border-b border-purple-500/30">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'learn' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              <BookOpen size={20} />
              Learn Concepts
            </button>
            <button
              onClick={() => setActiveTab('solve')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'solve' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              <Calculator size={20} />
              Solve Problems
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'examples' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              <Lightbulb size={20} />
              Examples
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'learn' && (
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">What is a Quadratic Equation?</h2>
                  <p className="text-purple-100 mb-4">
                    A quadratic equation is a polynomial equation of degree 2, written in the standard form: 
                    <span className="font-mono bg-purple-900/50 px-3 py-1 rounded mx-2 text-pink-300">ax² + bx + c = 0</span>
                    where a ≠ 0.
                  </p>
                </section>

                <section className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">Key Components:</h3>
                  <ul className="space-y-2 text-purple-100">
                    <li><strong className="text-pink-400">a (coefficient of x²):</strong> Determines the parabola's direction and width</li>
                    <li><strong className="text-pink-400">b (coefficient of x):</strong> Affects the position of the vertex</li>
                    <li><strong className="text-pink-400">c (constant term):</strong> The y-intercept of the parabola</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">The Quadratic Formula</h3>
                  <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-8 rounded-xl text-center shadow-lg">
                    <p className="text-3xl font-bold mb-2 text-white">x = (-b ± √(b² - 4ac)) / 2a</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">The Discriminant (b² - 4ac)</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 p-4 rounded-xl border-2 border-green-500/50">
                      <p className="font-bold text-green-300 mb-2">b² - 4ac &gt; 0</p>
                      <p className="text-sm text-green-100">Two distinct real roots</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 p-4 rounded-xl border-2 border-yellow-500/50">
                      <p className="font-bold text-yellow-300 mb-2">b² - 4ac = 0</p>
                      <p className="text-sm text-yellow-100">One repeated real root</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-900/40 to-red-800/40 p-4 rounded-xl border-2 border-orange-500/50">
                      <p className="font-bold text-orange-300 mb-2">b² - 4ac &lt; 0</p>
                      <p className="text-sm text-orange-100">Two complex roots</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-purple-300 mb-3">Graph Visualization</h3>
                  <p className="text-purple-100 mb-4">
                    The graph of a quadratic equation is a parabola. When a &gt; 0, it opens upward. When a &lt; 0, it opens downward. 
                    The roots are where the parabola crosses the x-axis.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'solve' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Solve Your Quadratic Equation</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">Coefficient a (x²)</label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => { setA(Number(e.target.value)); setSolution(null); }}
                      className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">Coefficient b (x)</label>
                    <input
                      type="number"
                      value={b}
                      onChange={(e) => { setB(Number(e.target.value)); setSolution(null); }}
                      className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-purple-300 mb-2">Constant c</label>
                    <input
                      type="number"
                      value={c}
                      onChange={(e) => { setC(Number(e.target.value)); setSolution(null); }}
                      className="w-full px-4 py-2 bg-slate-700 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-xl text-center border border-purple-500/30">
                  <p className="text-2xl font-mono font-bold text-purple-200">
                    {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c} = 0
                  </p>
                </div>

                <button
                  onClick={solveQuadratic}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  Solve Equation
                </button>

                {solution && (
                  <div className="space-y-4">
                    {solution.error ? (
                      <div className="bg-red-900/30 border-2 border-red-500/50 p-4 rounded-xl">
                        <p className="text-red-300 font-semibold">{solution.error}</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 p-4 rounded-xl">
                          <h3 className="font-bold text-green-300 mb-2">Solution:</h3>
                          <p className="text-green-200">Type: {solution.type}</p>
                          <p className="text-green-200">Discriminant: {solution.discriminant}</p>
                          <p className="text-green-200 font-semibold mt-2">
                            Roots: {Array.isArray(solution.roots) ? solution.roots.join(', ') : solution.roots}
                          </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-4 rounded-xl border border-blue-500/30">
                          <h3 className="font-bold text-blue-300 mb-3">Step-by-Step Solution:</h3>
                          <ol className="space-y-2">
                            {solution.steps.map((step, idx) => (
                              <li key={idx} className="text-blue-100 flex gap-2">
                                <ChevronRight className="text-cyan-400 flex-shrink-0 mt-1" size={16} />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-slate-700/50 border-2 border-purple-500/30 p-4 rounded-xl">
                          <h3 className="font-bold text-purple-300 mb-3">Graph Visualization:</h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={generateGraphData()}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                              <XAxis dataKey="x" stroke="#a78bfa" />
                              <YAxis stroke="#a78bfa" />
                              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #a78bfa' }} />
                              <ReferenceLine y={0} stroke="#ec4899" strokeWidth={2} />
                              <Line type="monotone" dataKey="y" stroke="#f472b6" strokeWidth={3} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Practice Examples</h2>
                <p className="text-purple-100 mb-4">Click on any example to load it into the solver and see the step-by-step solution.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {examples.map((example, idx) => (
                    <div
                      key={idx}
                      onClick={() => loadExample(example)}
                      className="bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-orange-900/30 p-6 rounded-xl border-2 border-purple-500/30 hover:border-pink-500/50 cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl"
                    >
                      <h3 className="font-bold text-purple-300 mb-2">Example {idx + 1}</h3>
                      <p className="font-mono text-lg text-pink-300 mb-2">{example.desc}</p>
                      <p className="text-sm text-purple-200">Click to solve →</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-2 border-orange-500/50 p-6 rounded-xl mt-6">
                  <h3 className="font-bold text-orange-300 mb-3">Try These Practice Problems:</h3>
                  <ul className="space-y-2 text-orange-100">
                    <li>1. Find the roots of x² + 7x + 12 = 0</li>
                    <li>2. Solve 3x² - 12x + 12 = 0</li>
                    <li>3. What are the solutions to x² + x + 1 = 0?</li>
                    <li>4. Solve 2x² - 8 = 0 (hint: this is a difference of squares)</li>
                    <li>5. Find where the parabola y = x² - 4x + 3 crosses the x-axis</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="text-center text-purple-300 py-4">
          <p className="flex items-center justify-center gap-2">
            <span>Made with</span>
            <span className="text-pink-400">💜</span>
            <span>for students to master quadratic equations</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
