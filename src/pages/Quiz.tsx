import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ArrowLeft, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  // Mock quiz data - would come from API in real app
  const quizData: { [key: string]: { title: string; questions: Question[] } } = {
    'fire-safety': {
      title: 'Fire Safety',
      questions: [
        {
          id: 1,
          question: "What should you do first when you discover a fire?",
          options: [
            "Try to put out the fire yourself",
            "Alert others and call for help",
            "Gather your belongings",
            "Open windows for ventilation"
          ],
          correctAnswer: 1,
          explanation: "The first priority is to alert others and call for help. This ensures emergency services are notified and people can evacuate safely."
        },
        {
          id: 2,
          question: "When evacuating during a fire, you should:",
          options: [
            "Use the elevator for faster escape",
            "Stay low and crawl under smoke",
            "Stop to collect important items",
            "Open all doors to check for fire"
          ],
          correctAnswer: 1,
          explanation: "Staying low helps you avoid smoke inhalation, as smoke rises and cleaner air is found closer to the floor."
        },
        {
          id: 3,
          question: "How often should smoke detector batteries be changed?",
          options: [
            "Every 5 years",
            "Only when they beep",
            "Every 6 months",
            "Every 2 years"
          ],
          correctAnswer: 2,
          explanation: "Smoke detector batteries should be changed every 6 months to ensure they function properly in an emergency."
        }
      ]
    },
    'flood-preparedness': {
      title: 'Flood Preparedness',
      questions: [
        {
          id: 1,
          question: "What is the most important item in a flood emergency kit?",
          options: [
            "Waterproof flashlight",
            "Clean drinking water",
            "Battery-powered radio",
            "First aid kit"
          ],
          correctAnswer: 1,
          explanation: "Clean drinking water is essential for survival. You should have at least 1 gallon per person per day for 3 days."
        },
        {
          id: 2,
          question: "If caught in a flood while driving, what should you do?",
          options: [
            "Drive through the water quickly",
            "Turn around and find another route",
            "Stay in your car and wait",
            "Get out and push the car"
          ],
          correctAnswer: 1,
          explanation: "Turn around, don't drown! Just 6 inches of water can cause a vehicle to lose control and stall."
        }
      ]
    }
  };

  const currentQuiz = quizData[topic || 'fire-safety'] || quizData['fire-safety'];
  const questions = currentQuiz.questions;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const percentage = Math.round((score / questions.length) * 100);
      
      toast({
        title: "Quiz Complete!",
        description: `You scored ${percentage}%. ${percentage >= 80 ? 'Great job!' : 'Keep practicing!'}`,
      });
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    return answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (quizComplete && !showResult) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              </div>
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
                <p className="text-muted-foreground">
                  You got {score} out of {questions.length} questions correct
                </p>
              </div>
              
              {percentage >= 80 && (
                <Badge variant="secondary" className="mx-auto">
                  <Award className="h-4 w-4 mr-2" />
                  Badge Earned: {currentQuiz.title}
                </Badge>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate(-1)} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <Button onClick={handleShowResult}>
                  Review Answers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      Question {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 font-medium">{question.question}</p>
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 border rounded-lg ${
                            optionIndex === question.correctAnswer
                              ? 'bg-success/10 border-success'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-destructive/10 border-destructive'
                              : 'bg-muted/30'
                          }`}
                        >
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <Badge variant="secondary" className="ml-2">Correct</Badge>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <Badge variant="destructive" className="ml-2">Your Answer</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm"><strong>Explanation:</strong> {question.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle>{currentQuiz.title} Quiz</CardTitle>
              <Badge variant="outline">
                {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;