import React, { useContext, useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Checkbox, ScrollArea } from '@extension/ui';
import { TaskList } from './task-list';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandExecutor } from './command-executor';
import { usePageContext } from './page-context';

export default function TaskManager() {
  const [isCommandMode, setIsCommandMode] = useState(false);
  const { setPage } = usePageContext();

  const toggleCommandMode = () => setIsCommandMode(!isCommandMode);

  return (
    <Card className="bg-teal-50 border-none shadow-xl overflow-hidden w-full h-screen pl-2">
      <CardHeader className="flex-shrink-0 space-y-4 pb-4 pt-4">
        <div className="flex items-center justify-between">
          <AnimatePresence initial={false}>
            {isCommandMode ? (
              <motion.div
                key="command"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex-grow">
                <CommandExecutor onClose={toggleCommandMode} />
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="Search tasks..."
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" className="flex-shrink-0 ml-2" onClick={toggleCommandMode}>
            {isCommandMode ? (
              <Search className="ml-2 h-4 w-4 text-teal-600" />
            ) : (
              <MessageSquare className="ml-2 h-4 w-4 text-teal-600" />
            )}
          </Button>
        </div>
        <CardTitle className="text-xl font-semibold text-teal-900">Current Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mx-2">
        <TaskList />
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-4 pt-4 pb-2">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white border-0">MEETS</Button>
        <Button variant="outline" className="bg-white hover:bg-teal-50 border-teal-100" onClick={() => setPage('form')}>
          NEW
        </Button>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white border-0">COMPLETE</Button>
      </CardFooter>
    </Card>
  );
}
