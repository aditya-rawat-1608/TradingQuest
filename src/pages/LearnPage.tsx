import { useState } from 'react';
import articles from '../data/articles';
import quizzes from '../data/quizQuestions';
import { useStore } from '../store/useStore';

export default function LearnPage() {
  const [selectedArticle, setSelectedArticle] = useState(articles[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(quizzes[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<{ correct: number; total: number } | null>(null);
  const { user, addXP, addECoins, deductEnergy, setWeaknessTag } = useStore();

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const submitQuiz = () => {
    let correct = 0;
    const weaknessTags: string[] = [];
    
    currentQuiz.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correct++;
      } else {
        weaknessTags.push(q.category);
      }
    });

    const total = currentQuiz.questions.length;
    const score = Math.round((correct / total) * 100);
    
    if (score >= 70) {
      addXP(correct * 15);
      addECoins(correct * 10);
    } else {
      setWeaknessTag(weaknessTags);
    }
    
    setQuizResult({ correct, total });
    deductEnergy(15);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">📚 Learning Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Articles List */}
          <div className="lg:col-span-1 bg-gray-800/50 rounded-xl p-4">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Articles</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {articles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => { setSelectedArticle(article); setShowQuiz(false); }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedArticle.id === article.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium">{article.title}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {article.category} • {article.xpReward} XP
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
                setCurrentQuiz(randomQuiz);
                setShowQuiz(true);
              }}
              disabled={user.energy < 15}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎯 Take Random Quiz (15 Energy)
            </button>
          </div>

          {/* Article Content or Quiz */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-xl p-6">
            {!showQuiz ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-cyan-600/30 text-cyan-400 rounded-full text-sm">
                    {selectedArticle.category}
                  </span>
                  <span className="text-yellow-400">+{selectedArticle.xpReward} XP</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">{selectedArticle.title}</h2>
                
                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content.split('\n\n').map((para: string, idx: number) => (
                    <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-purple-900/30 rounded-lg">
                  <h4 className="text-purple-400 font-semibold mb-2">💡 Key Takeaways</h4>
                  <ul className="text-gray-300 space-y-1">
                    {selectedArticle.keyTakeaways.map((takeaway: string, idx: number) => (
                      <li key={idx}>• {takeaway}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                {quizResult ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">
                      {quizResult.correct / quizResult.total >= 0.7 ? '🎉' : '📚'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {quizResult.correct / quizResult.total >= 0.7 ? 'Quiz Passed!' : 'Keep Learning!'}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Score: {quizResult.correct}/{quizResult.total} (
                      {Math.round((quizResult.correct / quizResult.total) * 100)}%)
                    </p>
                    <p className="text-yellow-400 mb-6">
                      {quizResult.correct / quizResult.total >= 0.7 
                        ? `+${quizResult.correct * 15} XP & +${quizResult.correct * 10} E-Coins earned!`
                        : 'Review your weak areas and try again!'}
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">{currentQuiz.title}</h2>
                      <span className="text-gray-400">{Object.keys(quizAnswers).length}/{currentQuiz.questions.length} answered</span>
                    </div>
                    
                    <div className="space-y-6">
                      {currentQuiz.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-gray-700/30 rounded-lg p-4">
                          <p className="text-white font-medium mb-3">
                            {qIdx + 1}. {q.question}
                          </p>
                          <div className="space-y-2">
                            {q.options.map((opt: string, oIdx: number) => (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswer(qIdx, oIdx)}
                                className={`w-full text-left p-3 rounded-lg transition-all ${
                                  quizAnswers[qIdx] === oIdx
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-gray-600/50 text-gray-300 hover:bg-gray-500'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== currentQuiz.questions.length}
                      className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Quiz
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
