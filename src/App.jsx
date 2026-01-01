import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BookOpen, Calculator, Lightbulb, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">Quadratic Equation Tutor</h1>
          <p className="text-gray-600">Master quadratic equations: ax² + bx + c = 0</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 ${
                activeTab === 'learn' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={20} />
              Learn Concepts
            </button>
            <button
              onClick={() => setActiveTab('solve')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 ${
                activeTab === 'solve' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calculator size={20} />
              Solve Problems
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 ${
                activeTab === 'examples' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
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
                  <h2 className="text-2xl font-bold text-indigo-900 mb-4">What is a Quadratic Equation?</h2>
                  <p className="text-gray-700 mb-4">
                    A quadratic equation is a polynomial equation of degree 2, written in the standard form: 
                    <span className="font-mono bg-indigo-50 px-2 py-1 rounded mx-2">ax² + bx + c = 0</span>
                    where a ≠ 0.
                  </p>
                </section>

                <section className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-3">Key Components:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>a (coefficient of x²):</strong> Determines the parabola's direction and width</li>
                    <li><strong>b (coefficient of x):</strong> Affects the position of the vertex</li>
                    <li><strong>c (constant term):</strong> The y-intercept of the parabola</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-3">The Quadratic Formula</h3>
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg text-center">
                    <p className="text-3xl font-bold mb-2">x = (-b ± √(b² - 4ac)) / 2a</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-3">The Discriminant (b² - 4ac)</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                      <p className="font-bold text-green-800 mb-2">b² - 4ac &gt; 0</p>
                      <p className="text-sm text-gray-700">Two distinct real roots</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                      <p className="font-bold text-yellow-800 mb-2">b² - 4ac = 0</p>
                      <p className="text-sm text-gray-700">One repeated real root</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                      <p className="font-bold text-red-800 mb-2">b² - 4ac &lt; 0</p>
                      <p className="text-sm text-gray-700">Two complex roots</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-3">Graph Visualization</h3>
                  <p className="text-gray-700 mb-4">
                    The graph of a quadratic equation is a parabola. When a &gt; 0, it opens upward. When a &lt; 0, it opens downward. 
                    The roots are where the parabola crosses the x-axis.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'solve' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Solve Your Quadratic Equation</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Coefficient a (x²)</label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => { setA(Number(e.target.value)); setSolution(null); }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Coefficient b (x)</label>
                    <input
                      type="number"
                      value={b}
                      onChange={(e) => { setB(Number(e.target.value)); setSolution(null); }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Constant c</label>
                    <input
                      type="number"
                      value={c}
                      onChange={(e) => { setC(Number(e.target.value)); setSolution(null); }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <p className="text-xl font-mono font-bold text-indigo-900">
                    {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c} = 0
                  </p>
                </div>

                <button
                  onClick={solveQuadratic}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  Solve Equation
                </button>

                {solution && (
                  <div className="space-y-4">
                    {solution.error ? (
                      <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                        <p className="text-red-800 font-semibold">{solution.error}</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                          <h3 className="font-bold text-green-900 mb-2">Solution:</h3>
                          <p className="text-green-800">Type: {solution.type}</p>
                          <p className="text-green-800">Discriminant: {solution.discriminant}</p>
                          <p className="text-green-800 font-semibold mt-2">
                            Roots: {Array.isArray(solution.roots) ? solution.roots.join(', ') : solution.roots}
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-bold text-blue-900 mb-3">Step-by-Step Solution:</h3>
                          <ol className="space-y-2">
                            {solution.steps.map((step, idx) => (
                              <li key={idx} className="text-gray-700 flex gap-2">
                                <ChevronRight className="text-blue-600 flex-shrink-0 mt-1" size={16} />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                          <h3 className="font-bold text-gray-900 mb-3">Graph Visualization:</h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={generateGraphData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="x" />
                              <YAxis />
                              <Tooltip />
                              <ReferenceLine y={0} stroke="#666" strokeWidth={2} />
                              <Line type="monotone" dataKey="y" stroke="#4f46e5" strokeWidth={2} dot={false} />
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
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Practice Examples</h2>
                <p className="text-gray-700 mb-4">Click on any example to load it into the solver and see the step-by-step solution.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {examples.map((example, idx) => (
                    <div
                      key={idx}
                      onClick={() => loadExample(example)}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 cursor-pointer transition transform hover:scale-105"
                    >
                      <h3 className="font-bold text-indigo-900 mb-2">Example {idx + 1}</h3>
                      <p className="font-mono text-lg text-indigo-700 mb-2">{example.desc}</p>
                      <p className="text-sm text-gray-600">Click to solve →</p>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg mt-6">
                  <h3 className="font-bold text-yellow-900 mb-3">Try These Practice Problems:</h3>
                  <ul className="space-y-2 text-gray-700">
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

        <footer className="text-center text-gray-600 py-4">
          <p>Made for students to master quadratic equations 📐</p>
        </footer>
      </div>
    </div>
  );
}