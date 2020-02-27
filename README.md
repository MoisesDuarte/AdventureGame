# AdventureGame.js

GUI para jogos de aventura no estilo clássico, utilizando CSS, HTML5, Javascript e JSON. 

## Descrição

Uma GUI para jogos de aventura baseada em jogos de aventura clássicos (Uninvited, Famicom Detective Club, etc), para fins educacionais, afim de estudar as tecnologias referentes a construção de aplicações web em código puro. Uso mínimo ou nulo de bibliotecas externas. (Em progresso)

## Imagens

![Screenshot 00](img/screenshots/screen00.png)
![Screenshot 01](img/screenshots/screen01.png)

## Utilização

Por momento, a gui apenas gera cenas estáticas, sem interação lógica. O bloco abaixo será sujeito a modificações. 

### Adicionando Cenas

- Na pasta cenas, crie um novo objeto no arquivo _cenas.json com a seguinte sintaxe.

```json
{
        "nome":"",
        "descricao":"",
        "fundo":"",
        "locais":[
           {
              "id" : "",
              "nome":"",
              "destino":""
           }
        ],
        "pontosInteresse":[
           {
              "id" : "",
              "nome":"",
              "descricoes": [
                 {
                    "estado": "",
                    "itemTrigger": "",
                    "descricao": [
                        ""
                    ]
                 }
              ]
           }
        ],
        "atores":[
           {
              "id" : "",
              "nome":"",
              "estado" : "",
              "falas": [
                 {
                    "estado": "",
                    "itemTrigger": "",
                    "dialogo": [
                       ""
                    ]
                 }
              ]
           }
        ]
     }
```

- Para acessa-lá, adicione a cena como um local em uma cena anterior

```json
"locais":[
   {
      "id" : "1",
      "nome":"Bloco A"
   }
]
```

### Exemplo de Ator

```json
"atores":[
   {
      "id" : "1",
      "nome":"Prof. Ramon",
      "estado" : "neutro",
      "falas": [
         {
            "estado": "neutro",
            "itemTrigger": "nenhum",
            "dialogo": [
               "Ramon:<br>Olá, senhor, como anda a vida? Júquia está paradisíaca, como sempre.",
               "Ramon:<br>Sem dúvidas, uma cidade do futuro! Oh, grã província de águas turvas!"
            ]
         },
         {
            "estado": "irritado",
            "itemTrigger": "Fotos Enchente",
            "dialogo": [
               "Ramon:<br>Senhor, me desculpe, mas eu realmente não compreendo seu senso de humor.",
               "Ramon:<br>Falsidade é um crime ainda não reconhecido pela legislação."
            ]
         }
      ]
   }
]
```
