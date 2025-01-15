import { useState } from 'react';
import { Plus, X, Users, Pencil, Trash2, Search } from 'lucide-react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@extension/ui';

// Mock people data
const people = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

interface Task {
  name: string;
  description: string;
}

export default function Form() {
  const [tasks, setTasks] = useState<Task[]>([{ name: '', description: '' }]);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<typeof people>([]);

  const addTask = () => {
    setTasks([...tasks, { name: '', description: '' }]);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const updateTask = (index: number, field: 'name' | 'description', value: string) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addPerson = (person: (typeof people)[0]) => {
    if (!selectedPeople.some(p => p.id === person.id)) {
      setSelectedPeople([...selectedPeople, person]);
    }
    setSearchQuery('');
  };

  const removePerson = (id: number) => {
    setSelectedPeople(selectedPeople.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg border border-gray-200">
        <CardHeader className="space-y-4 bg-gray-50 rounded-t-lg p-6">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder="Name"
                className="text-xl font-bold bg-transparent border-none focus-visible:ring-0 px-0"
              />
              <Input type="date" className="bg-transparent border-none focus-visible:ring-0 px-0 text-gray-600" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Pencil className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {selectedPeople.map(person => (
                <div key={person.id} className="bg-teal-100 text-teal-700 rounded px-2 py-1 text-sm flex items-center">
                  {person.email}
                  <button onClick={() => removePerson(person.id)} className="ml-1 text-teal-500 hover:text-teal-700">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Popover open={peopleOpen} onOpenChange={setPeopleOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search people"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setPeopleOpen(true)}
                    className="pl-8 pr-4 py-2 w-full border-gray-300 rounded-md"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {people
                        .filter(
                          person =>
                            !selectedPeople.some(p => p.id === person.id) &&
                            (person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              person.email.toLowerCase().includes(searchQuery.toLowerCase())),
                        )
                        .map(person => (
                          <CommandItem
                            key={person.id}
                            onSelect={() => {
                              addPerson(person);
                              setPeopleOpen(false);
                            }}>
                            <div className="flex flex-col">
                              <span>{person.name}</span>
                              <span className="text-sm text-muted-foreground">{person.email}</span>
                            </div>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6 bg-teal-100">
          <div className="bg-white border border-teal-200 rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-2 text-teal-700">Description</h2>
            <Textarea
              placeholder="Add a description..."
              className="bg-transparent border-none resize-none focus-visible:ring-0 text-gray-700 placeholder-teal-400"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-teal-700">Follow Up</h2>
              <Button onClick={addTask} variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="bg-white border border-teal-200 rounded-lg p-4 space-y-2 group">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-teal-700">{index + 1}.</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteTask(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Task name"
                    value={task.name}
                    onChange={e => updateTask(index, 'name', e.target.value)}
                    className="bg-transparent border-none focus-visible:ring-0 text-gray-700 placeholder-teal-400 font-medium"
                  />
                  <Textarea
                    placeholder="Task description"
                    value={task.description}
                    onChange={e => updateTask(index, 'description', e.target.value)}
                    className="bg-transparent border-none resize-none focus-visible:ring-0 text-gray-700 placeholder-teal-400 min-h-[60px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6">
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6">COMPLETE</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
