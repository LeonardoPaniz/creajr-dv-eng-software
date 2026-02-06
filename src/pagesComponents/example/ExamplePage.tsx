"use client";

import { AppLayout } from "@/components/layout/AppLayout";

const ExamplePage: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Página de Exemplo</h1>
          <p className="text-muted-foreground">
            Esta é uma página de exemplo usando o AppLayout com sidebar.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Card 1</h3>
            <p className="text-sm text-muted-foreground">
              Conteúdo do primeiro card
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Card 2</h3>
            <p className="text-sm text-muted-foreground">
              Conteúdo do segundo card
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Card 3</h3>
            <p className="text-sm text-muted-foreground">
              Conteúdo do terceiro card
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExamplePage;