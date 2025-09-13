import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Flame, 
  Waves, 
  Zap, 
  Mountain, 
  Trophy, 
  Star, 
  Play, 
  AlertTriangle,
  BookOpen,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const disasterTypes = [
    { icon: Flame, name: 'Fire Safety', color: 'text-red-500', progress: 80, quizzes: 4 },
    { icon: Waves, name: 'Flood Preparedness', color: 'text-blue-500', progress: 60, quizzes: 3 },
    { icon: Zap, name: 'Severe Weather', color: 'text-yellow-500', progress: 40, quizzes: 2 },
    { icon: Mountain, name: 'Earthquake', color: 'text-amber-600', progress: 20, quizzes: 1 },
  ];

  const alerts = [
    { type: 'warning', message: 'Severe Weather Warning - Thunderstorms expected this afternoon', region: 'Your Area' },
    { type: 'info', message: 'Fire drill scheduled for next Tuesday at 2:00 PM', region: 'School Wide' },
  ];

  const recentBadges = user?.badges || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">Continue your disaster preparedness journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{user?.points || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Trophy className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">Level {user?.level || 1}</p>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{recentBadges.length}</p>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">10</p>
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Modules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disasterTypes.map((disaster, index) => {
                    const Icon = disaster.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg bg-muted ${disaster.color}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{disaster.name}</h3>
                            <p className="text-sm text-muted-foreground">{disaster.quizzes} quizzes available</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={disaster.progress} className="w-24 h-2" />
                              <span className="text-xs text-muted-foreground">{disaster.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/quiz/${disaster.name.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Region Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' ? 'bg-warning/10 border-warning' : 'bg-primary/10 border-primary'
                    }`}>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.region}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentBadges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="w-full justify-start p-2">
                      <Trophy className="h-4 w-4 mr-2" />
                      {badge}
                    </Badge>
                  ))}
                  {recentBadges.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Complete quizzes to earn badges!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/drill-simulation')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Virtual Drill
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/quiz/fire-safety')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Take Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;