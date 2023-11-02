#include "Bruxo.h"
#include <string.h>

Bruxo *bruxos = NULL;
int MAX_BRUXOS = 5;
int qtdBruxos = 0;

int InicializarBruxos()
{
    bruxos = (int *)malloc(MAX_BRUXOS * sizeof(int));
    if (bruxos == NULL)
    {
        perror("\nERRO!\n");
        exit(1);
    }
}

int EncerraBruxos()
{
}

int SalvarBruxo(Bruxo b)
{
    if (qtdBruxos == MAX_BRUXOS)
    {
        Bruxo* bruxosnt = (Bruxo *)realloc(bruxos, sizeof(Bruxo) * 1);
        if (bruxosnt == NULL)
        {
            perror("\nERRO!\n");
            exit(1);
        }else{
            bruxos = bruxosnt;
            MAX_BRUXOS += 1;
        }
    }

    bruxos[qtdBruxos] = b;
    qtdBruxos++;
    
    
}
int QuantidadeBruxos()
{
}

Bruxo *ObterBruxoPeloIndice(int indice)
{
}

Bruxo *ObterBruxoPeloCodigo(int codigo)
{
}

int AtualizarBruxo(Bruxo b)
{
}

int ApagarBruxoPeloCodigo(int codigo)
{
}

int ApagarBruxoPeloNome(char *nome)
{
}
