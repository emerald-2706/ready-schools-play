import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Flame, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  situations: Situation[];
}

interface Situation {
  id: number;
  description: string;
  options: Option[];
  correctOption: number;
  explanation: string;
}

interface Option {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

const DrillSimulation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentSituation, setCurrentSituation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 'fire-drill',
      title: 'Fire Emergency Drill',
      description: 'Practice fire safety procedures and evacuation routes',
      icon: Flame,
      color: 'text-red-500',
      situations: [
        {
          id: 1,
          description: "You're in the library studying when the fire alarm sounds. You notice light smoke coming from the hallway. What's your first action?",
          options: [
            { text: "Finish reading the current page quickly", isCorrect: false, feedback: "Never delay evacuation for personal items or tasks." },
            { text: "Alert other students and help evacuate", isCorrect: true, feedback: "Excellent! Helping others evacuate safely is the right priority." },
            { text: "Look for the source of the smoke", isCorrect: false, feedback: "Don't investigate fires yourself - leave that to professionals." },
            { text: "Call 911 first before moving", isCorrect: false, feedback: "Others may have already called. Your priority is safe evacuation." }
          ],
          correctOption: 1,
          explanation: "In a fire emergency, your first priority is to help ensure everyone evacuates safely. Alert others around you and begin moving toward the nearest exit."
        },
        {
          id: 2,
          description: "While evacuating, you encounter a closed door that feels warm to the touch. What should you do?",
          options: [
            { text: "Open it quickly and run through", isCorrect: false, feedback: "A warm door indicates fire behind it - opening could cause backdraft." },
            { text: "Find an alternative exit route", isCorrect: true, feedback: "Correct! A warm door indicates fire - use another exit path." },
            { text: "Pour water on the door to cool it", isCorrect: false, feedback: "Don't waste time with this approach - find another route immediately." },
            { text: "Break the door down", isCorrect: false, feedback: "This could expose you to fire and smoke. Use an alternative route." }
          ],
          correctOption: 1,
          explanation: "A warm door indicates fire behind it. Never open a hot door as it could cause a backdraft. Always use an alternative exit route."
        },
        {
          id: 3,
          description: "You've safely evacuated outside. What's the most important thing to do now?",
          options: [
            { text: "Go to the designated meeting point", isCorrect: true, feedback: "Perfect! Meeting points help ensure everyone is accounted for." },
            { text: "Go back to get your backpack", isCorrect: false, feedback: "Never re-enter a building during a fire emergency." },
            { text: "Drive home immediately", isCorrect: false, feedback: "Stay at the meeting point so authorities know you're safe." },
            { text: "Watch the fire from nearby", isCorrect: false, feedback: "Stay at the designated meeting point, away from the emergency." }
          ],
          correctOption: 0,
          explanation: "Always go to the designated meeting point after evacuation. This helps emergency personnel and school officials account for everyone's safety."
        }
      ]
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario);
  const currentSit = currentScenario?.situations[currentSituation];

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setCurrentSituation(0);
    setScore(0);
    setSimulationComplete(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedOption === null || !currentSit) return;
    
    setShowFeedback(true);
    
    if (selectedOption === currentSit.correctOption) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (!currentScenario) return;
    
    if (currentSituation < currentScenario.situations.length - 1) {
      setCurrentSituation(currentSituation + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setSimulationComplete(true);
      const percentage = Math.round((score / currentScenario.situations.length) * 100);
      toast({
        title: "Drill Complete!",
        description: `You scored ${percentage}% on the ${currentScenario.title}`,
      });
    }
  };

  const handleRestart = () => {
    setSelectedScenario(null);
    setCurrentSituation(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setSimulationComplete(false);
  };

  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Virtual Emergency Drills</h1>
            <p className="text-muted-foreground">Practice emergency response scenarios in a safe environment</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <Card 
                  key={scenario.id} 
                  className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50"
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-muted ${scenario.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle>{scenario.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{scenario.situations.length} scenarios</Badge>
                      <Button variant="outline" size="sm">Start Drill</Button>
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

  if (simulationComplete) {
    const percentage = Math.round((score / (currentScenario?.situations.length || 1)) * 100);
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              </div>
              <CardTitle className="text-2xl">Drill Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
                <p className="text-muted-foreground">
                  You responded correctly to {score} out of {currentScenario?.situations.length} scenarios
                </p>
              </div>
              
              {percentage >= 80 && (
                <Badge variant="secondary" className="mx-auto">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Emergency Response Certified
                </Badge>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart} variant="outline">
                  Try Another Drill
                </Button>
                <Button onClick={() => navigate(-1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button onClick={handleRestart} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Drills
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="flex items-center gap-2">
                {currentScenario && (
                  <>
                    <currentScenario.icon className={`h-5 w-5 ${currentScenario.color}`} />
                    {currentScenario.title}
                  </>
                )}
              </CardTitle>
              <Badge variant="outline">
                Scenario {currentSituation + 1} of {currentScenario?.situations.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-1" />
                  <p className="text-sm font-medium">{currentSit?.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">What should you do?</h3>
                {currentSit?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={showFeedback}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      selectedOption === index
                        ? showFeedback
                          ? option.isCorrect
                            ? 'border-success bg-success/10'
                            : 'border-destructive bg-destructive/10'
                          : 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted/50'
                    } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {showFeedback && selectedOption === index && (
                        option.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && currentSit && selectedOption !== null && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    currentSit.options[selectedOption].isCorrect 
                      ? 'bg-success/10 border border-success/20' 
                      : 'bg-destructive/10 border border-destructive/20'
                  }`}>
                    <p className="text-sm font-medium mb-2">
                      {currentSit.options[selectedOption].isCorrect ? 'Correct!' : 'Not quite right'}
                    </p>
                    <p className="text-sm">{currentSit.options[selectedOption].feedback}</p>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm"><strong>Explanation:</strong> {currentSit.explanation}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                {!showFeedback ? (
                  <Button 
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    {currentSituation === (currentScenario?.situations.length || 1) - 1 ? 'Complete Drill' : 'Next Scenario'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DrillSimulation;