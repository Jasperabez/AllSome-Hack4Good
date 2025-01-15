import React, { useState } from 'react';
import { Link } from 'lucide-react';
import { Button, ScrollArea, Checkbox } from '@extension/ui';

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  upcoming?: number;
  chainedTasks?: Task[];
};

export function TaskList() {
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);

  const toggleExpanded = (taskId: number) => {
    setExpandedTasks(prev => (prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Project meeting',
      description: 'Discuss Q1 goals',
      date: '2025-01-27',
      time: '14:00',
      upcoming: 3,
      chainedTasks: [
        { id: 101, title: 'Follow-up email', description: 'Send meeting minutes', date: '2025-01-27', time: '16:00' },
        { id: 102, title: 'Update roadmap', description: 'Incorporate feedback', date: '2025-01-28', time: '10:00' },
      ],
    },
    { id: 2, title: 'Code review', description: 'Review PR #1234', date: '2025-01-28', time: '10:00' },
    {
      id: 3,
      title: 'Client call',
      description: 'Onboarding new client',
      date: '2025-01-28',
      time: '15:30',
      upcoming: 2,
      chainedTasks: [
        {
          id: 103,
          title: 'Send welcome package',
          description: 'Email onboarding materials',
          date: '2025-01-28',
          time: '17:00',
        },
      ],
    },
    { id: 4, title: 'Team lunch', description: 'Monthly team bonding', date: '2025-01-29', time: '12:00' },
    {
      id: 5,
      title: 'Release planning',
      description: 'Plan for v2.0 release',
      date: '2025-01-30',
      time: '11:00',
      upcoming: 5,
    },
    { id: 6, title: 'Bug fixing', description: 'Address critical issues', date: '2025-01-30', time: '14:00' },
    { id: 7, title: 'Documentation', description: 'Update API docs', date: '2025-01-31', time: '09:00' },
  ];

  const renderTask = (task: Task, isChained: boolean = false) => (
    <div
      key={task.id}
      className={`flex flex-col p-3 rounded-lg transition-all ${
        isChained ? 'bg-teal-50 border border-teal-200' : 'bg-white shadow-sm hover:shadow-md'
      }`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-grow mr-4">
          <div className="font-medium">{task.title}</div>
          <div className="text-sm opacity-80">{task.description}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-lg font-semibold text-teal-700">{task.date}</div>
            <div className="text-sm text-teal-600">{formatTime(task.time)}</div>
          </div>
          <Checkbox />
        </div>
      </div>
      {task.upcoming && (
        <div className="mt-2">
          <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => toggleExpanded(task.id)}>
            Upcoming{' '}
            <span className="ml-1 bg-teal-100 text-teal-800 rounded-full w-5 h-5 inline-flex items-center justify-center">
              {task.upcoming}
            </span>
          </Button>
        </div>
      )}
      {expandedTasks.includes(task.id) && task.chainedTasks && (
        <div className="mt-2 pl-4 border-l-2 border-teal-300">
          {task.chainedTasks.map((chainedTask, index) => (
            <React.Fragment key={chainedTask.id}>
              <div className="flex items-center text-teal-500 mb-2">
                <Link size={16} className="mr-2" />
                <span className="text-sm">Chained Task {index + 1}</span>
              </div>
              {renderTask(chainedTask, true)}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ScrollArea className="h-[calc(100vh-170px)] overflow-y-auto pr-2">
      <div className="space-y-3">{tasks.map(task => renderTask(task))}</div>
    </ScrollArea>
  );
}
