#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "Bruxo.h"
#include "Pocao.h"
#include "Paciente.h"

int main()
{
	int InicializarBruxos();

	bool b, bsub = true;
	while (b != false)
	{
		printf("MENU PRINCIPAL\n0. Sair\n1. Bruxo\n2. Paciente\n3. Pocao\n4. Tratamento\n\n///////////////////////////////////////\n");
		// INICIANDO SWITCH MENU PRINCIPAL
		int m1, mb, mp, mpo, mt = 0;
		printf("\nDigite o codigo do que deseja fazer: ");
		scanf("%d", &m1);
		switch (m1)
		{
		case 0:
		{
			printf("\nVoce saiu do programa!!!!");
			b = false;
			break;
		}
		// MENU BRUXO
		case 1:
		{
			bsub = true;
			while (bsub != false)
			{
				printf("MENU BRUXO\n0. Sair\n1. Listar\n2. Cadastrar\n3. Alterar\n4. Excluir\n\n///////////////////////////////////////\n");
				printf("\nDigite o codigo do que deseja fazer: ");
				scanf("%d", &mb);
				switch (mb)
				{
				case 0:
				{
					printf("\nVoce saiu do Menu Bruxo!!!!");
					bsub = false;
					break;
				}
				case 1:
				{
					// LISTAR
					break;
				}
				case 2:
				{
					//SALVAR
					InicializarBruxos();
					Bruxo b;
					printf("\nDigite o codigo do bruxo: ");
					scanf("%d", &b.cod);
					printf("\nDigite o nome do Bruxo: ");
					fflush(stdin);
					scanf("%[^\n]s", &b.nome);
					printf("\nDigite a especialidade do Bruxo: ");
					fflush(stdin);
					scanf("%[^\n]s", &b.espec);
					SalvarBruxo(b);
					break;
				}
				case 3:
				{
					// ALTERAR
					break;
				}
				case 4:
				{
					// EXCLUIR
					break;
				}
				default:
				{
					printf("\nAcao Invalida!");
					break;
				}
				}
			}
			break;
		}
			// FIM MENU BRUXO
		// MENU PACIENTE
		case 2:
		{
			bsub = true;
			while (bsub != false)
			{
				printf("MENU PACIENTE\n0. Sair\n1. Listar\n2. Cadastrar\n3. Alterar\n4. Excluir\n\n///////////////////////////////////////\n");
				printf("\nDigite o codigo do que deseja fazer: ");
				scanf("%d", &mp);
				switch (mp)
				{
				case 0:
				{
					printf("\nVoce saiu do Menu Paciente!!!!");
					bsub = false;
					break;
				}
				case 1:
				{
					// LISTAR
					break;
				}
				case 2:
				{
					// Cadastrar
					break;
				}
				case 3:
				{
					// ALTERAR
					break;
				}
				case 4:
				{
					// EXCLUIR
					break;
				}
				default:
				{
					printf("\nAcao Invalida!");
					break;
				}
				}
			}
		}
			// FIM MENU PACIENTE
		//  MENU POÇÃO
		case 3:
		{
			bsub = true;
			while (bsub != false)
			{
				printf("MENU POCAO\n0. Sair\n1. Listar\n2. Cadastrar\n3. Alterar\n4. Excluir\n\n///////////////////////////////////////\n");
				printf("\nDigite o codigo do que deseja fazer: ");
				scanf("%d", &mpo);
				switch (mpo)
				{
				case 0:
				{
					printf("\nVoce saiu do Menu Pocao!!!!");
					bsub = false;
					break;
				}
				case 1:
				{
					// LISTAR
					break;
				}
				case 2:
				{
					// Cadastrar
					break;
				}
				case 3:
				{
					// ALTERAR
					break;
				}
				case 4:
				{
					// EXCLUIR
					break;
				}
				default:
				{
					printf("\nAcao Invalida!");
					break;
				}
				}
			}
		}
			// FIM MENU POÇÃO

		default:
		{
			printf("\nAcao Invalida!");
			break;
		}
		}
	}
	// FIM MENU PRINCIPAL

	return 0;
}