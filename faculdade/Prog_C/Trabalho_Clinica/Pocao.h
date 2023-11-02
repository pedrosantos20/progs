#define TAM_STRING 20

typedef struct {
	int cod;
	char nome[TAM_STRING];
	char tipo[TAM_STRING];
} Pocao;

int InicializarPocoes();
int EncerraPocoes();
int SalvarPocao(Pocao b);
int QuantidadePocoes();
Pocao* ObterPocaoPeloIndice(int indice);
Pocao* ObterPocaoPeloCodigo(int codigo);
int AtualizarPocao(Pocao b);
int ApagarPocaoPeloCodigo(int codigo);
int ApagarPocaoPeloNome(char* nome);
