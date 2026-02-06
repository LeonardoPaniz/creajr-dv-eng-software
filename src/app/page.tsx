"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Users, Target, Briefcase, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCTA = () => {
    if (isAuthenticated) {
      router.push("/home");
    } else {
      router.push("/credenciais");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4" />
            Sistema de Gestão CreaJr
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Gerencie sua Empresa Júnior com
            <span className="text-primary"> Eficiência</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Plataforma completa para gestão de membros, projetos, tarefas e
            habilidades da CreaJr - Dois Vizinhos. Organize, acompanhe e
            potencialize o desenvolvimento da sua equipe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button
              size="lg"
              onClick={handleCTA}
              className="text-lg px-8 group">
              {isAuthenticated ? "Ir para Dashboard" : "Começar Agora"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => router.push("#features")}>
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Principais Funcionalidades
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar sua empresa júnior em um só
            lugar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Gestão de Membros</CardTitle>
              <CardDescription>
                Cadastre e gerencie todos os membros da empresa júnior, com
                informações acadêmicas, habilidades e histórico completo.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Controle de Projetos</CardTitle>
              <CardDescription>
                Organize projetos, atribua tarefas aos membros e acompanhe o
                progresso de cada atividade em tempo real.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Metas e Objetivos</CardTitle>
              <CardDescription>
                Defina metas estratégicas, acompanhe indicadores de desempenho e
                mantenha a equipe alinhada com os objetivos.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                Sobre o Projeto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Desenvolvido como Projeto Integrador do curso de Engenharia de
                Software da UTFPR - Campus Dois Vizinhos, este sistema foi
                criado especialmente para atender as necessidades da CreaJr
                (Empresa Júnior de Engenharia).
              </p>
              <p>
                Utilizando tecnologias modernas como Next.js, TypeScript,
                Node.js e PostgreSQL, a plataforma oferece uma solução completa
                e intuitiva para gestão de membros, projetos e atividades da
                empresa júnior.
              </p>
              <p>
                O sistema permite cadastro de membros com informações
                acadêmicas, gerenciamento de habilidades, controle de projetos e
                tarefas, além de acompanhamento de metas e objetivos
                estratégicos.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para começar?
          </h2>
          <p className="text-lg text-muted-foreground">
            {isAuthenticated
              ? "Acesse seu dashboard e comece a gerenciar sua empresa júnior agora mesmo."
              : "Faça login e comece a gerenciar sua empresa júnior de forma eficiente."}
          </p>
          <Button size="lg" onClick={handleCTA} className="text-lg px-8 group">
            {isAuthenticated ? "Acessar Dashboard" : "Fazer Login"}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 CreaJr - UTFPR Dois Vizinhos. Projeto Integrador - Engenharia
            de Software.
          </div>
        </div>
      </footer>
    </div>
  );
}
