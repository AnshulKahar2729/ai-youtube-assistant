"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  LogOut,
  MessageSquarePlus,
  Moon,
  Plus,
  Send,
  Settings,
  Sun,
  Trash,
  User,
  Youtube,
} from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "system",
        content:
          "Hello! I'm YouTubeBuddy.ai. How can I help you with YouTube videos today?",
      },
    ]
  );
  const [inputValue, setInputValue] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isUrlSubmitted, setIsUrlSubmitted] = useState(false);

  const recentChats = [
    { id: 1, title: "How to make pasta carbonara", date: "2 hours ago" },
    { id: 2, title: "React hooks explained", date: "Yesterday" },
    { id: 3, title: "Machine learning basics", date: "3 days ago" },
    { id: 4, title: "History of ancient Rome", date: "1 week ago" },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { role: "user", content: inputValue }];

    setMessages(newMessages);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "system",
          content:
            "I'm analyzing your question. Here's what I found in the video content...",
        },
      ]);
    }, 1000);
  };

  const handleSubmitYoutubeUrl = () => {
    if (!youtubeUrl.trim()) return;

    setIsUrlSubmitted(true);
    setMessages([
      ...messages,
      {
        role: "system",
        content: `I've analyzed the video at ${youtubeUrl}. What would you like to know about it?`,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center">
          <Youtube className="h-6 w-6 text-red-600 mr-2" />
          <h1 className="text-xl font-bold">YouTubeBuddy.ai</h1>
        </div>
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          {/* Sidebar */}
          <Sidebar variant="sidebar" className="border-r">
            <div className="p-4">
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                onClick={() => {
                  setMessages([
                    {
                      role: "system",
                      content:
                        "Hello! I'm YouTubeBuddy.ai. How can I help you with YouTube videos today?",
                    },
                  ]);
                  setIsUrlSubmitted(false);
                  setYoutubeUrl("");
                }}
              >
                <Plus size={16} />
                New Chat
              </Button>

              <div className="mt-4 space-y-1">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start gap-2">
                      <MessageSquarePlus size={16} />
                      <span>All Chats</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start gap-2">
                      <Trash size={16} />
                      <span>Trash</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </div>

            <SidebarContent className="px-4">
              <h2 className="text-sm font-medium text-muted-foreground mb-2">
                Recent Chats
              </h2>
              <SidebarMenu>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton className="w-full justify-start text-left">
                      <div className="flex flex-col">
                        <span className="truncate">{chat.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {chat.date}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t mt-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                    <ChevronDown size={16} className="ml-auto" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="start" side="top">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <Moon size={16} />
                      <span>Dark Mode</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-500"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </SidebarFooter>

            <SidebarTrigger className="absolute top-4 right-4 md:hidden" />
          </Sidebar>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!isUrlSubmitted && (
                <div className="flex flex-col items-center justify-center h-full space-y-4 max-w-xl mx-auto text-center">
                  <Youtube className="h-16 w-16 text-red-600" />
                  <h2 className="text-2xl font-bold">
                    Welcome to YouTubeBuddy.ai
                  </h2>
                  <p className="text-muted-foreground">
                    Enter a YouTube URL to get started. I'll analyze the video
                    and answer your questions about it.
                  </p>
                  <div className="flex w-full max-w-md gap-2">
                    <Input
                      placeholder="Paste YouTube URL here..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                    <Button onClick={handleSubmitYoutubeUrl}>Analyze</Button>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            {isUrlSubmitted && (
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about the video..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
