import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  AlertTriangle,
  BarChart3,
  GraduationCap,
  CheckCircle
} from 'lucide-react';

const TeacherDashboard = () => {
  // Mock data for demonstration
  const classStats = {
    totalStudents: 28,
    activeToday: 22,
    avgScore: 85,
    completionRate: 78
  };

  const topPerformers = [
    { name: 'Sarah Johnson', points: 285, level: 4, badges: 8 },
    { name: 'Mike Chen', points: 270, level: 4, badges: 7 },
    { name: 'Emma Davis', points: 245, level: 3, badges: 6 },
  ];

  const moduleProgress = [
    { module: 'Fire Safety', completed: 25, total: 28, percentage: 89 },
    { module: 'Flood Preparedness', completed: 18, total: 28, percentage: 64 },
    { module: 'Severe Weather', completed: 12, total: 28, percentage: 43 },
    { module: 'Earthquake', completed: 8, total: 28, percentage: 29 },
  ];

  const recentActivity = [
    { student: 'Alex Thompson', action: 'Completed Fire Safety Quiz', score: '92%', time: '2 hours ago' },
    { student: 'Jessica White', action: 'Earned First Aid Badge', score: 'Badge', time: '4 hours ago' },
    { student: 'David Lee', action: 'Completed Drill Simulation', score: '88%', time: '6 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-muted-foreground">Class: Emergency Preparedness 101 - Fall 2024</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{classStats.totalStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{classStats.avgScore}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{classStats.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{classStats.activeToday}</p>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Progress */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Module Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moduleProgress.map((module, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{module.module}</h3>
                        <span className="text-sm text-muted-foreground">
                          {module.completed}/{module.total} students
                        </span>
                      </div>
                      <Progress value={module.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">{module.percentage}% completion</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Student Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.student}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={activity.score === 'Badge' ? 'secondary' : 'outline'}>
                        {activity.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Level {student.level} • {student.badges} badges
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{student.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create New Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View All Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Send Alert
                </Button>
              </CardContent>
            </Card>

            {/* Class Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Class Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-warning/10 border-l-4 border-warning">
                    <p className="text-sm font-medium">5 students haven't completed this week's module</p>
                    <p className="text-xs text-muted-foreground mt-1">Due: Tomorrow</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 border-l-4 border-primary">
                    <p className="text-sm font-medium">Fire drill scheduled for next Tuesday</p>
                    <p className="text-xs text-muted-foreground mt-1">Reminder sent to all students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;