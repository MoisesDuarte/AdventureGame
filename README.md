# AdventureGame.js
GUI para jogos de aventura no estilo clássico, utilizando CSS, HTML5, Javascript e JSON. 

## Descrição
Uma GUI para jogos de aventura baseada em jogos de aventura clássicos (Uninvited, Famicom Detective Club, etc), para fins educacionais, afim de estudar as tecnologias referentes a construção de aplicações web em código puro. Uso mínimo ou nulo de bibliotecas externas. (Em progresso)

## Imagens
![Screenshot 00](img/screenshots/screenshot00.png)
![Screenshot 01](img/screenshots/screenshot01.png)

## Utilização 
Por momento, a gui apenas gera cenas estáticas, sem interação lógica. O bloco abaixo será sujeito a modificações. 
### Adicionando Cenas
- Na pasta cenas, crie um arquivo JSON com o nome da cena que deseja criar, utilizando o seguinte formato.

```json
[
   {
      "nome":"Cena1",
      "descricao":"Descrição da Cena",
      "fundo":"Imagem.jpg",
      "locais": [
         {
            "nome": "Cena2",
            "destino": "cena2.json"
         }
      ],
      "pontosInteresse":[
         {
            "nome":"Ponto1",
            "descricao":"Descricao1."  
         },
         {
            "nome":"Pontoa2",
            "descricao":"Descricao2"
         }
      ]
   }
]
```

- Para acessa-lá, adicione a cena como um local em uma cena anterior
```json
[
    {
        "locais": [
            {
                "nome": "Cena1",
                "destino": "cena1.json"
            }
        ]   
    }
] 
```