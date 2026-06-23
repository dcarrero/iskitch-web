---
title: "Como Esconder Informação Sensível em Capturas de Ecrã (em Segurança)"
description: "Desfocar nem sempre é seguro — alguns métodos podem ser revertidos. Aprenda a esconder de forma fiável palavras-passe, emails e dados pessoais numa captura de ecrã no macOS antes de a partilhar."
lang: "pt"
pubDate: 2026-06-23
order: 4
heroAlt: "Uma captura de ecrã com um campo de palavra-passe escondido por um bloco sólido e zonas pixelizadas."
tags: ["privacidade", "capturas de ecrã", "segurança"]
related: ["how-to-take-screenshots-on-mac", "how-to-annotate-screenshots-on-mac"]
---

Está prestes a partilhar a captura de um erro, de uma fatura ou de um ecrã de definições — e há um endereço de email, uma chave de API ou um número de conta mesmo no enquadramento. Antes de carregar em enviar, veja como o esconder para que fique mesmo escondido.

## Nem toda a censura é segura

O instinto é desfocar a parte sensível. Mas desfocar é um **filtro reversível**: espalha cada pixel pelos vizinhos segundo uma operação matemática conhecida. Com esforço suficiente — e por vezes com muito pouco — essa operação pode ser parcialmente desfeita, sobretudo com texto curto e previsível, como um código de 6 dígitos ou um formato de email conhecido. Houve casos reais de texto «desfocado» ou pixelizado que foi recuperado.

A lição não é «nunca desfoques». É **ajustar o método ao risco**:

- **Pouco importante, apenas arrumar** — uma desfocagem ou pixelização ligeira é suficiente para esconder um rosto ao fundo ou um logótipo que não quer na imagem.
- **Mesmo secreto** — palavras-passe, tokens, números de cartão, nomes completos, moradas: não os filtre, **tape-os**.

## A forma fiável: tapar, não filtrar

A única censura que não pode ser revertida é aquela em que os pixels originais **desaparecem**, substituídos por algo que não contém qualquer informação sobre eles:

- **Bloco sólido** — um retângulo opaco e plano sobre o segredo. Não há nada por baixo para recuperar. É a opção mais segura para qualquer coisa verdadeiramente sensível.
- **Riscas / barras sólidas** — a mesma ideia, visualmente distinta para que o leitor perceba que é intencional.
- **Recorte-o** — se o segredo estiver na margem, o mais limpo é removê-lo da imagem por completo.

Um pormenor subtil mas importante: se «censurar» desenhando uma caixa numa ferramenta que mantém camadas, certifique-se de que **aplana e exporta** para uma imagem padrão (PNG/JPG). Um ficheiro com camadas ou vetorial pode permitir que alguém mova a sua caixa e revele o que está por baixo. Exportar para um PNG plano fixa a censura nos pixels.

## Como fazer isto no macOS

O Markup integrado do macOS consegue desenhar uma forma sobre o conteúdo, mas não foi concebido para uma censura fiável e não tem uma ferramenta de pixelização dedicada. Para capturas que vai partilhar, uma ferramenta dedicada é mais rápida e mais segura.

O [iSkitch](/pt/) dá-lhe quatro formas de esconder informação, cada uma a um clique no editor:

- **Bloco sólido** — arraste um retângulo opaco e plano sobre qualquer segredo. Use-o para palavras-passe, chaves e números de conta.
- **Riscas** — uma barra às riscas que se lê claramente como «censurado».
- **Pixelizar** — mosaico grosseiro para desfocagens de menor risco (rostos, ruído de fundo).
- **Desfocar** — um desfoque suave para esses mesmos usos mais ligeiros.

Quando exporta para **PNG, JPG ou PDF**, a censura fica **aplanada na imagem** — o que tapa, tapado fica. E como o iSkitch é **privado por conceção — sem contas, sem rastreamento, nada sai do seu Mac** — a captura original, sem censura, nunca foi enviada para lado nenhum, para começar.

## Uma lista rápida antes de partilhar

1. Há algo secreto no enquadramento? Verifique cantos, separadores do navegador, notificações e reflexos.
2. Para segredos a sério, use um **bloco sólido**, não desfocagem.
3. Recorte tudo o que não precisa.
4. **Exporte para uma imagem plana** (PNG/JPG) para que a tapagem não se possa levantar.
5. Verifique o ficheiro exportado, não a pré-visualização do editor.

Esconder bem os dados sensíveis demora dez segundos e poupa-o a uma fuga que não poderá desfazer. Tape-o, aplane-o e depois partilhe.

[Obtenha o iSkitch na Mac App Store →](/pt/)
