#include "Bruxo.h"
#include <string.h>

Bruxo* bruxos = NULL;
int MAX_BRUXOS = 5;
int qtdBruxos = 0;


int InicializarBruxos(){
	bruxos = (int *) malloc(MAX_BRUXOS*sizeof(int));
    if(bruxos == NULL){
        printf("\nERRO!\n");
    }
}

int EncerraBruxos()
{
	
}

int SalvarBruxo(Bruxo b)
{
    bruxos;
}
int QuantidadeBruxos()
{
	
}

Bruxo* ObterBruxoPeloIndice(int indice)
{
	
}

Bruxo* ObterBruxoPeloCodigo(int codigo)
{
	
}

int AtualizarBruxo(Bruxo b)
{
	
}

int ApagarBruxoPeloCodigo(int codigo)
{
	
}

int ApagarBruxoPeloNome(char* nome)
{
	
}

