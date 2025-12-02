import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  'Como funciona o processo de lançamento de notas?',
  'Quais são os prazos do calendário acadêmico?',
  'Como abrir um incidente de suporte técnico?',
  'Onde encontro os roteiros de mediação?',
  'Como acessar a comunidade do Engage?',
];

const AssistentePage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o assistente do Hub de Gestão. Posso ajudar com dúvidas sobre agenda, incidentes, materiais, indicadores e orientações gerais sobre gestão acadêmica. Como posso ajudar você hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulated response - in production, this would call an AI API
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getSimulatedResponse(input)
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getSimulatedResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('nota') || lowerQuestion.includes('lançamento')) {
      return 'O processo de lançamento de notas deve ser feito através do sistema ULife. O prazo final para lançamento das notas do bimestre atual é até o dia 15 do mês seguinte. Caso tenha dificuldades, você pode consultar o tutorial "Sistema de Notas" na seção de Materiais ou abrir um incidente de suporte técnico.';
    }
    
    if (lowerQuestion.includes('calendário') || lowerQuestion.includes('prazo')) {
      return 'O calendário acadêmico 2025/1 está disponível na seção de Materiais. Os principais prazos incluem: início das aulas (10/02), período de matrícula (até 20/02), e fechamento do 1º bimestre (15/04). Para mais detalhes, acesse a aba Agenda ou baixe o cronograma completo.';
    }
    
    if (lowerQuestion.includes('incidente') || lowerQuestion.includes('suporte')) {
      return 'Para abrir um incidente, acesse a aba "Incidentes" e clique em "Novo Incidente". Selecione a categoria adequada (Suporte Técnico, Acadêmico, Administrativo, etc.) e preencha os detalhes. O incidente será automaticamente encaminhado para os responsáveis conforme a categoria selecionada.';
    }
    
    if (lowerQuestion.includes('roteiro') || lowerQuestion.includes('mediação')) {
      return 'Os roteiros de mediação estão disponíveis na seção "Materiais". Você pode filtrar por tipo "Roteiros" para encontrar facilmente. Atualmente temos roteiros para os Módulos 1 e 2. Novos roteiros são adicionados conforme o calendário acadêmico.';
    }
    
    if (lowerQuestion.includes('engage') || lowerQuestion.includes('comunidade')) {
      return 'O Engage é nossa plataforma de comunidades integrada ao Microsoft Teams. Para acessar, vá até a aba "Comunidades" e clique em "Acessar no Engage". Você encontrará comunidades gerais e específicas por marca. Para comunidades especiais (como Regentes e Mediadores), siga as instruções de acesso na página.';
    }
    
    return 'Entendi sua pergunta. Para obter informações mais detalhadas, recomendo consultar as seções específicas do Hub de Gestão: Agenda para eventos e tarefas, Incidentes para suporte, Materiais para documentos e guias, Indicadores para métricas, e Comunidades para colaboração. Posso ajudar com algo mais específico?';
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <HubLayout userName="LEIA FERNANDES DE ASSIS">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[calc(100vh-280px)] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Assistente Hub de Gestão
            </CardTitle>
            <CardDescription>
              Tire dúvidas sobre gestão acadêmica, materiais e processos
            </CardDescription>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sugestões */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Sugestões:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua pergunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </HubLayout>
  );
};

export default AssistentePage;
